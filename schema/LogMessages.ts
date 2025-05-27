import { Static, Type } from "@sinclair/typebox";

import { LogMessage } from "./LogMessage";

export const LogMessages = Type.Array(LogMessage);

export type LogMessagesType = Static<typeof LogMessages>;
