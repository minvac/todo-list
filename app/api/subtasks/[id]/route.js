import connectMongoDB from "@/libs/mongodb";
import { SubTask } from "@/models/SubTasks";

// UPDATE
export async function PUT(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const { title, subtask_status } = await request.json();

    if (!title) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }

    const subtask = await SubTask.findByIdAndUpdate(
      id,
      {
        title,
        subtask_status,
      },
      { new: true }
    );

    if (!subtask) {
      return new Response(JSON.stringify({ error: "SubTask not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(subtask), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// READ ONE
export async function GET(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const subtask = await SubTask.findById(id);

    if (!subtask) {
      return new Response(JSON.stringify({ error: "SubTask not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(subtask), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
