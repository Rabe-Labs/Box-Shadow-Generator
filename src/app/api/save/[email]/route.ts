import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Save from "@/models/save";
import User from "@/models/user";

export async function GET(req: NextApiRequest, res: any) {
  try {
    await connectMongoDB();
    const { email } = res.params; // Access the 'email' query parameter
    const user = await User.findOne({ email: email });

    if (!user) {
      // If the user with the provided email is not found
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    const allSaves = await Save.find({ creator: user._id }).lean();

    if (allSaves?.length === 0) {
      return NextResponse.json(
        { data: allSaves, message: "No data found!" },
        { status: 200 }
      );
    }

    //const boxShadowSave = allSaves.map()

    return NextResponse.json({ data: allSaves }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: any) {
  try {
    await connectMongoDB();
    const { email } = res.params; // Access the 'email' query parameter
    const user = await User.findOne({ email: email });

    if (!user) {
      // If the user with the provided email is not found
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    const { boxShadows } = await req.json();

    const data = {
      boxShadows: boxShadows,
      creator: user._id,
    };

    console.log("total data", data);

    const newSave = await Save.create(data);

    if (!newSave) {
      return NextResponse.json(
        { message: "Something Went wrong!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Succesfully created new Save" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: any) {
  try {
    await connectMongoDB();
    const { email } = res.params; // Access the 'email' query parameter
    const user = await User.findOne({ email: email });

    if (!user) {
      // If the user with the provided email is not found
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    const { boxId } = await req.json();
    console.log("boxID", boxId);

    //const allSaves = await Save.find({ creator: user._id }).lean();

    const data = await Save.deleteOne({ _id: boxId });

    console.log("Deleted Data", data);

    return NextResponse.json(
      { message: "Succesfully Deleted the data" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
