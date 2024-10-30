import { toast } from "sonner";
import { useRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TaskType } from "@/types/task.types";
import { tasksAtom } from "@/store/atoms/tasks";

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useRecoilState<Array<TaskType>>(tasksAtom);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setTasks(res.data.tasks);
        }
      } catch (err) {
        console.error("Error in useTasks hook: ", err);

        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return [tasks, isLoading] as const;
};
