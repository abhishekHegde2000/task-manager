import { Task } from "../models/task.models";
import type { Request, Response } from "express";
import { SubTask } from "../models/subtask.models";
import {
  addTaskSchema,
  updateTaskSchema,
} from "../lib/validators/task.validators";

export const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findOne({
      createdBy: req.userId,
    }).populate("subTasks");

    if (!tasks || tasks.subTasks.length === 0) {
      return res
        .status(200)
        .json({ msg: "Tasks not found", success: true, tasks: [] });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched", success: true, tasks: tasks.subTasks });
  } catch (err) {
    console.error("Error while fetching tasks: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { success, error, data } = addTaskSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: error.errors[0].message, success: false });
  }

  const { title, description } = data;

  try {
    const { _id } = await SubTask.create({
      title,
      description,
    });

    const tasks = await Task.findOne({
      createdBy: req.userId,
    });

    if (!tasks) {
      await Task.create({
        createdBy: req.userId,
        subTasks: [_id],
      });
    } else {
      tasks.subTasks.push(_id);
      await tasks.save();
    }

    return res
      .status(201)
      .json({ message: "Task added successfully", success: true });
  } catch (err) {
    console.error("Error while adding task: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { success, error, data } = updateTaskSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: error.errors[0].message, success: false });
  }

  const { title, description } = data;

  try {
    await SubTask.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });

    return res
      .status(200)
      .json({ message: "Task details updated", success: true });
  } catch (err) {
    console.error("Error while updating data: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    await SubTask.findByIdAndUpdate(req.params.id, {
      status: "Completed",
    });

    return res.status(200).json({ message: "Task completed", success: true });
  } catch (err) {
    console.error("Error while updating data: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userTasks = await Task.findOne({
      createdBy: req.userId,
    });

    if (userTasks) {
      userTasks.subTasks = userTasks.subTasks.filter(
        (id) => id.toString() !== req.params.id
      );

      await Promise.all([
        userTasks.save(),
        SubTask.findByIdAndDelete(req.params.id),
      ]);

      return res
        .status(200)
        .json({ message: "Task deleted successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
  } catch (err) {
    console.error("Error while deleting task: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
