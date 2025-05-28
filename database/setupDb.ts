import { type FastifyInstance } from "fastify";
import { fpSqlitePlugin } from "fastify-sqlite-typed";
import { type Database } from "sqlite";

export const setupDb = async (server: FastifyInstance): Promise<Database> => {
  await server.register(fpSqlitePlugin, {
    dbFilename: "./sqlite.db",
  });

  await server.db.migrate();

  return server.db;
};
