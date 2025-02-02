import TaskCard from "@/components/TaskCard";

const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { tasks: data };
  } catch (error) {
    console.error(error);
    return { tasks: [] };
  }
};

export default async function TasksList() {
  const { tasks } = await getTasks();
  console.log("tasks", tasks);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
