import { Static, Type } from "@sinclair/typebox";

import { ISO_8601_REGEX } from "./regex";
import { Severity } from "./Severity";

const MAX_GITHUB_REPOSITORY_NAME_LENGTH = 100;

const MAX_LOG_MESSAGE_LENGTH = 4096;

export const LogMessage = Type.Object({
  timestamp: Type.String({ pattern: ISO_8601_REGEX }),
  source: Type.Optional(
    Type.String({ maxLength: MAX_GITHUB_REPOSITORY_NAME_LENGTH })
  ),
  severity: Type.Enum(Severity, { default: Severity.info }),
  message: Type.String({ maxLength: MAX_LOG_MESSAGE_LENGTH }),
  // This field is thrown away, so there’s no reason to validate it.
  patient_id: Type.Optional(Type.String()),
});

export type LogMessageType = Static<typeof LogMessage>;
