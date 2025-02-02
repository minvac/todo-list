"use client";
import { LayoutList } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-8 py-4 text-white font-bold">
      <Link href={"/tasks/"} className="flex gap-2 hover:bg-gray-700 p-1">
        <LayoutList />
        Todo List
      </Link>

      <button onClick={() => signOut()} className="bg-red-600 p-1">
        Exit
      </button>
      {/* 
      <button onClick={signOut} className="hover:bg-red-600 p-1" href={"/"}>
        Exit
      </button> */}

      <Link className="hover:bg-gray-700 p-1" href={"/tasks/addTask"}>
        Add +
      </Link>
    </nav>
  );
}
