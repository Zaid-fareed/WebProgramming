import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";

export async function GET(req) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let leads;
    if (session.user.role === "Admin") {
      leads = await Lead.find({}).populate("assignedTo", "name");
    } else {
      leads = await Lead.find({ assignedTo: session.user.id });
    }
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching leads" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const newLead = await Lead.create(data);

    await ActivityLog.create({
      leadId: newLead._id,
      userId: session.user.id,
      action: "Lead Created",
      details: `Lead created for ${newLead.name}`
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating lead" }, { status: 500 });
  }
}