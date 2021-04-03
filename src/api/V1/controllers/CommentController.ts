import { ServerResponse } from 'http';
import { error, success, formatDate } from '../../../common/helper';
import Comment from '../../../models/Comment';

interface Body {
  content: string;
}

interface CommentResponse {
  id: string;
  type: string;
  attributes: { content: string; created_at: string };
}

export class CommentController {
  public async store(res: ServerResponse, body: string, params: string[]): Promise<void> {
    const [post] = params;
    const commentData: Body = JSON.parse(body);
    const { content } = commentData;
    try {
      const comment: any = await Comment.create({ post, content });
      const response: CommentResponse = await this.getCommentResponse(comment);
      success(res, 201, 'Comment created!', response);
    } catch (err) {
      error(res, 500, 'something went wrong !', err);
    }
  }

  private async getCommentResponse(comment: any): Promise<CommentResponse> {
    const date: string = await formatDate(<Date>comment.created_at);
    return {
      id: comment._id,
      type: 'comment',
      attributes: { content: comment.content, created_at: date }
    };
  }
}
