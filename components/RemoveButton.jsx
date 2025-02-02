"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeTask } from "@/utils/tasks/serverUtils";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const handleRemoveTask = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this task?"
    );

    if (!confirm) return;

    try {
      const response = await removeTask(id);

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
    <a onClick={() => handleRemoveTask(id)} title="Remove task">
      <Trash2 className="text-red-700 hover:bg-slate-100 p-1" size={28} />
    </a>
  );
}
