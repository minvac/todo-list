import connectMongoDB from "@/libs/mongodb";
import { SubTask } from "@/models/SubTasks";

// CREATE
export async function POST(request) {
  await connectMongoDB();

  try {
    const { title, subtask_status, task_id } = await request.json();
    console.info("Catching data:", { title, subtask_status, task_id });

    if (!title || subtask_status === undefined || !task_id) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }

    const newSubTask = new SubTask({
      title,
      subtask_status,
      task_id,
    });

    await newSubTask.save();
    return new Response(JSON.stringify(newSubTask), { status: 201 });
  } catch (error) {
    console.error("Error creating subtask:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// READ ALL
export async function GET(request) {
  await connectMongoDB();

  const url = new URL(request.url);
  const taskId = url.searchParams.get("taskId");
  console.log("taskId :", taskId);

  try {
    const subtasks = await SubTask.find({ task_id: taskId });
    console.log("subtasks :", subtasks);
    return new Response(JSON.stringify(subtasks), { status: 200 });
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

    const subtask = await SubTask.findByIdAndDelete(id);

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
