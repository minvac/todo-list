import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: true },
  comment_status: { type: Boolean, required: true },
  task_id: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export { Comment };
