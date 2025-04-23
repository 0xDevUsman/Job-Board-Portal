import Link from "next/link";
import React from "react";

const Postjob = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl text-blue-500 font-semibold mb-4">
        Post a New Job
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Frontend Developer"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Your Company"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">Location</label>
          <input
            type="text"
            placeholder="City Name or Remote"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Employment Type
          </label>
          <select className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-300 bg-gray-200">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Salary Range
          </label>
          <input
            type="text"
            placeholder="$70,000 - $90,000"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Job Description
          </label>
          <textarea
            placeholder="Describe the job responsibilities and requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-28 border-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Requirements
          </label>
          <textarea
            placeholder="List the job requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-24 border-gray-400"
          />
        </div>

        <div className="flex justify-between space-x-3 mt-4">
          <div>
            <Link
              href={"/recruiter/dashboard"}
              className="border-blue-500 text-blue-500 font-bold  border  px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer transition duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
          <div className="flex justify-between space-x-3 mt-4">
            <button
              type="reset"
              className="bg-red-500 transition duration-200 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Post Job
            </button>
          </div>
        </div>
      </form>

      <p className="text-xs text-gray-400 text-right mt-6">
        © 2025 Company Name. All rights reserved.
      </p>
    </div>
  );
};
export default Postjob;
