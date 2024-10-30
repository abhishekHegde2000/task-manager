import { atom } from "recoil";
import { TaskType } from "@/types/task.types";

export const tasksAtom = atom<Array<TaskType>>({
  key: "tasksAtom",
  default: [],
});
