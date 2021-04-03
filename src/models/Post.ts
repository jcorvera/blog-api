import { Schema, model } from 'mongoose';

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default model('Post', PostSchema);
