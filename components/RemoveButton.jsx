import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function RemoveButton() {
  return (
    <Link href={"/removeTask/123"} title="Remove task">
      <Trash2 className="text-red-700 hover:bg-slate-100 p-1" size={28} />
    </Link>
  );
}
