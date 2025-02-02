import { LayoutList } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-8 py-4 text-white font-bold">
      <Link href={"/"} className="flex gap-2 hover:bg-gray-700 p-1">
        <LayoutList />
        Todo List
      </Link>
      <Link className="hover:bg-gray-700 p-1" href={"/addTask"}>
        Add +
      </Link>
    </nav>
  );
}
