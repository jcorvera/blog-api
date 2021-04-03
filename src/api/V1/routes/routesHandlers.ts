import { ServerResponse, IncomingMessage } from 'http';
import { RouterInterface } from '../../../interfaces/routeInterface';
import { error } from '../../../common/helper';
import { StorePostRequest } from '../validators/post/StorePostRequestInterface';

async function getIndexRouteFromList(req: IncomingMessage, routes: RouterInterface[]): Promise<number> {
  let indexRoute = -1;
  routes.forEach((element, index) => {
    const resp =
      element.method === req.method && req.url?.match(element.path)
        ? true
        : element.method === req.method && element.path === req.url
        ? true
        : false;
    if (resp) {
      indexRoute = index;
    }
  });
  return indexRoute;
}

async function getParams(req: IncomingMessage, path: string): Promise<string[]> {
  const params: string[] = [];
  if (req.url?.match(path)) {
    const data: RegExpMatchArray | null = req.url?.match(path);
    params.push(data ? data[1] : '');
    params.push(data ? data[2] : '');
  }
  return params;
}

function getBodyData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (data) => {
        body += data.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (e) {
      reject('');
      console.error(e);
    }
  });
}

async function setHeaders(res: ServerResponse): Promise<ServerResponse> {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  return res;
}

async function executeGetAndDeleteRequest(
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[],
  indexRoute: number
): Promise<void> {
  const params = await getParams(req, <string>routes[indexRoute].path);
  switch (routes[indexRoute].method) {
    case 'GET':
      await routes[indexRoute].controller(res, params);
      break;
    case 'DELETE':
      await routes[indexRoute].controller(res, params);
      break;
  }
}

async function executePostRequest(
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[],
  indexRoute: number
): Promise<void> {
  if (routes[indexRoute].method === 'POST') {
    const body = await getBodyData(req);
    const params = await getParams(req, <string>routes[indexRoute].path);
    const validateRequest: StorePostRequest = await routes[indexRoute].validate(body);
    if (Object.keys(validateRequest).length) {
      error(res, 422, 'Invalid Request', validateRequest);
    } else {
      await routes[indexRoute].controller(res, body, params);
    }
  }
}
export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[]
): Promise<boolean> => {
  await setHeaders(res);
  const indexRoute = await getIndexRouteFromList(req, routes);
  if (indexRoute < 0) {
    error(res, 404, 'Resource not found');
    return false;
  }
  await executePostRequest(req, res, routes, indexRoute);
  await executeGetAndDeleteRequest(req, res, routes, indexRoute);
  return true;
};
