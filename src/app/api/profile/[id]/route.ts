/* eslint-disable @typescript-eslint/no-unused-vars */
import { dbConnect } from "@/lib/db";
import Application from "@/models/application";
import User from "@/models/user";
import Job from "@/models/jobs";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await dbConnect();

  try {
    const { id } = await params;
    console.log(id);
    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const applications = await Application.find({
      userId: id,
    }).populate("jobId");

    console.log(applications);

    return new Response(
      JSON.stringify({
        user: {
          name: user.firstname + " " + user.lastname,
          email: user.email,
          role: user.role,
          applications: applications.map((app) => ({
            applicationID: app._id,
            title: app.jobId?.title || "Unknown",
            company: app.jobId?.company || "Unknown",
            dateApplied: app.createdAt.toLocaleDateString(),
          })),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/profile/[id]:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
