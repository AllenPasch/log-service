import fastify from "fastify";

import { addLogs } from "./database/addLogs";
import { getLogs } from "./database/getLogs";
import { getStats } from "./database/getStats";
import { setupDb } from "./database/setupDb";
import { Log, type LogType } from "./schema/Log";
import { LogFilters, type LogFiltersType } from "./schema/LogFilters";
import { Logs, type LogsType } from "./schema/Logs";
import { Stats, type StatsType } from "./schema/Stats";
import { removeSensitiveData } from "./security/removeSensitiveData";

const server = fastify();
setupDb(server);

server.post<{ Body: LogType; Reply: LogType }>(
  "/log",
  { schema: { body: Log, response: { 201: Log } } },
  async (request, reply) => {
    const log = removeSensitiveData(request.body);

    await addLogs(server.db, [log]);

    reply.status(201).send(log);
  }
);

server.post<{ Body: LogsType; Reply: LogsType }>(
  "/log/batch",
  { schema: { body: Logs, response: { 201: Logs } } },
  async (request, reply) => {
    const logs = request.body.map(removeSensitiveData);

    await addLogs(server.db, logs);

    reply.status(201).send(logs);
  }
);

server.get<{ Querystring: LogFiltersType; Reply: LogsType }>(
  "/logs",
  { schema: { querystring: LogFilters, response: { 200: Logs } } },
  async (request, reply) => {
    const filters = request.query;

    console.log("GET /logs filters=", filters);

    const logs = await getLogs(server.db, filters);

    reply.status(200).send(logs);
  }
);

server.get<{ Reply: StatsType }>(
  "/stats",
  { schema: { response: { 200: Stats } } },
  async (request, reply) => {
    const stats = await getStats(server.db);

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
