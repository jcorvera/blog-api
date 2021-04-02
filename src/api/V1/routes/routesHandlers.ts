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
  let isValid = false;
  routes.forEach((element) => {
    const resp =
      element.method === req.method && req.url?.match(element.path)
        ? true
        : element.method === req.method && element.path === req.url
        ? true
        : false;
    if (resp) {
      isValid = resp;
    }
  });
  return isValid;
}
