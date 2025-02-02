"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeTask = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this task?"
    );

    if (!confirm) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.info("Task removed:", id);
        router.refresh();
      } else {
        alert("Failed to remove task");
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
    <a onClick={() => removeTask(id)} title="Remove task">
      <Trash2 className="text-red-700 hover:bg-slate-100 p-1" size={28} />
    </a>
  );
}
