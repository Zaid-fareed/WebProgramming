import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;

    // Fetch logs and join with the User model to see names
    const logs = await ActivityLog.find({ lead: id })
      .populate("performedBy", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}