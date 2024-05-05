import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/db";
import authChecker from "./utils/authChecker";

interface AppContext {
  token: any;
}

(async function bootstrap() {
  // Build the applicaiton schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  // Create apollo server
  const server = new ApolloServer<AppContext>({
    schema: schema,
    introspection: true,
    csrfPrevention: true,
  });

  // server.start();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const token = req.headers.authorization;
      return { token };
    },
  });
  console.log(`🚀  Server ready at ${url}`);

  // Connect to database
  connectToMongo();
})();
