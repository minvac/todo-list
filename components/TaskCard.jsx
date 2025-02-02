import RemoveButton from "@/components/RemoveButton";
import { Pencil, CalendarClock, Square, SquareCheck } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function TaskCard({ task }) {
  const formattedDateTime = format(
    new Date(
      task.createdAt === task.updatedAt ? task.createdAt : task.updatedAt
    ),
    "PPP p"
  );

  return (
    <div className="p-4 items-start border border-slate-300 my-3 flex justify-between gap-5 relative">
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          {task.task_status ? (
            <SquareCheck className="text-green-600 p-1" size={26} />
          ) : (
            <Square className="text-gray-400 p-1" size={26} />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <div className="mb-4">{task.content}</div>
          <div
            className="flex items-center text-gray-400"
            title="Last modification"
          >
            <CalendarClock className="p-1 mr-1" size={22} />
            <span className="text-[10px] italic whitespace-nowrap">
              {formattedDateTime}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <RemoveButton id={task._id} />
        <Link href={`/tasks/editTask/${task._id}`} title="Edit task">
          <Pencil className="hover:bg-slate-100 p-1" size={28} />
        </Link>
      </div>
    </div>
  );
}
