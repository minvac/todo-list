import TaskCard from "@/components/TaskCard";
import { getAllTasks } from "@/utils/tasks/serverUtils";

export default async function TasksList() {
  const { tasks } = await getAllTasks();

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
