import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  propertyInterest: { type: String, required: true },
  budget: { type: Number, required: true },
  score: { 
    type: String, 
    enum: ["High", "Medium", "Low"], 
    default: "Low" 
  },
  status: { 
    type: String, 
    enum: ["New", "Contacted", "Interested", "Closed", "Lost"], 
    default: "New" 
  },
  source: { 
    type: String, 
    enum: ["Facebook", "Instagram", "Website", "Walk-in"], 
    default: "Website" 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  followUpDate: { type: Date },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);