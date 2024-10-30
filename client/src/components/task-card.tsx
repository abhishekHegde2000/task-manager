import { toast } from "sonner";
import { useState } from "react";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import { TaskType } from "@/types/task.types";
import { useNavigate } from "react-router-dom";
import { Check, ChevronUp } from "lucide-react";
import UpdateTaskDialog from "./update-task-dialog";

const TaskCard = ({ task }: { task: TaskType }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Deleting the task...");

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/tasks/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(0);
      }
    } catch (err) {
      toast.dismiss(toastId);

      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div
        className="flex cursor-pointer flex-col justify-between gap-4 rounded-lg border bg-neutral-900 p-5 hover:bg-neutral-800 sm:flex-row sm:items-center"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">{task.title}</p>

          <p className="text-sm text-white/60">
            {task.description || "No description provided"}
          </p>
        </div>

        {task.status === "Pending" ? (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <ChevronUp className="w-5" /> {task.status}
          </p>
        ) : (
          <div className="flex items-center justify-between gap-5">
            <p className="flex items-center gap-2 text-sm text-blue-400">
              <Check className="w-5" /> {task.status}
            </p>

            <Button
              className="bg-red-700 hover:bg-red-800"
              variant={"destructive"}
              size={"sm"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {task.status === "Pending" && (
        <UpdateTaskDialog
          open={open}
          setOpen={setOpen}
          taskId={task._id}
          taskTitle={task.title}
          taskDescription={task.description}
        />
      )}
    </>
  );
};

export default TaskCard;
