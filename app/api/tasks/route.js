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

export async function GET () {
  await connectMongoDB();

  try {
    const tasks = await Task.find();
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE (request) {
  await connectMongoDB();

  try {
    // const { id } = request.params;
    const task = await Task.findByIdAndDelete("679ecee1e9c54106f8cd1f68");

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}