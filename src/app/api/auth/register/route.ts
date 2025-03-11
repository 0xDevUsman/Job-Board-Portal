import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { registerSchema } from "@/types/user";
export const POST = async (req: Request) => {
  await dbConnect();

  try {
    const body = await req.json();
    const parseBody = registerSchema.safeParse(body);

    if (!parseBody.success) {
      return NextResponse.json(
        { errors: parseBody.error.errors },
        { status: 400 }
      );
    }

    const { firstname, lastname, email, password } = parseBody.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { errors: { email: "Email already exists" } },
        { status: 400 }
      );
    }
    const hashedPassoword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassoword,
    });
    await user.save();
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "An error occurred while registering user",
      error: (error as Error).message,
    });
  }
};
