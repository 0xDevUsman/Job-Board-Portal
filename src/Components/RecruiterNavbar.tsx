"use client";

import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import { motion } from "framer-motion";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecruiterNavbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = (path: string) => {
    setIsMobileMenuOpen(false); // Close menu on navigation
    router.push(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: -100 }}
        transition={{ duration: 0.5 }}
        exit={{ y: -100 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-2 flex items-center justify-between h-16"
      >
        {/* Logo & Title */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Image width={40} height={40} src={logo} alt="Logo" />
          <h1 className="text-xl sm:text-2xl text-blue-600 font-bold">
            CAREER FLOW
          </h1>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => navigate("/")}
            className="border border-blue-600 hover:bg-blue-600 text-blue-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Go back to Home
          </button>
          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="border border-blue-600 hover:bg-blue-600 text-blue-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Post a Job
          </button>
          <button
            onClick={() => navigate("/recruiter/profile")}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaUserAlt className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={handleToggleMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-blue-600" />
            ) : (
              <FaBars className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 pb-4 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="block w-full text-left border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Go back to Home
          </button>
          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="block w-full text-left border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="block w-full text-left bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Post a Job
          </button>
          <button
            onClick={() => navigate("/recruiter/profile")}
            className="block w-full text-left text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 transition"
          >
            Profile <FaUserAlt className="inline-block ml-2" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default RecruiterNavbar;
