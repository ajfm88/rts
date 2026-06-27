# Solution — Challenge 12

## Step-by-Step Debugging

### Step 1 — Anchor on the symptom

The report says attempts are marked `timeout` even though the runner completed. The first thing to check is whether the signal was ever emitted at all, or whether it was emitted but lost. The log at `14:42:00.301` answers that immediately:

```
handleSignal: attempt-xyz - signalResolve is undefined, signal dropped
```

The signal *did* arrive — it was dropped. So the bug is not in the runner; it's in how the orchestrator handles an incoming signal.

---

### Step 2 — Trace the signal's journey across nodes

Cross-referencing the timestamps reveals the real issue:

```
14:41:59.900 [node-1] Received signal on orchestrator:signal:run-abc
14:41:59.901 [node-1] Run run-abc not found on this instance, ignoring

14:42:00.150 [node-2] timeout fired, marking attempt-xyz as timeout

14:42:00.300 [node-2] Received signal on orchestrator:signal:run-abc
14:42:00.301 [node-2] signalResolve is undefined, signal dropped
```

The signal hit **node-1** first, which ignored it because the run lives on node-2. By the time node-2 processed its copy of the message (400ms later), the 600-second timeout had already fired on node-2. The root cause is that Redis pub/sub **broadcasts to all subscribers** — every node gets every signal, but only one node owns each run.

---

### Step 3 — Read the code to find the exact race

In `waitForSignal` (`03-code.tsx`):

```ts
caseState.timeoutHandle = setTimeout(() => {
    caseState.signalResolve = undefined;  // clears the resolver...
    resolve(null);                        // ...then resolves with null
}, timeoutMs);
```

And in `handleSignal`:

```ts
if (caseState.signalResolve) {           // guard checks the resolver
    clearTimeout(caseState.timeoutHandle);
    caseState.signalResolve(signal);
    ...
}
```

Once the timeout fires and sets `signalResolve = undefined`, any signal arriving afterward — even on the correct node — is silently dropped. The architecture guarantees the race: pub/sub delivers to node-1 first, node-1 discards it, the owning node-2 processes its copy ~400ms late.

**Fix:** Route signals directly to the owning node. Options:
- Subscribe each node to a private channel (`orchestrator:signal:{nodeId}:{runId}`) and store the owning node ID in Redis when a run starts, so the runner publishes to the right channel.
- Or: when a node receives a signal for a run it doesn't own, re-publish to the owning node's channel instead of ignoring it.

---

### Step 4 — Follow the retry into Bug 2

The false timeout triggers a retry. `02-logs.png` shows what happens next:

```
eligible devices after filter: [roku-456, roku-789]   ← roku-123 correctly excluded
selected roku-456 (healthScore: 95)
UPDATE devices SET reservedBy='run-abc' WHERE deviceId='roku-456' AND reservedBy IS NULL
Updated 0 rows  ← race: another run grabbed roku-456 first

reservation failed, retrying selection
selecting device, avoiding [roku-123]
eligible devices after filter: [roku-123]  ← !!!
```

On the reservation-failure fallback, `roku-123` reappears despite being in `failedDeviceIds`. Two things are wrong:

**Problem A — ordering in `handleTimeout`:**

```ts
await this.releaseDevice(caseState.activeDeviceId);     // roku-123 re-enters the pool
// ... async gap ...
caseState.failedDeviceIds.push(caseState.activeDeviceId); // push happens after
```

`releaseDevice` makes roku-123 available in the DB (`reservedBy = NULL`) *before* it's added to the in-memory exclusion list. Any concurrent selection query in that gap will see it as eligible.

**Problem B — the fallback path skips the filter:**

The first selection correctly excludes roku-123 (it's in `failedDeviceIds` by then). But after roku-456's reservation fails, the retry path re-runs device selection without re-applying the `failedDeviceIds` filter, letting roku-123 through.

**Fix:**
- Push `activeDeviceId` to `failedDeviceIds` *before* calling `releaseDevice` to close the ordering gap.
- Ensure the reservation-failure retry path applies the same `failedDeviceIds` exclusion as the initial selection — it should share the same device-selection function, not a separate code path.

---

## What to Tell an Interviewer

**Opening — set the frame:**
> "There are actually two bugs here, and they're connected — the first one causes a false timeout, which triggers a retry that immediately hits the second one."

**Bug 1 — the cross-node routing problem:**
> "The orchestrator uses Redis pub/sub, which broadcasts to every subscriber. Each run lives in the in-memory state of the node that started it. When the runner emits a completion signal, it goes to all nodes — the wrong node receives it first, discards it, and by the time the correct node processes its copy, the local timeout has already fired and cleared the signal resolver. The signal lands on the right node but there's nothing left to receive it."
>
> "The fix is to route signals to the *owning* node specifically. Store the node ID alongside the run in Redis when the run starts, then have runners publish to a per-node channel. Alternatively, instead of ignoring signals for unknown runs, re-publish them to the owning node's channel."

**Bug 2 — the TOCTOU race + inconsistent filter:**
> "The timeout handler releases the device back into the pool before adding it to the failed-devices exclusion list. There's an async gap between those two operations where the device is visible in the DB but not yet excluded in memory. On top of that, when the initial device reservation fails and the code retries selection, it doesn't apply the same exclusion filter — so the just-released, 'failed' device comes back as a candidate."
>
> "The ordering fix is simple: push to `failedDeviceIds` before releasing the device. The filter fix is about making sure the device selection logic is a single function used in all paths — initial selection and reservation-failure retry — not duplicated code that drifts."

**Closing — tie it together:**
> "What makes this interesting is that neither bug would surface in a single-node setup. Bug 1 requires multiple API instances behind a load balancer. Bug 2 only triggers on retry, which is only triggered by Bug 1. In production you'd see this as a flaky test result under load, which is exactly the reported symptom."
