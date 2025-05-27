import fastify from "fastify";

import { Log, type LogType } from "./schema/Log";
import { LogFilters, type LogFiltersType } from "./schema/LogFilters";
import { Logs, type LogsType } from "./schema/Logs";
import { Stats, type StatsType } from "./schema/Stats";
import { removeSensitiveData } from "./security/removeSensitiveData";

const server = fastify();

server.post<{ Body: LogType; Reply: LogType }>(
  "/log",
  { schema: { body: Log, response: { 201: Log } } },
  async (request, reply) => {
    const log = removeSensitiveData(request.body);

    // TODO: Store log.
    console.log("POST /log", log);

    reply.status(201).send(log);
  }
);

server.post<{ Body: LogsType; Reply: LogsType }>(
  "/log/batch",
  { schema: { body: Logs, response: { 201: Logs } } },
  async (request, reply) => {
    const logs = request.body.map(removeSensitiveData);

    // TODO: Store logs.
    console.log("POST /log/batch", logs);

    reply.status(201).send(logs);
  }
);

server.get<{ Query: LogFiltersType; Reply: LogsType }>(
  "/logs",
  { schema: { querystring: LogFilters, response: { 200: Logs } } },
  async (request, reply) => {
    const filters = request.query;

    // TODO: Get this from the database, while applying filtering.
    const logs: LogsType = [];

    console.log("GET /logs filters=", filters);

    reply.status(200).send(logs);
  }
);

server.get<{ Reply: StatsType }>(
  "/stats",
  { schema: { response: { 200: Stats } } },
  async (request, reply) => {
    // TODO: Get the stats from the database.
    const stats: StatsType = {
      logCount: {
        info: 3,
        warn: 5,
        error: 2,
      },
    };

    reply.status(200).send(stats);
  }
);

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
