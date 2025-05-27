import fastify from "fastify";

import { LogMessage, LogMessageType } from "./schema/LogMessage";

const server = fastify();

server.post<{ Body: LogMessageType; Reply: LogMessageType }>(
  "/log",
  { schema: { body: LogMessage, response: { 200: LogMessage } } },
  async (request, reply) => {
    const logMessage = request.body;

    // TODO: Remove sensitive data.
    // TODO: Store log message.
    console.log("POST /log", logMessage);

    reply.status(200).send(logMessage);
  }
);

// TODO: Add more methods.

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
