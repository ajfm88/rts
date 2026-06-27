class ExecutionManager {
  private caseStates = new Map<string, CaseState>();

  async executeCase(caseState: CaseState, device: Device): Promise<void> {
    const attempt = await this.createAttempt(caseState, device);
    caseState.activeAttemptId = attempt.attemptId;
    caseState.status = "running"; // Emit deviceReady to runner

    this.emitDeviceReady(attempt, device); // Wait for signal or timeout

    const signal = await this.waitForSignal(caseState, attempt);

    if (signal) {
      await this.processSignal(caseState, attempt, signal);
    } else {
      // Timeout - no signal received
      await this.handleTimeout(caseState, attempt);
    }
  }

  private waitForSignal(
    caseState: CaseState,
    attempt: TestAttempt,
  ): Promise<TestCompleteSignal | TestFailureSignal | null> {
    const timeoutMs = this.config.executionTimeoutMs; // default 600000 (10 min)

    return new Promise((resolve) => {
      caseState.signalResolve = resolve;

      caseState.timeoutHandle = setTimeout(() => {
        caseState.signalResolve = undefined;
        resolve(null);
      }, timeoutMs);
    });
  }

  handleSignal(signal: TestCompleteSignal | TestFailureSignal): void {
    // Find the case this signal belongs to
    for (const [caseId, caseState] of this.caseStates) {
      if (caseState.activeAttemptId === signal.attemptId) {
        if (caseState.signalResolve) {
          clearTimeout(caseState.timeoutHandle);
          caseState.signalResolve(signal);
          caseState.signalResolve = undefined;
        }
        return;
      }
    }
  }

  private async handleTimeout(caseState: CaseState, attempt: TestAttempt): Promise<void> {
    await this.updateAttemptStatus(attempt, "timeout", "Test execution timed out");
    await this.releaseDevice(caseState.activeDeviceId); // Timeouts are retryable

    if (caseState.retryCount < this.config.maxRetries) {
      caseState.failedDeviceIds.push(caseState.activeDeviceId);
      caseState.retryCount++;
      caseState.status = "pending"; // Will be picked up again
    } else {
      caseState.status = "failure";
    }
  }
}
