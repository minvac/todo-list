import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Task";

export async function POST (request) {
  await connectMongoDB();

  try {
    const { title, content, task_status } = await request.json();
    console.info("Catching data:", { title, content, task_status });


    if (!title || !content) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    const newTask = new Task({
      title,
      content,
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
  console.log(request);
  

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is missing from the query parameters" }), { status: 400 });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}