/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@/models/user";
import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context:any) => {
  try {
    await dbConnect();

    const { id } = context.params;  // no await here

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findById(id).populate("postedBy", "firstname email");
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
};
