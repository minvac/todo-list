import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/User";

// CREATE
export async function POST (request) {
  await connectMongoDB();

  try {
    const { name, mail, password } = await request.json();
    console.info("Catching data:", { name, mail, password });

    if (!name || !mail || !password) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), { status: 400 });
    }

    const newUser = new User({
      name,
      mail,
      password,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// INDIVIDUAL USER BY MAIL
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