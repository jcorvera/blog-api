import { StorePostRequest } from './StorePostRequestInterface';

export async function storePostRequest(body: string): Promise<StorePostRequest> {
  const errors: StorePostRequest = await verifyFieldsPost(body);
  return errors;
}

async function verifyFieldsPost(body: string): Promise<StorePostRequest> {
  const errors: StorePostRequest = <StorePostRequest>{};
  const dataPost: StorePostRequest = JSON.parse(body);

  if (!Object.keys(dataPost).length) {
    errors.title = 'Title es required !';
    errors.content = 'Content is required !';
  }

  switch (Object.keys(dataPost).length > 0) {
    case !dataPost.title:
      errors.title = 'Title is required !';
      break;
    case !dataPost.content:
      errors.content = 'Content is required !';
      break;
    case <number>dataPost.content?.length < 15:
      errors.content = 'Content should has at least 15 characters';
      break;
    case <number>dataPost.title?.length < 8:
      errors.content = 'Title should has at least 8 characters';
      break;
  }

  return errors;
}
