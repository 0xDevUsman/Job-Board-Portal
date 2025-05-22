/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Application from "@/models/application";

export async function DELETE(request: NextRequest, context: any) {
  await dbConnect();

  try {
    const { id: appId } = context.params;

    if (!appId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    const deleteApplication = await Application.findOneAndDelete({
      _id: appId,
    });

    if (!deleteApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/apply/[id]:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
