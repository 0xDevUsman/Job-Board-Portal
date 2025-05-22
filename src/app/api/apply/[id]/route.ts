import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import Application from "@/models/application";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  try {
    const { id: appId } = params;

    if (!appId) {
      return new Response("Job ID and User ID are required", { status: 400 });
    }
    const deleteApplication = await Application.findOneAndDelete({
      _id: appId,
    });

    if (!deleteApplication) {
      return new Response("Application not found", { status: 404 });
    }
    return new Response(
      JSON.stringify({
        message: "Application deleted successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in DELETE /api/profile/[id]:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
