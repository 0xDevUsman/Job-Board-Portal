import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { recruiterSchema } from "@/types/user";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const body = await req.json();
    const parseBody = recruiterSchema.safeParse(body);
    if (!parseBody.success) {
      return NextResponse.json(
        { errors: parseBody.error.errors },
        { status: 400 }
      );
    }
    const { firstname, lastname, email, password, role } = parseBody.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { errors: { email: "Email already exists" } },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role !== "recruiter") {
      return NextResponse.json({
        message: "register as employee",
      });
    }
    const user = await new User({
      firstname: firstname || "",
      lastname: lastname || "",
      email,
      password: hashedPassword,
      role: role || "employee",
    });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not created" },
        { status: 400 }
      );
    }
    await user.save();
    return NextResponse.json({
      message: "User created",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "An error occurred while registering user",
      error: (error as Error).message,
    });
  }
};
