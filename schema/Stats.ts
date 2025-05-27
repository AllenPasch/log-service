import { Type, type Static } from "@sinclair/typebox";

import { LogCounts } from "./LogCounts";

export const Stats = Type.Object({
  logCount: LogCounts,
});

export type StatsType = Static<typeof Stats>;
