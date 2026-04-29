import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Lost", "Won"],
    default: "New",
  },
  source: {
    type: String,
    enum: ["Website", "Referral", "Social Media", "Walk-in", "Phone", "Other"],
    default: "Other",
  },
  notes: { type: String },
  budget: { type: Number },
  score: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low",
  },
  propertyInterest: { type: String },
  followUpDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);