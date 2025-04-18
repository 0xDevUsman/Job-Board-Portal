import mongoose, { Schema, Document } from "mongoose";

export interface Application extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: Date;
}

const ApplicationSchema = new Schema<Application>({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
