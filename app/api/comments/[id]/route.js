import connectMongoDB from "@/libs/mongodb";
import { Comment } from "@/models/Comments";

// UPDATE
export async function PUT(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const { content, comment_status } = await request.json();

    if (!content) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }

    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        content,
        comment_status,
      },
      { new: true }
    );

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

// READ ONE
export async function GET(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const comment = await Comment.findById(id);

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
