import { ServerResponse, IncomingMessage } from 'http';
import { RouterInterface } from '../../../common/routeInterface';
import { error, success } from '../../../common/helper';

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

async function getParams(req: IncomingMessage, routes: RouterInterface[]): Promise<string[]> {
  const params: string[] = [];
  routes.forEach((element) => {
    if (element.method === req.method && req.url?.match(element.path)) {
      const data: RegExpMatchArray | null = req.url?.match(element.path);
      params.push(data ? data[1] : '');
      params.push(data ? data[2] : '');
    }
  });
  return params;
}

export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[]
): Promise<boolean> => {
  const isRouteValid = await validateRoute(req, routes);
  await getParams(req, routes);
  if (!isRouteValid) {
    error(res, 'Resource not found', 404);
    return false;
  }
  success(res, 200, 'Data returned', '[]');
  return true;
};
