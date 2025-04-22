import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import { NextRequest, NextResponse } from "next/server";
import { jobSchema } from "@/types/job";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId } = body; // Receive userId from frontend

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const jobs = await Job.find({ postedBy: userId }).populate(
      "postedBy",
      "firstname email"
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
