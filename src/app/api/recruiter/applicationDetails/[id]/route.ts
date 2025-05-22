/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Application from "@/models/application";
import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import User from "@/models/user";

export const GET = async (request: Request, context:any) => {
  try {
    await dbConnect();

    // No await here — params is a plain object
    const { id } = context.params as { id: string };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID" },
        { status: 400 }
      );
    }

    // Register models if not already registered (for hot reload/dev mode)
    if (!mongoose.models.Job) {
      mongoose.model("Job", Job.schema);
    }
    if (!mongoose.models.User) {
      mongoose.model("User", User.schema);
    }

    const application = await Application.findOne({ userId: id })
      .populate({
        path: "jobId",
        select: "title company location description salary jobType",
      })
      .populate({
        path: "userId",
        select: "firstname lastname email",
      });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const responseData = {
      application: {
        _id: application._id,
        resume: application.resume,
        status: application.status,
        createdAt: application.createdAt,
        job: application.jobId,
        user: application.userId,
      },
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request, context: any) => {
  try {
    await dbConnect();

    const { id } = context.params as { id: string };
    const { status } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid application ID" },
        { status: 400 }
      );
    }

    const validStatuses = ["Pending", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate({
        path: "jobId",
        select: "title company location description salary jobType",
      })
      .populate({
        path: "userId",
        select: "firstname lastname email",
      });

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      application: {
        _id: updatedApplication._id,
        resume: updatedApplication.resume,
        status: updatedApplication.status,
        createdAt: updatedApplication.createdAt,
        job: updatedApplication.jobId,
        user: updatedApplication.userId,
      },
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
