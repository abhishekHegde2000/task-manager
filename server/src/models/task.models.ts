import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubTask",
    },
  ],
});

export const Task = model("Task", taskSchema);
