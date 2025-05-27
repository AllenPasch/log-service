import { type Database } from "sqlite";
import { type Database as DatabaseV3, type Statement } from "sqlite3";

import { toTimestampMs } from "./toTimestampMs";
import { type LogFiltersType } from "../schema/LogFilters";
import { type LogType } from "../schema/Log";

export const getLogs = async (
  db: Database<DatabaseV3, Statement>,
  filters: LogFiltersType
): Promise<LogType[]> => {
  const where: string[] = [];
  const params: any[] = [];

  if (filters.after) {
    where.push("timestamp_ms > ?");
    params.push(toTimestampMs(filters.after));
  }
  if (filters.before) {
    where.push("timestamp_ms < ?");
    params.push(toTimestampMs(filters.before));
  }
  if (filters.severity?.length) {
    const inClause = filters.severity.map(() => "?").join(", ");
    where.push(`severity IN (${inClause})`);

    filters.severity.forEach((severity) => {
      params.push(severity);
    });
  }

  let query = "SELECT * FROM log";
  if (where.length) {
    const whereClause = where.join(" AND ");
    query = `${query} WHERE ${whereClause}`;
  }
  query = `${query} ORDER BY timestamp_ms`;

  const logs = await db.all(query, params);

  return logs.map(({ timestamp_ms, source, severity, message }) => ({
    timestamp: new Date(timestamp_ms).toISOString(),
    source,
    severity,
    message,
  }));
};
