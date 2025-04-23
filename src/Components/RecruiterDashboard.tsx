"use client";

import Link from "next/link";
import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";

const JobCard: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-xl p-4 mb-4 w-full">
      <h2 className="text-xl font-bold">Full Stack developer</h2>
      <h2 className="text-base text-gray-600 mt-1 font-semibold">
        Location :{" "}
        <span className="font-medium text-black">San frasisco, CA</span>
      </h2>
      <h2 className="text-sm text-gray-600 font-semibold">
        Posted on :
        <span className="font-medium text-black">October 1 , 2025</span>
      </h2>
      <h2 className="text-sm text-gray-600 font-semibold">
        Applicatants : <span className="font-medium text-black">25</span>
      </h2>

      <button className="px-4 py-2 rounded-lg bg-blue-600 cursor-pointer text-white font-semibold mt-4 hover:bg-blue-500 transition-all duration-100">
        View Applications
      </button>
    </div>
  );
};

const RecruiterDashboard = () => {
  return (
    <>
      <RecruiterNavbar />
      <div>
        <div className="px-6 w-full h-full">
          <h1 className="text-blue-600 text-4xl font-bold mt-10 mb-6 text-center">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Posted Jobs Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-[600px]">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Posted Jobs
              </h2>

              <div className="space-y-4 overflow-y-auto scrollbar-thin pr-2">
                <JobCard />
                <JobCard />
              </div>

              <Link
                href="/jobs"
                className="block w-full mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-150"
              >
                View all jobs
              </Link>
            </div>

            {/* Recent Applications Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px]">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Recent Applications
              </h2>
              {/* Add your application list or placeholder here */}
              <p className="text-gray-500">No applications yet.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;
