import { StorePost } from './StorePostInterface';

export async function storePostRequest(body: string): Promise<StorePost> {
  const errors: StorePost = await verifyFieldsPost(body);
  return errors;
}

async function verifyFieldsPost(body: string): Promise<StorePost> {
  const errors: StorePost = <StorePost>{};
  const dataPost: StorePost = JSON.parse(body);

  if (!Object.keys(dataPost).length) {
    errors.title = 'Title es required !';
    errors.content = 'Content is required !';
  }

  switch (dataPost) {
    case dataPost.title:
      errors.title = 'Title is required !';
      break;
    case dataPost.content:
      errors.content = 'Content is required !';
      break;
  }

  if (!dataPost.title) {
    errors.title = 'Title is required';
  }

  if (!dataPost.content) {
    errors.content = 'Content is required';
  }

  if (<number>dataPost.content?.length < 15) {
    errors.content = 'Content should has at least 15 characters';
  }

  if (<number>dataPost.title?.length < 8) {
    errors.content = 'Title should has at least 8 characters';
  }

  return errors;
}
