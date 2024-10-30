import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares";
import {
  fetchAllTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../controllers/task.controllers";

const router = Router();

router.get("/", auth, fetchAllTasks);

router.post("/", auth, addTask);

router.put("/:id", auth, updateTask);

router.patch("/:id", auth, completeTask);

router.delete("/:id", auth, deleteTask);

export default router;
