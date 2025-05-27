import { Type, type Static } from "@sinclair/typebox";

import { ISO_8601_REGEX } from "./regex";
import { Severity } from "./Severity";

export const LogFilters = Type.Object({
  after: Type.Optional(Type.String({ pattern: ISO_8601_REGEX })),
  before: Type.Optional(Type.String({ pattern: ISO_8601_REGEX })),
  severity: Type.Optional(Type.Array(Type.Enum(Severity))),
});

export type LogFiltersType = Static<typeof LogFilters>;
