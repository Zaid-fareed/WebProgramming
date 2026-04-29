import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectMongo();
    const statusStats = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const priorityStats = await Lead.aggregate([
      { $group: { _id: "$score", count: { $sum: 1 } } }
    ]);

    return NextResponse.json({ statusStats, priorityStats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}