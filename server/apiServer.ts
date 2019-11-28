import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http'
import path from 'path';


interface apiServerProps {
  resolvers?: string,
}

// const customPlaygroundOptions = {
//   ...defaultPlaygroundOptions,
//   version: '1.7.10', // https://github.com/prisma/graphql-playground/issues/1036#issuecomment-501990987
// }

const prepareApiServer = async ({ resolvers }: apiServerProps) => {
  const schema = await buildSchema({
    validate: false, // TODO - az budeme mit validace, tak odstranit, bez validaci hazi warning do konzole
    resolvers: [
      `${path.resolve(__dirname, './graphql/resolvers/**/resolver.ts')}`
    ],
    emitSchemaFile: {
      commentDescriptions: true,
    },
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, connection }) => {
      return { user: null }
    },
    introspection: true,
    playground: { settings: { 'request.credentials': 'same-origin' } }
  })
  apolloServer.applyMiddleware({ app: app })
  const httpServer = http.createServer(app)
  httpServer.listen(4000, () => {
    console.log(
      `🚀 Server ready`
    )
  })
}

export {
  prepareApiServer,
}