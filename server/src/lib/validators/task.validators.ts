import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type AddTaskType = z.infer<typeof addTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type UpdateSchemaType = z.infer<typeof updateTaskSchema>;
