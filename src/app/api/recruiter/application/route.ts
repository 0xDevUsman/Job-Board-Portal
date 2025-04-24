import Application from "@/models/application";
import Job from "@/models/jobs";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
// import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const recruiterId = searchParams.get("userId");
    console.log(recruiterId);
    if (!recruiterId) {
      return NextResponse.json(
        { error: "Invalid recruiter ID" },
        { status: 400 }
      );
    }

    const jobs = await Job.find({ postedBy: recruiterId }, "_id");
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("userId", "firstname lastname email") // employee info
      .populate("jobId", "title"); // job title

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching recruiter applications:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
