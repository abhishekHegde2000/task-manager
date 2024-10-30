import { Schema, model } from "mongoose";

const subTaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubTask = model("SubTask", subTaskSchema);
