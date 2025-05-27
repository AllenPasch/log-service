import { type Database } from "sqlite";
import { type Database as DatabaseV3, type Statement } from "sqlite3";

import { type LogCountsType } from "../schema/LogCounts";
import { Severity } from "../schema/Severity";
import { type StatsType } from "../schema/Stats";

export const getStats = async (
  db: Database<DatabaseV3, Statement>
): Promise<StatsType> => {
  const counts = await db.all(`
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
    logCount[severity as Severity] = count;
  });

  return {
    logCount,
  };
};
