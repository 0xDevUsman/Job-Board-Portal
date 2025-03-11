import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
