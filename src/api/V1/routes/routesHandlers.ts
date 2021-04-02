import { ServerResponse, IncomingMessage } from 'http';
import { RouterInterface } from '../../../common/routeInterface';

export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[]
): Promise<void> => {
  await validateRoute(req, routes);
  res.end(
    JSON.stringify({
      status: 'hello'
    })
  );
};

async function validateRoute(req: IncomingMessage, routes: RouterInterface[]): Promise<boolean> {
  routes.forEach((element) => {
    console.info(element + '' + req);
  });
  return true;
}
