import mongoose, { Schema, Document } from "mongoose";

// Job Interface
export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: number;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedBy: mongoose.Schema.Types.ObjectId; // Reference to the User who posted
  createdAt: Date;
}

// Job Schema
const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  salary: { type: Number, default: null },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const JobModel = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default JobModel;