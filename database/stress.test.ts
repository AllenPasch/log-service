import fastify from "fastify";
import { describe, expect, test } from "@jest/globals";

import { addLogs } from "./addLogs";
import { getLogs } from "./getLogs";
import { setupDb } from "./setupDb";
import { type LogType } from "../schema/Log";
import { Severity } from "../schema/Severity";

// Enable tests by removing `.skip`.
describe("Stress test the server to see how it handles lots of data.", () => {
  test.skip("Insert 100 logs, with the same timestamp. Read them back in the same order.", async () => {
    // Arrange
    const server = fastify();
    const db = await setupDb(server);

    await db.run("DELETE FROM log");

    const timestamp = new Date().toISOString();

    const logNumbers = [...Array(100).keys()].map((index) => index + 1);
    const logs: LogType[] = logNumbers.map((logNumber) => ({
      timestamp,
      source: "stress-test",
      severity: Severity.info,
      message: `Log number: ${logNumber}`,
    }));

    // Act
    await addLogs(db, logs);

    const logsRead = await getLogs(db, {});

    // Assert
    expect(logsRead).toEqual(logs);
  });

  test.skip(
    "Insert 1_000_000 logs in one request. Read them back in the same order.",
    async () => {
      // Arrange
      const server = fastify();
      const db = await setupDb(server);

      await db.run("DELETE FROM log");

      const logNumbers = [...Array(1_000_000).keys()].map((index) => index + 1);
      const logs: LogType[] = logNumbers.map((logNumber) => ({
        timestamp: new Date().toISOString(),
        source: "stress-test",
        severity: Severity.info,
        message: `Log number: ${logNumber}`,
      }));

      // Act
      await addLogs(db, logs);

      const logsRead = await getLogs(db, {});

      // Assert
      expect(logsRead).toEqual(logs);
    },
    60 * 1000
  );
});
