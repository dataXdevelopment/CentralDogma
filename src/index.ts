import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema, loadTypedefs } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server";
import {
  Resolvers,
  ScrapeRequest,
  ScrapeReturnType,
} from "./generated/graphql";
import { v4 as uuidv4 } from "uuid";

const responseList = [];

const resolvers: Resolvers = {
  Query: {
    scrapeLength: () => responseList.length,
  },
  Mutation: {
    addRedditScrapeRequest: (_, args, context) => {
      console.log(args);
      const response: ScrapeRequest = {
        id: uuidv4(),
      };
      responseList.push(response);
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
