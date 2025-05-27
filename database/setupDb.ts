import { type FastifyInstance } from "fastify";
import { fpSqlitePlugin } from "fastify-sqlite-typed";

export const setupDb = async (server: FastifyInstance) => {
  await server.register(fpSqlitePlugin, {
    dbFilename: "./sqlite.db",
  });

  await server.db.migrate();
};
