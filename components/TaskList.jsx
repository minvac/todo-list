import TaskCard from "@/components/TaskCard";

const getTasks = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl + "/api/tasks", {
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
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
