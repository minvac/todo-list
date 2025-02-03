import mongoose, { Schema } from "mongoose";

const subTaskSchema = new Schema({
  title: { type: String, required: true },
  subtask_status: { type: Boolean, required: true },
  task_id: { type: String, required: true },
});

const SubTask =
  mongoose.models.SubTask || mongoose.model("SubTask", subTaskSchema);

export { SubTask };
