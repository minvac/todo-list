import RemoveButton from "@/components/RemoveButton";
import { Pencil, CalendarClock } from "lucide-react";
import Link from "next/link";

export default function TaskCard({ id, task }) {
  return (
    <div className="p-4 items-start border border-slate-300 my-3 flex justify-between gap-5">
      <div>
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <div>{task.content}</div>
      </div>
      <div className="flex gap-1">
        <div className="flex items-center text-gray-400 font-bold">
          <CalendarClock className="p-1 ml-2" size={28} />
          <span className="text-xs">{task.createdAt}</span>
        </div>
        <RemoveButton />
        <Link href={`/editTask/${id}`}>
          <Pencil className="hover:bg-slate-100 p-1" size={28} />
        </Link>
      </div>
    </div>
  );
}
