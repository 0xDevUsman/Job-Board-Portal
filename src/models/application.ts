import mongoose, { Schema, Document } from "mongoose";

export interface Application extends Document {
  jobId: string;
  userId: string;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: Date;
}

const ApplicationSchema = new Schema<Application>({
  jobId: {
    type: String || mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job",
  },
  userId: {
    type: String || mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  resume: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application ||
  mongoose.model<Application>("Application", ApplicationSchema);
