import Application from "@/models/application";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { jobId: string } }) => {
  try {
    await dbConnect();
    const { jobId } = params;

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const applications = await Application.find({ jobId })
      .populate("userId", "firstname lastname email")
      .populate("jobId", "title");

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications for job:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

