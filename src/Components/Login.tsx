"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import google from "@/assets/google.svg";
import topRight from "@/assets/top-right.png";
import bottomLeft from "@/assets/bottom-left.png";
export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#F5FAFF] px-4">
      <div className="absolute top-0 right-0">
        <Image src={topRight} alt="" />
      </div>
      <div className="flex justify-center items-center gap-3 mb-6">
        <Image src={logo} alt="CareerFlow Logo" width={40} height={40} />
        <h1 className="font-bold text-2xl text-gray-900">CareerFlow</h1>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm text-center">
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium px-4 py-3 rounded-md transition focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:border-blue-500 duration-150"
        >
          <Image src={google} alt="Google Logo" width={20} height={20} />
          Sign in with Google
        </button>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-[1px] w-full bg-gray-500"></div>
          <h1 className="text-sm text-gray-500">OR</h1>
          <div className="h-[1px] w-full bg-gray-500"></div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-md shadow-sm transition focus:ring-2 focus:ring-blue-500 hover:cursor-pointer hover:bg-blue-600 duration-150 mt-6">
          Login
        </button>
      </div>
      <div className="absolute bottom-0 left-0">
        <Image src={bottomLeft} alt="" />
      </div>
    </div>
  );
}
