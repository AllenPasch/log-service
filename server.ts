import fastify from "fastify";

import { LogFilters, LogFiltersType } from "./schema/LogFilters";
import { LogMessage, LogMessageType } from "./schema/LogMessage";
import { LogMessages, LogMessagesType } from "./schema/LogMessages";
import { Stats, StatsType } from "./schema/Stats";

const server = fastify();

server.post<{ Body: LogMessageType; Reply: LogMessageType }>(
  "/log",
  { schema: { body: LogMessage, response: { 201: LogMessage } } },
  async (request, reply) => {
    const logMessage = request.body;

    // TODO: Remove sensitive data.
    // TODO: Store log message.
    console.log("POST /log", logMessage);

    reply.status(201).send(logMessage);
  }
);

server.post<{ Body: LogMessagesType; Reply: LogMessagesType }>(
  "/log/batch",
  { schema: { body: LogMessages, response: { 201: LogMessages } } },
  async (request, reply) => {
    const logMessages = request.body;

    // TODO: Remove sensitive data.
    // TODO: Store log messages.
    console.log("POST /log/batch", logMessages);

    reply.status(201).send(logMessages);
  }
);

server.get<{ Query: LogFiltersType; Reply: LogMessagesType }>(
  "/logs",
  { schema: { querystring: LogFilters, response: { 200: LogMessages } } },
  async (request, reply) => {
    const filters = request.query;

    // TODO: Get this from the database, while applying filtering.
    const logMessages: LogMessagesType = [];

    console.log("GET /logs filters=", filters);

    reply.status(200).send(logMessages);
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
