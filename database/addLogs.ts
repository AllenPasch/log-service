import { type Database } from "sqlite";

import { toTimestampMs } from "./toTimestampMs";
import { type LogType } from "../schema/Log";

export const addLogs = async (db: Database, logs: readonly LogType[]) => {
  await db.run("BEGIN TRANSACTION");

  for (const { timestamp, source, severity, message } of logs) {
    const timestampMs = toTimestampMs(timestamp);

    const statement = await db.prepare(
      `INSERT INTO log (
          timestamp_ms,
          source,
          severity,
          message
        ) VALUES (
          ?,
          ?,
          ?,
          ?
        )`,
      [timestampMs, source, severity, message]
    );

    await statement.run();
  }

  await db.run("COMMIT");
};
