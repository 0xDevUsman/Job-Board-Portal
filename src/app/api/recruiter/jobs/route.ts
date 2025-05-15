import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import { jobSchema } from "@/types/job";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const jobs = await Job.find({ postedBy: userId }).populate(
      "postedBy",
      "firstname email" // or any other fields you want to include
    );

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching jobs",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();
    const parseBody = jobSchema.safeParse(body);
    if (!parseBody.success) {
      return NextResponse.json(
        { errors: parseBody.error.errors },
        { status: 400 }
      );
    }
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      postedBy,
    } = parseBody.data;
    const job = await new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      postedBy: new mongoose.Types.ObjectId(postedBy),
    });
    await job.save();
    return NextResponse.json({ message: "Job created", job }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "An error occurred while creating job",
      error: (error as Error).message,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { jobId, userId } = await req.json();

    if (!jobId || !userId) {
      return NextResponse.json(
        { message: "Missing jobId or userId" },
        { status: 400 }
      );
    }

    // Find the job and check ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    if (job.postedBy.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: You can only delete your own job" },
        { status: 403 }
      );
    }

    await Job.findByIdAndDelete(jobId);
    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while deleting the job",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
