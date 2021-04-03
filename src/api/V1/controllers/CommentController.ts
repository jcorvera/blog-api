import { ServerResponse } from 'http';
import { error, success, formatDate } from '../../../common/helper';
import Comment from '../../../models/Comment';

interface Body {
  content: string;
}

interface CommentCollection extends Array<CommentResponse> {
  [index: number]: CommentResponse;
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
      error(res, 500, 'Something went wrong !', err);
    }
  }

  public async show(res: ServerResponse, params: string[]): Promise<void> {
    const [comment_id] = params;
    try {
      const comment: any = await Comment.findById(comment_id).exec();
      if (!comment) {
        return error(res, 404, 'Comment not found!', '');
      }
      const response: CommentResponse = await this.getCommentResponse(comment);
      success(res, 200, 'Comment Returned!', response);
    } catch (err) {
      error(res, 500, 'Something went wrong !', err);
    }
  }

  public async getComments(res: ServerResponse, params: string[]): Promise<void> {
    const [post] = params;
    try {
      const comments: any = await Comment.find({ post }, '_id content created_at').exec();
      const response = await this.getCommentCollection(comments);
      success(res, 201, 'Comments returned!', response);
    } catch (err) {
      error(res, 500, 'Something went wrong !', err);
    }
  }

  public async destroy(res: ServerResponse, params: string[]): Promise<void> {
    const [comment_id] = params;
    try {
      const comment: any = await Comment.findByIdAndDelete(comment_id).exec();
      if (!comment) {
        return error(res, 404, 'Comment not found !', '');
      }
      success(res, 200, 'Comment Deleted!', '');
    } catch (err) {
      error(res, 500, 'Something went wrong !', err);
    }
  }

  private async getCommentResponse(comment: any): Promise<CommentResponse> {
    const date: string = await formatDate(<Date>comment.created_at);
    return {
      id: comment._id,
      type: 'comments',
      attributes: { content: comment.content, created_at: date }
    };
  }

  private async getCommentCollection(comments: any): Promise<CommentCollection> {
    const data: CommentCollection = <CommentCollection>[];
    for (const comment of comments) {
      const response: CommentResponse = await this.getCommentResponse(comment);
      data.push(response);
    }
    return data;
  }
}
