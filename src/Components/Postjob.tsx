"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Postjob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [jobType, setJobType] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  if (!session) {
    alert("You must be logged in to post a job.");
    return;
  }
  console.log(userId);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/recruiter/jobs", {
        title,
        company,
        location,
        description,
        requirements,
        salary,
        jobType,
        postedBy: userId,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Job posted successfully!");
        // Clear the form
        setTitle("");
        setCompany("");
        setLocation("");
        setDescription("");
        setRequirements("");
        setSalary("");
        setJobType("");
        router.push("/recruiter/dashboard");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl text-blue-500 font-semibold mb-4">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Frontend Developer"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your Company"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City Name or Remote"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Employment Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-300 bg-gray-200"
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => {
              const value = e.target.value;
              setSalary(value === "" ? "" : Number(value));
            }}
            placeholder="70000"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Job Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job responsibilities and requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-28 border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-bold">
            Requirements
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="List the job requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-24 border-gray-400"
            required
          />
        </div>

        <div className="flex justify-between space-x-3 mt-4">
          <Link
            href="/recruiter/dashboard"
            className="border-blue-500 text-blue-500 font-bold border px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
          >
            Back to Dashboard
          </Link>

          <div className="flex space-x-3">
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => {
                setTitle("");
                setCompany("");
                setLocation("");
                setDescription("");
                setRequirements("");
                setSalary("");
                setJobType("");
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Post Job
            </button>
          </div>
        </div>
      </form>

      <p className="text-xs text-gray-400 text-right mt-6">
        © 2025 CareerFlow. All rights reserved.
      </p>
    </div>
  );
};

export default Postjob;
