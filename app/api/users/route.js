import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/User";

export async function GET (request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('mail');
    const user = await User.findOne({ mail: email });
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}