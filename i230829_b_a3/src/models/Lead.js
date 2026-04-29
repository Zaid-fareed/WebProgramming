import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  status: { 
    type: String, 
    enum: ["New", "Contacted", "Qualified", "Lost", "Won"], 
    default: "New" 
  },
  source: { type: String },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);