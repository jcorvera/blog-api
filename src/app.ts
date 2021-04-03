import { PORT, URI_MONGO_DB } from './config/env';
import { connect } from 'mongoose';
import { mongooseOptions } from './config/mongooseOptions';
import { createServer, ServerResponse, IncomingMessage } from 'http';
import { routes } from './api/V1/routes/routes';
import { routeHandler } from './api/V1/routes/routesHandlers';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  await routeHandler(req, res, routes);
});

connect(URI_MONGO_DB, mongooseOptions).then(
  () => {
    console.info('Connection successfully !');
  },
  (err) => {
    console.error(err);
  }
);

server.listen(PORT, () => {
  console.info(`Server running at port ${PORT}`);
});
