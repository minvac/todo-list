import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  task_status: { type: Boolean, required: true },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export { Task };
