import { Type, type Static } from "@sinclair/typebox";

import { Severity } from "./Severity";

export const MessageCounts = Type.Object({
  [Severity.info]: Type.Integer({ minimum: 0 }),
  [Severity.warn]: Type.Integer({ minimum: 0 }),
  [Severity.error]: Type.Integer({ minimum: 0 }),
});

export type MessageCountsType = Static<typeof MessageCounts>;
