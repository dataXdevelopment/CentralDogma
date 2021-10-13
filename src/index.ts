import { ApolloServer, gql } from "apollo-server";
import { Resolvers } from "./generated/graphql";
import { connect } from "amqplib";
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addReddit(
      subreddits: [String]!
      threads: Boolean
      comments: Boolean
    ): String
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addReddit: (_, args, context) => {
      console.log(args);
      context.taskQueue.sendToQueue(
        q,
        Buffer.from(`Recieved args - ${JSON.stringify(args)}`)
      );
      return "Data";
    },
  },
};

var q = "tasks";

async function main() {
  const connection = await connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  await channel.assertQueue(q);
  // channel.;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      taskQueue: channel,
    }),
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
