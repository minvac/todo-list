import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Task";

export async function POST (request) {
  await connectMongoDB();

  try {
    const { title, comment, task_status } = await request.json();

    if (!title || !comment) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    const newTask = new Task({
      title,
      comment,
      task_status
    });

    await newTask.save();
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}