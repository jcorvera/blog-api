export interface StorePost {
  title?: string;
  content?: string;
}

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
