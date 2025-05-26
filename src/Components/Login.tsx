"use client";

import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import google from "@/assets/google.svg";
import github from "@/assets/github.svg";
import topRight from "@/assets/top-right.png";
import bottomLeft from "@/assets/bottom-left.png";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");

        const session = await getSession();

        setTimeout(() => {
          if (session?.user?.role === "recruiter") {
            router.push("/recruiter/dashboard");
          } else {
            router.push("/");
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#F5FAFF] px-4 py-8 sm:py-0">
      <div className="absolute hidden sm:block opacity-70 lg:opacity-100 top-0 right-0">
        <Image src={topRight} alt="" className="w-full h-auto max-w-xs lg:max-w-md" />
      </div>
      <div className="flex justify-center items-center gap-3 mb-6">
        <Image src={logo} alt="CareerFlow Logo" width={40} height={40} />
        <h1 className="font-bold text-2xl text-gray-900">CareerFlow</h1>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-sm text-center">
        <button
          onClick={() => googleSignIn()}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium px-4 py-2 sm:py-3 rounded-md transition focus:ring-1 focus:ring-blue-500 hover:cursor-pointer hover:border-blue-500 duration-150 text-sm sm:text-base"
        >
          <Image src={google} alt="Google Logo" width={20} height={20} />
          Sign in with Google
        </button>
        <button
          onClick={() => githubSignIn()}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium px-4 py-2 sm:py-3 rounded-md transition focus:ring-1 focus:ring-blue-500 hover:cursor-pointer hover:border-blue-500 duration-150 mt-4 text-sm sm:text-base"
        >
          <Image src={github} alt="Google Logo" width={20} height={20} />
          Sign in with Github
        </button>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-[1px] w-full bg-gray-500"></div>
          <h1 className="text-sm text-gray-500">OR</h1>
          <div className="h-[1px] w-full bg-gray-500"></div>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-3">
          <label
            htmlFor="email"
            className="text-gray-700 font-medium text-start mt-3 text-sm sm:text-base"
          >
            <span className="text-red-500">*</span> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
          />
          <label
            htmlFor="password"
            className="text-gray-700 font-medium text-start mt-3 text-sm sm:text-base"
          >
            <span className="text-red-500">*</span> Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
          />
          <div className="text-sm text-gray-500 mt-3 text-start">
            <Link href="/register" className="">
              Don&apos;t have an account?{" "}
              <span className="text-blue-500 hover:underline">Register</span>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 sm:py-3 rounded-md shadow-sm transition focus:ring-1 focus:ring-blue-500 hover:cursor-pointer hover:bg-blue-600 duration-150 mt-4 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
      <div className="absolute hidden sm:block opacity-70 lg:opacity-100 bottom-0 left-0">
        <Image src={bottomLeft} alt="" className="w-full h-auto max-w-xs lg:max-w-md" />
      </div>
    </div>
  );
}