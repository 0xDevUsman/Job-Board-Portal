"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const isLoggedIn = status === "authenticated";

  return (
    <>
      <div className="w-full h-16 bg-white flex items-center justify-around shadow-lg px-16 py-2">
        <Link href="/" className="flex items-center gap-4">
          <Image width={40} height={40} src={logo} alt="Logo" />
          <h1 className="text-2xl text-blue-600 font-bold">CAREER FLOW</h1>
        </Link>

        {isLoggedIn ? (
          <div className="flex justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-6">
              <Link className="text-gray-600 hover:text-blue-600" href="/jobs">
                Jobs
              </Link>
              <Link className="text-gray-600 hover:text-blue-600" href="/about">
                About Us
              </Link>
              <Link
                className="text-gray-600 hover:text-blue-600"
                href="/contact"
              >
                Contact
              </Link>
              {role === "recruiter" ? (
                <Link
                  className="text-gray-600 hover:text-blue-600"
                  href="/recruiter/dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center items-center gap-4">
              <Link href="/">
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full transition-all duration-100"
                >
                  Logout
                </button>
              </Link>
              <Link
                href={`/profile/${userId}`}
                className="flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-6">
              <Link className="text-gray-600 hover:text-blue-600" href="/jobs">
                Jobs
              </Link>
              <Link className="text-gray-600 hover:text-blue-600" href="/about">
                About Us
              </Link>
              <Link
                className="text-gray-600 hover:text-blue-600"
                href="/contact"
              >
                Contact
              </Link>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Link href="/login">
                <button className="cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full transition-all duration-100">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="cursor-pointer font-semibold bg-orange-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-100">
                  Register
                </button>
              </Link>
              <Link href="/recruiter/register">
                <button className="cursor-pointer font-semibold border border-orange-600 text-orange-600 px-6 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-100">
                  Register for Recruiter
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
