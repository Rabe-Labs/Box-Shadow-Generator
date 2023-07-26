import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

// @desc Register
// @route POST /api/user
// @acess Public
export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    await connectMongoDB();

    if (!name || !email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 404 });
    }

    await User.create({ name, email });

    return NextResponse.json(
      { message: "User succesfully Registered" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
