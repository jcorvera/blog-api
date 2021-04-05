interface commentRequest {
  data: { type?: string; attributes?: { content: string } };
}

interface Errors {
  data?: string;
  attributes?: string;
  type?: string;
  content?: string;
}

async function verifyFieldsComment(body: string): Promise<Errors> {
  const errors: Errors = <Errors>{};
  const dataComment: commentRequest = JSON.parse(body);

  switch (Object.keys(dataComment).length > 0 || !Object.keys(dataComment).length) {
    case !dataComment.data:
      errors.data = 'Data is required !';
      break;
    case !dataComment.data.attributes:
      errors.attributes = 'Attributes is required !';
      break;
    case !dataComment.data.type:
      errors.type = 'Type is required !';
      break;
    case dataComment.data.type !== 'comments':
      errors.type = 'Type should be comments !';
      break;
    case !dataComment.data.attributes?.content:
      errors.content = 'Content is required !';
      break;
    case <number>dataComment.data.attributes?.content?.length < 5:
      errors.content = 'Content should has at least 5 characters';
      break;
  }

  return errors;
}

export async function storeCommentRequest(body: string): Promise<Errors> {
  const errors: Errors = await verifyFieldsComment(body);
  return errors;
}
