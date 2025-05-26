import Image from "next/image";
import React from "react";
import supportImage from "@/assets/hero/support-img.jpg";

const WhatWeAreDoing = () => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2">
          <h3 className="text-blue-500 text-base sm:text-lg font-medium uppercase tracking-wide mb-2">
            What we are doing
          </h3>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            24K Talented people are getting Jobs
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
            Mollit anim laborum dolor in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim laborum
            sint occaecat cupidatat non proident.
          </p>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            Mollit anim laborum.Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident.
          </p>

          <button className="bg-blue-500 text-white px-5 sm:px-6 py-2 sm:py-3 font-medium hover:bg-blue-600 cursor-pointer rounded-md transition text-sm sm:text-base">
            Post A Job
          </button>
        </div>

        {/* Right Side: Image and Badge */}
        <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0">
          <div className="w-full max-w-md">
            <Image
              src={supportImage}
              alt="Talented person with tablet"
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={600}
            />
          </div>

          <div className="absolute bottom-4 left-4 bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md">
            <p className="text-lg sm:text-xl">Since 1994</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeAreDoing;