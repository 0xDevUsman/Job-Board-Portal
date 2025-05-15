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

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await dbConnect();

  try {
    const { id } = await params;
    const { firstname, lastname, email } = await req.json();

    // Validate required fields (only email is truly required)
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
      });
    }

    // Update only provided fields (partial update)
    const updateData: Record<string, string> = { email };
    if (firstname !== undefined) updateData.firstname = firstname;
    if (lastname !== undefined) updateData.lastname = lastname;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id.toString(), // Make sure to include ID
          name: `${updatedUser.firstname || ""} ${
            updatedUser.lastname || ""
          }`.trim(),
          email: updatedUser.email,
          role: updatedUser.role[0], // Match how you store role in session
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in PATCH /api/profile/[id]:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
};
