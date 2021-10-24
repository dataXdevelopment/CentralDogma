import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema, loadTypedefs } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server";
import {
  Resolvers,
  ScrapeRequest,
  ScrapeReturnType,
  ScrapeStatus,
} from "./generated/graphql";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis";

const responseList = [];
const redis = new Redis({
  port: 6379,
  host: "redis",
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
};

async function main() {
  const schema = await loadSchema("./src/schema.graphql", {
    // load from a single schema file
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema(schema, resolvers);

  const server = new ApolloServer({
    schema: schemaWithResolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
