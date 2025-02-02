import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Task";

export async function PUT (request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const { title, comment, task_status } = await request.json();

    if (!title || !comment) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    const task = await Task.findByIdAndUpdate(id, {
      title,
      comment,
      task_status
    }, { new: true });

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET (request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const task = await Task.findById(id);

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
