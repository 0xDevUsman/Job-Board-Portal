import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";
import Application from "@/models/application";

async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobId = new mongoose.Types.ObjectId(formData.get("jobId") as string);
    const userId = new mongoose.Types.ObjectId(
      formData.get("userId") as string
    );

    if (!file || !jobId || !userId) {
      return NextResponse.json(
        { error: "Resume, Job ID, and User ID are required" },
        { status: 400 }
      );
    }

    const buffer = await fileToBuffer(file);
    const base64 = buffer.toString("base64");

    const uploadRes = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`,
      {
        folder: "resumes",
        resource_type: "raw",
      }
    );

    const resumeUrl = uploadRes.secure_url;

    const newApplication = new Application({
      resume: resumeUrl,
      jobId,
      userId,
    });

    await newApplication.save();
    return NextResponse.json({ message: "Resume uploaded!", resumeUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}