import { Static, Type } from "@sinclair/typebox";

import { MessageCounts } from "./MessageCounts";

export const Stats = Type.Object({
  logCount: MessageCounts,
});

export type StatsType = Static<typeof Stats>;
