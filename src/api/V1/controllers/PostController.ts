import { ServerResponse } from 'http';
import { generateSlug, error, success, formatDate } from '../../../common/helper';
import Post from '../../../models/Post';

interface Body {
  title: string;
  content: string;
}

interface PostResponse {
  id: string;
  type: string;
  attributes: { slug: string; title: string; content: string; created_at: string };
}

export class PostController {
  public async store(res: ServerResponse, body: string): Promise<void> {
    const postData: Body = JSON.parse(body);
    const { title, content } = postData;
    const getSlug = await generateSlug(title);
    const slug = getSlug + '-' + Date.now();
    try {
      const post: any = await Post.create({ title, slug, content });
      const response: PostResponse = await this.getPostResponse(post);
      success(res, 201, 'Post created!', response);
    } catch (err) {
      error(res, 500, 'something went wrong !', err);
    }
  }

  public async show(res: ServerResponse, params: string[]): Promise<void> {
    const [post_id] = params;
    try {
      const post: any = await Post.findById(post_id).exec();
      if (!post) {
        return error(res, 404, 'Post not found', '');
      }
      const response: PostResponse = await this.getPostResponse(post);
      success(res, 200, 'Post Returned!', response);
    } catch (err) {
      error(res, 500, 'something went wrong !', err);
    }
  }

  public async destroy(res: ServerResponse, params: string[]): Promise<void> {
    const [post_id] = params;
    try {
      const post: any = await Post.findByIdAndDelete(post_id).exec();
      if (!post) {
        return error(res, 404, 'Post not found', '');
      }
      success(res, 200, 'Post Deleted!', '');
    } catch (err) {
      error(res, 500, 'something went wrong !', err);
    }
  }

  private async getPostResponse(post: any): Promise<PostResponse> {
    const date: string = await formatDate(<Date>post.created_at);
    return {
      id: post._id,
      type: 'posts',
      attributes: { slug: post.slug, title: post.title, content: post.content, created_at: date }
    };
  }
}
