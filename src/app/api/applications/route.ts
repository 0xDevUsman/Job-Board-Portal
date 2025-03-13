import { dbConnect } from "@/lib/db";
import Application from "@/models/application";
import { applicationSchema } from "@/types/application";
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

    const application = new Application({
      jobId,
      userId,
      resume,
    });
    await application.save();
    return NextResponse.json(
      { message: "Application created", application },
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
