import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectMongo();
    
    // Grouping by Status for a Pie Chart
    const statusStats = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Grouping by Score (Priority) for a Bar Chart
    const priorityStats = await Lead.aggregate([
      { $group: { _id: "$score", count: { $sum: 1 } } }
    ]);

    return NextResponse.json({ statusStats, priorityStats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}