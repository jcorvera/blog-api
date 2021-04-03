import { Schema, model, Document, Types } from 'mongoose';

export interface Comment extends Document {
  post: Types.ObjectId | Record<string, unknown>;
  content: string;
  created_at: Date;
}

const CommentSchema: Schema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default model<Comment>('Comment', CommentSchema);
