"use client";

import React from "react";
import logo from "@/assets/logo.svg";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RecruiterNavbar = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <nav>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            transition={{ duration: 0.5 }}
            exit={{ y: -100 }}
            className="w-full h-16 bg-white flex items-center justify-between shadow-md px-16 py-2"
          >
            <Link href="/" className="flex items-center gap-4">
              <Image width={40} height={40} src={logo} alt="Logo" />
              <h1 className="text-2xl text-blue-600 font-bold">CAREER FLOW</h1>
            </Link>
            <div className="flex justify-center items-center gap-6">
              <Link
                className="border border-blue-600 hover:bg-blue-600 text-blue-500 hover:text-white cursor-pointer font-semibold px-6 py-2 rounded-lg transition-all duration-100"
                href={"/"}
              >
                Go back to home
              </Link>
              <Link
                href={"/recruiter/post-job"}
                className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-100"
              >
                Post a new Job
              </Link>
              <button
                className="cursor-pointer"
                onClick={() => router.push("/recruiter/profile")}
              >
                <FaUserAlt className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </nav>
      </div>
    </>
  );
};

export default RecruiterNavbar;
