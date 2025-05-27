import { Static, Type } from "@sinclair/typebox";

import { Severity } from "./Severity";

const MAX_GITHUB_REPOSITORY_NAME_LENGTH = 100;

const MAX_LOG_MESSAGE_LENGTH = 4096;

/**
 * Full [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date and time,
 * with the time zone specified.
 *
 * @see https://stackoverflow.com/a/37563868
 */
const ISO_8601_REGEX =
  "\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)";

export const LogMessage = Type.Object({
  timestamp: Type.String({ pattern: ISO_8601_REGEX }),
  source: Type.Optional(
    Type.String({ maxLength: MAX_GITHUB_REPOSITORY_NAME_LENGTH })
  ),
  severity: Type.Enum(Severity, { default: Severity.info }),
  message: Type.String({ maxLength: MAX_LOG_MESSAGE_LENGTH }),
  patient_id: Type.Optional(Type.String()),
});

export type LogMessageType = Static<typeof LogMessage>;
