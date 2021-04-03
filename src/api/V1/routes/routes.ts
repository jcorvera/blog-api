import { PostController } from '../controllers/PostController';
import { RouterInterface } from '../../../common/routeInterface';
import { storePostRequest } from '../validators/StorePostRequest';
const postController = new PostController();

export const routes: RouterInterface[] = [
  {
    method: 'POST',
    path: '/api/v1/posts',
    controller: postController.store.bind(postController),
    validate: storePostRequest
  },
  {
    method: 'GET',
    path: /\/api\/v1\/posts\/([0-9a-z]+)/,
    controller: postController.show.bind(postController)
  }
  /*
  {
    method: 'DELETE',
    path: /\/posts\/([0-9a-z]+)/,
    handler: postController.destroy.bind(postController)
  }*/
];
