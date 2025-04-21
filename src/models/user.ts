/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: false }, // Make optional
    lastname: { type: String, required: false }, // Make optional
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function (this: any): boolean {
        return this.provider === "credentials"; // Required only for email/password signups
      },
      select: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },
    role: {
      type: [String],
      enum: ["employee", "recruiter"],
      default: ["employee"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
