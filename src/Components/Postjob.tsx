"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Postjob = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [jobType, setJobType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show error if user not logged in once session loads
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to post a job.");
      router.push("/login");
    }
  }, [status, router]);

  const resetForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
    setRequirements("");
    setSalary("");
    setJobType("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to post a job.");
      return;
    }

    setIsSubmitting(true);

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
        resetForm();
        router.push("/recruiter/dashboard");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl text-blue-500 font-semibold mb-6">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 text-gray-700 font-bold">
            Job Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Frontend Developer"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block mb-1 text-gray-700 font-bold">
            Company Name
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your Company"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block mb-1 text-gray-700 font-bold">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City Name or Remote"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="jobType" className="block mb-1 text-gray-700 font-bold">
            Employment Type
          </label>
          <select
            id="jobType"
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
          <label htmlFor="salary" className="block mb-1 text-gray-700 font-bold">
            Salary
          </label>
          <input
            id="salary"
            type="number"
            value={salary}
            onChange={(e) => {
              const value = e.target.value;
              setSalary(value === "" ? "" : Number(value));
            }}
            placeholder="70000"
            className="w-full outline-gray-600 rounded-lg px-4 py-2 border border-gray-400"
            required
            min={0}
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-gray-700 font-bold">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job responsibilities and requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-28 border-gray-400 resize-y"
            required
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block mb-1 text-gray-700 font-bold">
            Requirements
          </label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="List the job requirements..."
            className="w-full border outline-gray-600 rounded-lg px-4 py-2 h-24 border-gray-400 resize-y"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
          <Link
            href="/recruiter/dashboard"
            className="border-blue-500 text-blue-500 font-bold border px-4 py-2 rounded-lg text-center hover:bg-blue-500 hover:text-white transition duration-200"
          >
            Back to Dashboard
          </Link>

          <div className="flex space-x-3 justify-end">
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
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
