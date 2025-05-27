import { describe, expect, test } from "@jest/globals";

import { LogType } from "../schema/Log";
import { Severity } from "../schema/Severity";
import { removeSensitiveData } from "./removeSensitiveData";

describe("removeSensitiveData()", () => {
  test("No sensitive data in log message.", () => {
    // Arrange
    const log: LogType = {
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message: "User failed medication eligibility check",
    };

    const expectedLog = { ...log };

    // Act
    const logSensitiveDataRemoved = removeSensitiveData(log);

    // Assert
    expect(logSensitiveDataRemoved).toEqual(expectedLog);
  });

  test("Remove patient_id from log message.", () => {
    // Arrange
    const log: LogType = {
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message: "User failed medication eligibility check",
      patient_id: "abc123",
    };

    // Act
    const logSensitiveDataRemoved = removeSensitiveData(log);

    // Assert
    expect(logSensitiveDataRemoved).toEqual({
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message: "User failed medication eligibility check",
    });
  });

  test("Remove User UUID from log message string.", () => {
    // Arrange
    const log: LogType = {
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message:
        "User 31593d7a-ad6d-4d8b-8d8b-cc9f00a16427 failed medication eligibility check",
    };

    // Act
    const logSensitiveDataRemoved = removeSensitiveData(log);

    // Assert
    expect(logSensitiveDataRemoved).toEqual({
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message: "User [...] failed medication eligibility check",
    });
  });

  test("Remove User UUID in uppercase characters from log message string.", () => {
    // Arrange
    const log: LogType = {
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message:
        "User 31593D7A-AD6D-4D8B-8D8B-CC9F00A16427 failed medication eligibility check",
    };

    // Act
    const logSensitiveDataRemoved = removeSensitiveData(log);

    // Assert
    expect(logSensitiveDataRemoved).toEqual({
      timestamp: "2025-03-01T14:25:43Z",
      source: "medication-service",
      severity: Severity.error,
      message: "User [...] failed medication eligibility check",
    });
  });
});
