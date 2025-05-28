import { type Database } from "sqlite";

import { toTimestampMs } from "./toTimestampMs";
import { type LogFiltersType } from "../schema/LogFilters";
import { type LogType } from "../schema/Log";
import { type Severity } from "../schema/Severity";

interface LogRecord {
  readonly timestamp_ms: number;
  readonly source?: string;
  readonly severity: Severity;
  readonly message: string;
}

// TODO: Return a Stream to support more than memory-sized responses.
export const getLogs = async (
  db: Database,
  { after, before, severity }: LogFiltersType
): Promise<LogType[]> => {
  const where: string[] = [];
  const params: (string | number)[] = [];

  if (after) {
    where.push("timestamp_ms > ?");
    params.push(toTimestampMs(after));
  }
  if (before) {
    where.push("timestamp_ms < ?");
    params.push(toTimestampMs(before));
  }
  if (severity?.length) {
    const inPlaceholders = severity.map(() => "?").join(", ");
    where.push(`severity IN (${inPlaceholders})`);

    severity.forEach((severityEntry) => {
      params.push(severityEntry);
    });
  }

  let query = "SELECT * FROM log";
  if (where.length) {
    const whereConditions = where.join(" AND ");
    query = `${query} WHERE ${whereConditions}`;
  }
  query = `${query} ORDER BY timestamp_ms`;

  const logs = await db.all<readonly LogRecord[]>(query, params);

  return logs.map(({ timestamp_ms, source, severity, message }) => ({
    timestamp: new Date(timestamp_ms).toISOString(),
    source,
    severity,
    message,
  }));
};
