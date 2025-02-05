"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/utils/tasks/serverUtils";
import { useUser } from "@/context/UserContext";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();

  const task_status = false;
  const user_id = user._id;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    console.info("Sending data:", { title, content, task_status, user_id });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await createTask(title, content, task_status, user_id);
      if (response.ok) {
        router.push("/tasks/");
        router.refresh();
      } else {
        alert("Failed to add task");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        className="border border-gray-500 px-8 py-2"
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        className="border border-gray-500 px-8 py-2"
        placeholder="Task Content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />

      <button
        type="submit"
        className="font-bold  text-white bg-green-600 py-3 px-6 w-fit"
      >
        Add Task
      </button>
    </form>
  );
}
