import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params; 
    const lead = await Lead.findById(id).populate("assignedTo", "name");
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params; 
    const updateData = await req.json();
    const oldLead = await Lead.findById(id);

    const updatedLead = await Lead.findByIdAndUpdate(id, updateData, { 
        returnDocument: 'after' 
    });

    // --- ACTIVITY LOG ---
    if (updateData.assignedTo && String(updateData.assignedTo) !== String(oldLead.assignedTo)) {
      await ActivityLog.create({
        lead: id,
        action: "Agent Assigned",
        performedBy: session.user.id,
        details: `Lead reassigned from ${oldLead.assignedTo || 'Unassigned'} to ${updateData.assignedTo}`
      });

      // --- REAL-TIME NOTIFICATION (Socket.io) ---
      // This tells the specific agent that a lead was just assigned to them
      if (global.io) {
        global.io.to(updateData.assignedTo).emit("new_lead", {
          message: `New Lead Assigned: ${updatedLead.name}`,
          leadId: id
        });
      }
      
    } else {
      await ActivityLog.create({
        lead: id,
        action: "Lead Updated",
        performedBy: session.user.id,
        details: `Fields updated: ${Object.keys(updateData).join(", ")}`
      });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params; 
    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ message: "Lead deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}