import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import AddTask from "@/components/add-task";
import { Ghost, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import TaskCard from "@/components/task-card";
import { TaskType } from "@/types/task.types";
import { authAtom } from "@/store/atoms/auth";
import { filterAtom } from "@/store/atoms/filter";
import FilterTasksDropdown from "@/components/filter-tasks-dropdown";

const Tasks = () => {
  const [tasks, isLoading] = useTasks();
  const filter = useRecoilValue(filterAtom);
  const isAuthorized = useRecoilValue(authAtom);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Array<TaskType>>(tasks);

  useEffect(() => {
    let filteredArray = tasks;

    if (filter !== "All") {
      filteredArray = tasks.filter((task) => task.status === filter);
    }

    if (searchTerm) {
      filteredArray = filteredArray.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filteredArray);
  }, [filter, tasks, searchTerm]);

  if (isLoading) {
    return (
      <p className="flex min-h-[80svh] items-center justify-center">
        <Loader className="animate-spin" />
      </p>
    );
  }

  if (!isAuthorized) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <main className="flex items-center justify-center">
      <section className="flex w-[90vw] flex-col justify-center gap-4 sm:w-[80vw]">
        <article className="flex w-full items-center justify-between gap-4 pt-8">
          <h1 className="text-3xl font-medium text-blue-500">Tasks</h1>

          <div className="flex items-center gap-4">
            <Input
              type="text"
              value={searchTerm}
              placeholder="Search tasks"
              className="hidden py-[22px] sm:block"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FilterTasksDropdown />

            <AddTask />
          </div>
        </article>

        <Input
          type="text"
          value={searchTerm}
          placeholder="Search tasks"
          className="block py-[22px] sm:hidden"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <article className="flex flex-col gap-4 py-8">
          {filteredTasks.length === 0 && (
            <div className="flex min-h-[50svh] flex-col items-center justify-center gap-5">
              <Ghost />

              <p className="text-center text-sm font-medium text-white/70">
                No tasks found. Create your first task to get started.
              </p>
            </div>
          )}

          {filteredTasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Tasks;
