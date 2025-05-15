import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { jobId, userId } = body;
    if (!jobId || !userId) {
      return NextResponse.json(
        { message: "Missing jobId or userId" },
        { status: 400 }
      );
    }

    const job = await Job.findOne({ _id: jobId, postedBy: userId }).populate(
      "postedBy",
      "firstname email"
    );

    if (!job) {
      return NextResponse.json(
        { message: "Job not found or not posted by this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching the job",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { jobId, userId, ...updates } = body;

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json(
        { message: "Invalid or missing jobId" },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    if (job.postedBy.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: You can only update your own job" },
        { status: 403 }
      );
    }

    // Optional: Validate allowed fields
    const allowedFields = [
      "title",
      "company",
      "location",
      "description",
      "requirements",
      "salary",
      "jobType",
    ];

    for (const key in updates) {
      if (!allowedFields.includes(key)) {
        return NextResponse.json(
          { message: `Invalid field: ${key}` },
          { status: 400 }
        );
      }
    }

    Object.assign(job, updates);
    await job.save();

    return NextResponse.json(
      { message: "Job updated successfully", job },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while updating the job",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
