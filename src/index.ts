import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "@apollo/server";
// import { startServerAndCreateLambdahandler } from "@apollo/server-lambda";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/db";
import authChecker from "./utils/authChecker";

interface AppContext {
  token: any;
}

// Connect to database
connectToMongo();

// Build the applicaiton schema
const schema = buildSchemaSync({
  resolvers,
  authChecker,
});

// Create apollo server
const server = new ApolloServer({
  schema: schema,
  introspection: true,
  csrfPrevention: true,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
