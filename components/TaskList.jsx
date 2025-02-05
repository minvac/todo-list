"use client";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import { getAllTasks } from "@/utils/tasks/serverUtils";
import { useUser } from "@/context/UserContext";

export default function TasksList() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("user :", user);
      if (user) {
        const { tasks } = await getAllTasks(user._id);
        setTasks(tasks);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleTaskRemoved = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return filterStatus === "completed" ? task.task_status : !task.task_status;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          className={`border p-1 hover:bg-slate-200 ${
            filterStatus === "all" ? "bg-slate-400" : ""
          }`}
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
        <button
          className={`border p-1 hover:bg-slate-200 ${
            filterStatus === "completed" ? "bg-slate-400" : ""
          }`}
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </button>
        <button
          className={`border p-1 hover:bg-slate-200 ${
            filterStatus === "pending" ? "bg-slate-400" : ""
          }`}
          onClick={() => setFilterStatus("pending")}
        >
          Pending
        </button>
      </div>
      {filteredTasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskRemoved={handleTaskRemoved}
        />
      ))}
    </div>
  );
}
