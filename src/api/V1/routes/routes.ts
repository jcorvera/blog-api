import { PostController } from '../controllers/PostController';
import { CommentController } from '../controllers/CommentController';
import { RouterInterface } from '../../../interfaces/routeInterface';
import { storePostRequest } from '../validators/StorePostRequest';
import { storeCommentRequest } from '../validators/StoreCommentRequest';

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
  },
  {
    method: 'DELETE',
    path: /\/api\/v1\/comments\/([0-9a-z]+)/,
    controller: commentController.destroy.bind(commentController)
  },
  {
    method: 'GET',
    path: /\/api\/v1\/comments\/([0-9a-z]+)/,
    controller: commentController.show.bind(commentController)
  },
  {
    method: 'GET',
    path: /\/api\/v1\/posts\/([0-9a-z]+)\/comments/,
    controller: commentController.getComments.bind(commentController)
  }
];
