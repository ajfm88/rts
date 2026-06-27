# Challenge 12 — Logs

## Scenario

FlightDeck's automation system (DRONE) runs test suites on streaming devices. The orchestrator runs on multiple API instances behind a load balancer, and uses Redis pub/sub to route signals between runners and the correct orchestrator instance.

**Reported bug:** Test attempts are occasionally marked as `timeout` even though the runner successfully completed the test. It only happens under load when multiple API instances are running.

After investigating, a second bug also surfaces during the retry triggered by the false timeout.

See `01-structure.png` for the system architecture.

---

## Bug 1 — False Timeout

The logs below capture the full sequence. Read them together with `03-code.tsx`.

```
14:32:00.000 [node-2] [exec] Run run-abc started on this instance
14:32:00.050 [node-2] [exec] Case case-1: attempt attempt-xyz created, device roku-123
14:32:00.100 [node-2] [exec] Case case-1: emitted deviceReady to runner
14:32:00.150 [node-2] [exec] Case case-1: waiting for signal (timeout: 600000ms)

...

14:41:59.900 [node-1] [redis] Received signal on orchestrator:signal:run-abc
14:41:59.901 [node-1] [registry] Run run-abc not found on this instance, ignoring

14:42:00.150 [node-2] [exec] Case case-1: timeout fired, marking attempt-xyz as timeout
14:42:00.200 [node-2] [exec] Case case-1: released device roku-123
14:42:00.250 [node-2] [exec] Case case-1: scheduling retry (attempt 2/3)

14:42:00.300 [node-2] [redis] Received signal on orchestrator:signal:run-abc
14:42:00.301 [node-2] [exec] handleSignal: attempt-xyz - signalResolve is undefined, signal dropped
```

**What to find:** Why did `attempt-xyz` get marked as `timeout` even though the runner completed and emitted a signal? Trace through `waitForSignal` and `handleSignal` in `code.tsx` and explain the race condition.

---

## Bug 2 — Device Reservation Race

The retry triggered by Bug 1 surfaces a second problem. See `02-logs.png` for the full log sequence.

Key observations in `02-logs.png`:
- `roku-456` is selected for the retry but the `UPDATE` returns **0 rows** (another run grabbed it first)
- The fallback re-selection excludes `[roku-123]` per `failedDeviceIds` — yet `roku-123` ends up selected anyway

**What to find:** Why does `roku-123` (the device from the timed-out attempt) reappear as eligible despite being in `failedDeviceIds`? Look at the ordering of `releaseDevice` and the `failedDeviceIds.push` in `handleTimeout` inside `03-code.tsx`.

---

## Your Task

1. Identify the root cause of Bug 1 (false timeout).
2. Identify the root cause of Bug 2 (device re-selection).
3. Propose a fix for each.

---

## Files

| File | Contents |
|---|---|
| `03-code.tsx` | `ExecutionManager` — signal handling, timeout logic, device retry |
| `01-structure.png` | System architecture: load balancer → API nodes → Redis pub/sub → runners |
| `02-logs.png` | Device reservation race condition during retry |
