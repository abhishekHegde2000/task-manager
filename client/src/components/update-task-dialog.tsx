import { toast } from "sonner";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

type UpdateTaskDialogProps = {
  open: boolean;
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateTaskDialog = ({
  open,
  taskId,
  taskTitle,
  taskDescription,
  setOpen,
}: UpdateTaskDialogProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating task details...");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/tasks/${taskId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
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

  const handleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/tasks/${taskId}`,
        {}, // No payload so empty
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update task details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
              <span className="text-red-700">*</span>
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button className="my-3 sm:my-0" type="submit" onClick={handleUpdate}>
            Update
          </Button>

          <Button type="submit" variant={"ghost"} onClick={handleComplete}>
            Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
