import connectMongoDB from "@/libs/mongodb";
import { Comment } from "@/models/Comments";

// CREATE
export async function POST(request) {
  await connectMongoDB();

  try {
    const { content, comment_status, task_id } = await request.json();
    console.info("Catching data:", { content, comment_status, task_id });

    if (!content || comment_status === undefined || !task_id) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }

    const newComment = new Comment({
      content,
      comment_status,
      task_id,
    });

    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
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
    const comments = await Comment.find({ task_id: taskId });
    console.log("comments :", comments);
    return new Response(JSON.stringify(comments), { status: 200 });
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

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return new Response(JSON.stringify({ error: "Comment not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
