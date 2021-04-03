import { ServerResponse, IncomingMessage } from 'http';
import { RouterInterface } from '../../../common/routeInterface';
import { error, success } from '../../../common/helper';
import { StorePost } from '../validators/StorePostInterface';
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
      req.on('data', (chunk) => {
        body += chunk.toString();
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

export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  routes: RouterInterface[]
): Promise<boolean> => {
  const indexIsValid = await getIndexRouteFromList(req, routes);
  if (indexIsValid < 0) {
    error(res, 404, 'Resource not found');
    return false;
  }
  await getParams(req, <string>routes[indexIsValid].path);
  let body = '';

  if (req.method === 'POST' || req.method === 'PUT') {
    body = await getBodyData(req);
    const validateRequest: StorePost = await routes[indexIsValid].validate(body);
    if (Object.keys(validateRequest).length) {
      error(res, 422, 'Invalid Request', validateRequest);
      return true;
    }
  }
  success(res, 200, 'Data returned', '[]');
  return true;
};
