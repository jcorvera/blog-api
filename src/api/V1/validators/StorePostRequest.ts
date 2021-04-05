interface PostRequest {
  data: { type?: string; attributes?: { title: string; content: string } };
}

interface Errors {
  data?: string;
  attributes?: string;
  type?: string;
  title?: string;
  content?: string;
}

async function verifyFieldsPost(body: string): Promise<Errors> {
  const errors: Errors = <Errors>{};
  const dataPost: PostRequest = JSON.parse(body);

  switch (Object.keys(dataPost).length > 0 || !Object.keys(dataPost).length) {
    case !dataPost.data:
      errors.data = 'Data is required !';
      break;
    case !dataPost.data.attributes:
      errors.attributes = 'Attributes is required !';
      break;
    case !dataPost.data.type:
      errors.type = 'Type is required !';
      break;
    case dataPost.data.type !== 'posts':
      errors.type = 'Type should be posts !';
      break;
    case !dataPost.data.attributes?.title:
      errors.title = 'Title is required !';
      break;
    case <number>dataPost.data.attributes?.title?.length < 8:
      errors.title = 'Title should has at least 8 characters';
      break;
    case !dataPost.data.attributes?.content:
      errors.content = 'Content is required !';
      break;
    case <number>dataPost.data.attributes?.content?.length < 15:
      errors.content = 'Content should has at least 15 characters';
      break;
  }

  return errors;
}

export async function storePostRequest(body: string): Promise<Errors> {
  const errors: Errors = await verifyFieldsPost(body);
  return errors;
}
