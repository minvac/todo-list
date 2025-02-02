"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getTaskFromId = async (id) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const updateTask = async (id, updatedTask) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export default function EditTaskForm({ id }) {
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    content: "",
    task_status: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTaskFromId(id);
      setTask(fetchedTask);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = await updateTask(id, task);
    console.log("Updated task: ", updatedTask);
    router.push("/tasks/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          onChange={(e) => setTask({ ...task, task_status: e.target.checked })}
        />
        Completed
      </label>
      <button
        type="submit"
        className="font-bold text-white bg-green-600 py-3 px-6 w-fit"
      >
        Update Task
      </button>
    </form>
  );
}
