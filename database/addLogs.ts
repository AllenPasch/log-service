import { type Database } from "sqlite";
import { type Database as DatabaseV3, type Statement } from "sqlite3";

import { toTimestampMs } from "./toTimestampMs";
import { type LogType } from "../schema/Log";

export const addLogs = async (
  db: Database<DatabaseV3, Statement>,
  logs: readonly LogType[]
) =>
  await Promise.all(
    logs.map(async ({ timestamp, source, severity, message }) => {
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
    })
  );
