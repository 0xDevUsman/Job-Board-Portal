import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Application from "@/models/application";
import Job from "@/models/jobs";
import User from "@/models/user"; // Make sure you have this import
import { dbConnect } from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnect();

    if (!mongoose.models.Job) {
      mongoose.model("Job", Job.schema);
    }
    if (!mongoose.models.User) {
      mongoose.model("User", User.schema);
    }
    if (!mongoose.models.Application) {
      mongoose.model("Application", Application.schema);
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid Job ID format" },
        { status: 400 }
      );
    }

    const applications = await Application.find({ jobId: id })
      .populate({
        path: "jobId",
        select: "title company", // Add more fields if needed
        model: "Job",
      })
      .populate({
        path: "userId",
        select: "firstname lastname email",
        model: "User",
      });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
