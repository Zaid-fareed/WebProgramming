import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";

export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const updatedLead = await Lead.findByIdAndUpdate(params.id, data, { new: true });

    await ActivityLog.create({
      leadId: params.id,
      userId: session.user.id,
      action: "Lead Updated",
      details: `Updated fields: ${Object.keys(data).join(", ")}`
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    return NextResponse.json({ message: "Error updating lead" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await Lead.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Lead deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting lead" }, { status: 500 });
  }
}