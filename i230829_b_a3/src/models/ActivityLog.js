import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  details: { type: String },
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);