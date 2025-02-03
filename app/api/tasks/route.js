import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Task";

// CREATE
export async function POST(request) {
  await connectMongoDB();

  try {
    const { title, content, task_status, user_id } = await request.json();
    console.info("Catching data:", { title, content, task_status, user_id });

    if (!title || !content) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }

    const newTask = new Task({
      title,
      content,
      task_status,
      user_id,
    });

    await newTask.save();
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// READ ALL
// export async function GET () {
//   await connectMongoDB();

//   try {
//     const tasks = await Task.find();
//     return new Response(JSON.stringify(tasks), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

export async function GET(request) {
  await connectMongoDB();

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  console.log("userId :", userId);

  try {
    const tasks = await Task.find({ user_id: userId });
    console.log("tasks :", tasks);
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE
export async function DELETE(request) {
  await connectMongoDB();
  console.log(request);

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is missing from the query parameters" }),
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
