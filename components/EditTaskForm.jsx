"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTaskFromId, updateTask } from "@/utils/tasks/serverUtils";
import { areAllSubTasksCompleted } from "@/utils/subtasks/serverUtils";
import SubTasks from "./SubTasks";
import Comments from "./Comments";

export default function EditTaskForm({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({
    title: "",
    content: "",
    task_status: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTaskFromId(id);
      setTask(fetchedTask);
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.task_status) {
      const allSubTasksCompleted = await areAllSubTasksCompleted(id);
      if (!allSubTasksCompleted) {
        alert("All subtasks must be completed.");
        return;
      }
    }
    const updatedTask = await updateTask(id, task);
    console.log("Updated task: ", updatedTask);
    router.push("/tasks/");
    router.refresh();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-b pb-4"
      >
        <input
          type="text"
          className="border border-gray-500 px-8 py-2"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          type="text"
          className="border border-gray-500 px-8 py-2"
          placeholder="Task Content"
          value={task.content}
          onChange={(e) => setTask({ ...task, content: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={task.task_status}
            onChange={(e) =>
              setTask({ ...task, task_status: e.target.checked })
            }
          />
          {task.task_status ? "Completed" : "Pending"}
        </label>
        <button
          type="submit"
          className="font-bold text-white bg-green-600 py-3 px-6 w-fit"
        >
          Update Task
        </button>
      </form>

      <SubTasks id={id} />
      <Comments id={id} />
    </>
  );
}
