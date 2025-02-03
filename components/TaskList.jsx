"use client";
import { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import { getAllTasks } from "@/utils/tasks/serverUtils";
import { useUser } from "@/context/UserContext";

export default function TasksList() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskRemoved={handleTaskRemoved}
        />
      ))}
    </div>
  );
}
