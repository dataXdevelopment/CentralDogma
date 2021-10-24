import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import {
  Resolvers,
  ScrapeRequest,
  ScrapeReturnType,
  ScrapeStatus,
} from "./generated/graphql";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { RedisPubSub } from "graphql-redis-subscriptions";
const responseList = [];
const options = {
  port: 6379,
  host: "redis",
};
const redis = new Redis({
  port: 6379,
  host: "redis",
});
const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

const resolvers: Resolvers = {
  Query: {
    scrapeLength: () => responseList.length,
    scrapeStatus: async (_, { id }) => {
      const response = (await redis.hgetall(id)) as ScrapeRequest;
      return response;
    },
  },
  Mutation: {
    addRedditScrapeRequest: (_, args, context) => {
      console.log(args);
      const response = {
        id: uuidv4(),
        returnType: ScrapeReturnType.JSON,
        status: ScrapeStatus.PENDING,
      };
      responseList.push(response);
      redis.hset(response.id, response);
      return response;
    },
  },
  Subscription: {
    scrapeStatus: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },
};
async function main() {
  const app = express();
  const httpServer = createServer(app);

  const schema = await loadSchema("./src/schema.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema(schema, resolvers);
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: schemaWithResolvers,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "/",
    }
  );

  await server.start();
  server.applyMiddleware({ app, path: "/" });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main();
