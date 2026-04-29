import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agents = await User.find({ role: "Agent" }).select("name _id email");
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}