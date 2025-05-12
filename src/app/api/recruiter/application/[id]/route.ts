import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Application from "@/models/application";
import Job from "@/models/jobs";
import User from "@/models/user";
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
        select: "title company",
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnect();

    const { id } = await params;
    const { status } = await req.json();

    // Validate status
    const validStatuses = ["Pending", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Validate application ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID" },
        { status: 400 }
      );
    }

    // Update the application
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("userId", "firstname lastname email") // Populate user details
      .populate("jobId", "title"); // Populate job details

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
