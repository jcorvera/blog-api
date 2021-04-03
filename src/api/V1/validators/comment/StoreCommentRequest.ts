interface StoreComment {
  content?: string;
}

export async function storeCommentRequest(body: string): Promise<StoreComment> {
  const errors: StoreComment = await verifyFieldsComment(body);
  return errors;
}

async function verifyFieldsComment(body: string): Promise<StoreComment> {
  const errors: StoreComment = <StoreComment>{};
  const dataComment: StoreComment = JSON.parse(body);

  if (!Object.keys(dataComment).length) {
    errors.content = 'Content is required !';
  }

  switch (Object.keys(dataComment).length > 0) {
    case !dataComment.content:
      errors.content = 'Content is required !';
      break;
    case <number>dataComment.content?.length < 5:
      errors.content = 'Content should has at least 5 characters';
      break;
  }

  return errors;
}
