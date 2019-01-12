import * as express from 'express';
import { createServer, Server } from 'http';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import * as data from './data';

export default async (port: number): Promise<Server> => {
  const app = express();
  const server: Server = createServer(app);

  app.use('*', cors({ origin: 'http://localhost:3000' }));

  const apolloServer = new ApolloServer({
    playground: false,
    schema,
    context: { data }
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return new Promise<Server>(resolve => {
    server.listen(port, () => {
      resolve(server);
    });
  });
};
