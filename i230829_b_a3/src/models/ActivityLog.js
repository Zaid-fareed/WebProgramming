import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
  action: { type: String, required: true }, // e.g., "Lead Created", "Assigned to Agent"
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  details: { type: String },
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);