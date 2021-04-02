import { PORT, URI_MONGO_DB } from './config/env';
import { mongooseOptions } from './config/mongooseOptions';
import { createServer, ServerResponse, IncomingMessage } from 'http';
import { routes } from './api/V1/routes/routes';
import { routeHandler } from './api/V1/routes/routesHandlers';
import { connect } from 'mongoose';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
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
