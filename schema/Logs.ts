import { Static, Type } from "@sinclair/typebox";

import { Log } from "./Log";

export const Logs = Type.Array(Log);

export type LogsType = Static<typeof Logs>;
