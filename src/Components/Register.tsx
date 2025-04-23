"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import google from "@/assets/google.svg";
import github from "@/assets/github.svg";
import topRight from "@/assets/top-right.png";
import bottomLeft from "@/assets/bottom-left.png";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterProps = {
  showOAuth?: boolean; // Show Google/GitHub buttons
  showRoleInput?: boolean; // Show role dropdown/input
  defaultRole: "employee" | "recruiter"; // fallback role if no input
};

export default function Register({
  showOAuth = true,
  showRoleInput = false,
  defaultRole,
}: RegisterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        role,
      });
      console.log(data);
      if (data) {
        toast.success("Registration successful. Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          "Registration failed. Please try again."
        : "An unexpected error occurred. Please try again.";
      console.error("Registration failed:", errorMessage);
      alert(errorMessage);
    }
  };

  const googleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const githubSignIn = async () => {
    try {
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      console.error("Github login failed:", error);
      toast.error("Github login failed. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#F5FAFF] px-4">
      <div className="absolute hidden md:block md:opacity-70 lg:opacity-100 top-0 right-0">
        <Image src={topRight} alt="" />
      </div>
      <div className="flex justify-center items-center gap-3 mb-6">
        <Image src={logo} alt="CareerFlow Logo" width={40} height={40} />
        <h1 className="font-bold text-2xl text-gray-900">CareerFlow</h1>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm text-center">
        {showOAuth ? (
          <>
            <button
              onClick={googleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium px-4 py-3 rounded-md transition focus:ring-1 focus:ring-blue-500 hover:border-blue-500 duration-150"
            >
              <Image src={google} alt="Google Logo" width={20} height={20} />
              Sign in with Google
            </button>
            <button
              onClick={githubSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium px-4 py-3 rounded-md transition focus:ring-1 focus:ring-blue-500 hover:border-blue-500 duration-150 mt-4"
            >
              <Image src={github} alt="Github Logo" width={20} height={20} />
              Sign in with Github
            </button>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-[1px] w-full bg-gray-500"></div>
              <h1 className="text-sm text-gray-500">OR</h1>
              <div className="h-[1px] w-full bg-gray-500"></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-blue-500 tracking-tight mb-4">
              Register Recruiters !
            </h1>
          </>
        )}
        <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-3">
          <label
            htmlFor="first-name"
            className="text-gray-700 font-medium text-start mt-3"
          >
            <span className="text-red-500">*</span> First name
          </label>
          <input
            type="text"
            id="first-name"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <label
            htmlFor="last-name"
            className="text-gray-700 font-medium text-start mt-3"
          >
            <span className="text-red-500">*</span> Last name
          </label>
          <input
            type="text"
            id="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <label
            htmlFor="email"
            className="text-gray-700 font-medium text-start mt-3"
          >
            <span className="text-red-500">*</span> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <label
            htmlFor="password"
            className="text-gray-700 font-medium text-start mt-3"
          >
            <span className="text-red-500">*</span> Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {showRoleInput && (
            <>
              <label
                htmlFor="role"
                className="text-gray-700 font-medium text-start mt-3"
              >
                <span className="text-red-500">*</span> Role
              </label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "employee" | "recruiter")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="employee">Employee</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </>
          )}

          <h1 className="text-sm text-gray-500 mt-3 text-start">
            <Link href="/login">
              Already have an account?{" "}
              <span className="text-blue-500 hover:underline">Login</span>
            </Link>
          </h1>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-md shadow-sm transition focus:ring-1 focus:ring-blue-500 hover:bg-blue-600 duration-150 mt-6"
          >
            Register
          </button>
        </form>
      </div>
      <div className="absolute hidden md:block md:opacity-70 lg:opacity-100 bottom-0 left-0">
        <Image src={bottomLeft} alt="" />
      </div>
    </div>
  );
}
