import Image from "next/image";
import React from "react";
import supportImage from "@/assets/hero/support-img.jpg";
const WhatWeAreDoing = () => {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          {/* Subheading */}
          <h3 className="text-blue-500 text-lg font-medium uppercase tracking-wide mb-2">
            What we are doing
          </h3>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            24K Talented people are getting Jobs
          </h1>

          {/* Paragraphs */}
          <p className="text-gray-600 text-base mb-4">
            Mollit anim laborum dolor in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim laborum
            sint occaecat cupidatat non proident. Sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-600 text-base mb-6">
            Mollit anim laborum.Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>

          {/* Button */}
          <button className="bg-blue-500 text-white px-6 py-3 font-medium hover:bg-blue-600 cursor-pointer rounded-md transition">
            Post A Job
          </button>
        </div>

        {/* Right Side: Image and Badge */}
        <div className="md:w-1/2 relative flex justify-center">
          {/* Image Placeholder */}
          <div className="w-full max-w-md">
            <Image
              src={supportImage}
              alt="Talented person with tablet"
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={600}
            />
          </div>

          {/* Since 1994 Badge */}
          <div className="absolute bottom-4 left-4 bg-blue-900 text-white px-6 py-3 rounded-md">
            <p className="text-xl">Since 1994</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeAreDoing;
