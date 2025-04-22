import { dbConnect } from "@/lib/db";
import Job from "@/models/jobs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const jobs = await Job.find().populate("postedBy", "firstname email");
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
