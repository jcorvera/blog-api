import { Schema, model, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  slug: string;
  content: string;
  created_at?: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default model<Post>('Post', PostSchema);
