import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="w-full h-16 bg-white flex items-center justify-around shadow-lg px-16 py-2">
        <Link href="/" className="flex items-center gap-4">
          <Image width={40} height={40} src={logo} alt="Logo" />
          <h1 className="text-2xl text-blue-600 font-bold">CAREER FLOW</h1>
        </Link>

        <div className="flex justify-center items-center gap-10">
          <div className="flex justify-center items-center gap-6">
            <Link className="text-gray-600" href={"/jobs"}>
              Jobs
            </Link>
            <Link className="text-gray-600" href={"/jobs"}>
              About Us
            </Link>
            <Link className="text-gray-600" href={"/jobs"}>
              Contact
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link href={"/login"}>
              <button className=" cursor-pointer font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full transition-all duration-100">
                Login
              </button>
            </Link>
            <Link href={"/register"}>
              <button className=" cursor-pointer font-semibold bg-orange-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-100">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
