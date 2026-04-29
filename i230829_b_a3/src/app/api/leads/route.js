import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    let score = "Low";
    const budget = Number(data.budget);
    if (budget > 20000000) score = "High";
    else if (budget >= 10000000) score = "Medium";

    const newLead = await Lead.create({
      ...data,
      score,
      assignedTo: session.user.role === "Agent" ? session.user.id : data.assignedTo || null
    });

    await ActivityLog.create({
      lead: newLead._id,
      action: "Lead Created",
      performedBy: session.user.id,
      details: `Lead created with ${score} priority based on budget of PKR ${budget}`
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let leads;
    if (session.user.role === "Admin") {
      leads = await Lead.find().populate("assignedTo", "name email").sort({ createdAt: -1 });
    } else {
      leads = await Lead.find({ assignedTo: session.user.id }).sort({ createdAt: -1 });
    }

    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}