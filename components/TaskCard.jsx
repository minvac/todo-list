import RemoveButton from "@/components/RemoveButton";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function TaskCard() {
  return (
    <div className="p-4 items-start border border-slate-300 my-3 flex justify-between gap-5">
      <div>
        <h2 className="text-2xl font-bold">Task Title</h2>
        <div>Task Description</div>
      </div>
      <div className="flex gap-1">
        <RemoveButton />
        <Link href={"/editTask/123"}>
          <Pencil className="hover:bg-slate-100 p-1" size={28} />
        </Link>
      </div>
    </div>
  );
}
