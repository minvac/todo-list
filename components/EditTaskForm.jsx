export default function EditTaskForm() {
  return (
    <form action="" className="flex flex-col gap-3">
      <input
        type="text"
        className="border border-gray-500 px-8 py-2"
        placeholder="Task Title"
      />
      <input
        type="text"
        className="border border-gray-500 px-8 py-2"
        placeholder="Task Description"
      />

      <button className="font-bold  text-white bg-green-600 py-3 px-6 w-fit">
        Update Task
      </button>
    </form>
  );
}
