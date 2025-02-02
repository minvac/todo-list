import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  task_status: { type: Boolean, required: true },
  user_id: { type: String, required: true },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export { Task };
