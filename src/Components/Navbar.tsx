"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const isLoggedIn = status === "authenticated";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full h-16 bg-white flex items-center justify-between px-4 sm:px-8 md:px-16 py-2 shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-4 z-50">
          <Image width={30} height={30} src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-xl md:text-2xl text-blue-600 font-bold">CAREER FLOW</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-6">
                <Link className="text-gray-600 hover:text-blue-600" href="/jobs">
                  Jobs
                </Link>
                <Link className="text-gray-600 hover:text-blue-600" href="/about">
                  About Us
                </Link>
                <Link className="text-gray-600 hover:text-blue-600" href="/contact">
                  Contact
                </Link>
                {role === "recruiter" && (
                  <Link
                    className="text-gray-600 hover:text-blue-600"
                    href="/recruiter/dashboard"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-1 md:px-6 md:py-2 rounded-full transition-all duration-100 text-sm md:text-base"
                >
                  Logout
                </button>
                <Link
                  href={role === "recruiter" ? `/recruiter/profile` : `/profile/${userId}`}
                  className="flex items-center"
                >
                  <FaUserAlt className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-6">
                <Link className="text-gray-600 hover:text-blue-600" href="/jobs">
                  Jobs
                </Link>
                <Link className="text-gray-600 hover:text-blue-600" href="/about">
                  About Us
                </Link>
                <Link className="text-gray-600 hover:text-blue-600" href="/contact">
                  Contact
                </Link>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <Link href="/login">
                  <button className="cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-1 md:px-6 md:py-2 rounded-full transition-all duration-100 text-sm md:text-base">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="cursor-pointer font-semibold bg-orange-600 text-white px-4 py-1 md:px-6 md:py-2 rounded-full hover:opacity-90 transition-all duration-100 text-sm md:text-base">
                    Register
                  </button>
                </Link>
                <Link href="/recruiter/register">
                  <button className="hidden sm:block cursor-pointer font-semibold border border-orange-600 text-orange-600 px-4 py-1 md:px-6 md:py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-100 text-sm md:text-base">
                    For Recruiters
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 flex flex-col items-center space-y-8">
            <div className="flex flex-col items-center gap-6">
              <Link 
                className="text-gray-600 hover:text-blue-600 text-xl" 
                href="/jobs"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                className="text-gray-600 hover:text-blue-600 text-xl" 
                href="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                className="text-gray-600 hover:text-blue-600 text-xl" 
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isLoggedIn && role === "recruiter" && (
                <Link
                  className="text-gray-600 hover:text-blue-600 text-xl"
                  href="/recruiter/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-full transition-all duration-100"
                  >
                    Logout
                  </button>
                  <Link
                    href={role === "recruiter" ? `/recruiter/profile` : `/profile/${userId}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserAlt className="w-6 h-6" />
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-full transition-all duration-100">
                      Login
                    </button>
                  </Link>
                  <Link 
                    href="/register" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full cursor-pointer font-semibold bg-orange-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-100">
                      Register
                    </button>
                  </Link>
                  <Link 
                    href="/recruiter/register" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full cursor-pointer font-semibold border border-orange-600 text-orange-600 px-6 py-3 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-100">
                      For Recruiters
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;