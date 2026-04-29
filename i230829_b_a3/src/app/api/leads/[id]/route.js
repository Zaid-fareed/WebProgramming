import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import nodemailer from "nodemailer";

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

    // --- ASSIGNMENT LOGIC ---
    if (updateData.assignedTo && String(updateData.assignedTo) !== String(oldLead.assignedTo)) {
      
      // 1. Create Activity Log
      await ActivityLog.create({
        lead: id,
        action: "Agent Assigned",
        performedBy: session.user.id,
        details: `Lead reassigned to ${updateData.assignedTo}`
      });

      // 2. Real-Time Socket Notification
      if (global.io) {
        global.io.to(updateData.assignedTo).emit("new_lead", {
          message: `New Lead Assigned: ${updatedLead.name}`,
          leadId: id
        });
      }

      // 3. --- EMAIL NOTIFICATION (NODEMAILER) ---
      // We use a test account for the project
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      let info = await transporter.sendMail({
        from: '"CRM System" <system@crm.com>',
        to: "agent@test.com", // In a real app, you'd fetch the agent's actual email
        subject: "New Lead Assigned!",
        text: `Hello, a new lead (${updatedLead.name}) has been assigned to you with a budget of ${updatedLead.budget.toLocaleString()} PKR.`,
        html: `<b>New Lead Assigned!</b><p>The lead <b>${updatedLead.name}</b> is now yours to handle.</p>`,
      });

      console.log("Email sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } else {
      // Logic for regular updates
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