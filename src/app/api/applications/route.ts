import { dbConnect } from "@/lib/db";
import Application from "@/models/application";
import { applicationSchema } from "@/types/application";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const body = await req.json();

    const parseBody = applicationSchema.safeParse(body);
    if (!parseBody.success) {
      return NextResponse.json(
        { errors: parseBody.error.errors },
        { status: 400 }
      );
    }

    const { jobId, userId, resume } = parseBody.data;

    if (
      !mongoose.Types.ObjectId.isValid(jobId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return NextResponse.json(
        { message: "Invalid job ID or user ID" },
        { status: 400 }
      );
    }

    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 409 }
      );
    }

    const user = await mongoose
      .model("User")
      .findById(userId)
      .select("firstname email");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const job = await mongoose
      .model("Job")
      .findById(jobId)
      .select("title company");
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const application = new Application({
      jobId,
      userId,
      resume,
    });

    await application.save();

    return NextResponse.json(
      { message: "Application created successfully", application },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while creating application",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const applications = await Application.find()
      .populate("jobId", "title company")
      .populate("userId", "firstname email");

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching applications",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
