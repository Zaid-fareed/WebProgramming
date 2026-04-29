import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    propertyInterest: { type: String, required: true },
    budget: { type: Number, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Closed'],
      default: 'New',
    },
    notes: { type: String, default: '' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    score: { type: String, enum: ['High', 'Medium', 'Low'] },
    followUpDate: { type: Date },
  },
  { timestamps: true }
);

leadSchema.pre('save', function (next) {
  if (this.budget > 20000000) {
    this.score = 'High';
  } else if (this.budget >= 10000000 && this.budget <= 20000000) {
    this.score = 'Medium';
  } else {
    this.score = 'Low';
  }
  next();
});

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);