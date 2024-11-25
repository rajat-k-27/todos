import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  completed: { type: Boolean, default: false },
  assignedToGroup: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  assignedToMember: { type: String },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
