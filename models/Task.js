import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true }, //{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // status: { type: String, enum: status_list, default: "pending" },
  // created_at: { type: Date, default: Date.now },
  // user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }]
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export { User, Task, Subtask, Comment };
