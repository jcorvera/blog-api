import { PostController } from '../controllers/PostController';
import { CommentController } from '../controllers/CommentController';
import { RouterInterface } from '../../../interfaces/routeInterface';
import { storePostRequest } from '../validators/post/StorePostRequest';
import { storeCommentRequest } from '../validators/comment/StoreCommentRequest';
const postController = new PostController();
const commentController = new CommentController();

export const routes: RouterInterface[] = [
  // POSTS ROUTES
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
  },
  {
    method: 'DELETE',
    path: /\/api\/v1\/posts\/([0-9a-z]+)/,
    controller: postController.destroy.bind(postController)
  },
  // COMMENT POSTS
  {
    method: 'POST',
    path: /\/api\/v1\/posts\/([0-9a-z]+)\/comments/,
    controller: commentController.store.bind(commentController),
    validate: storeCommentRequest
  }
  /*
  {
    method: 'GET',
    path: /\/api\/v1\/posts\/([0-9a-z]+)\/comments\/([0-9a-z]+)/,
    controller: postController.show.bind(postController)
  },
  {
    method: 'DELETE',
    path: /\/api\/v1\/posts\/([0-9a-z]+)\/comments\/([0-9a-z]+)/,
    controller: postController.destroy.bind(postController)
  }*/
];
