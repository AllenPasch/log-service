import { type Database } from "sqlite";

import { type LogCountsType } from "../schema/LogCounts";
import { type Severity } from "../schema/Severity";
import { type StatsType } from "../schema/Stats";

interface StatRecord {
  readonly severity: Severity;
  readonly count: number;
}

export const getStats = async (db: Database): Promise<StatsType> => {
  const counts = await db.all<readonly StatRecord[]>(`
    SELECT
      severity,
      COUNT(*) count
    FROM log
    GROUP BY
      severity
  `);

  const logCount: LogCountsType = {
    info: 0,
    warn: 0,
    error: 0,
  };

  counts.forEach(({ severity, count }) => {
    logCount[severity] = count;
  });

  return {
    logCount,
  };
};
