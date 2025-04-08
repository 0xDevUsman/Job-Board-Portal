"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const FilterComponent = () => {
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [salary, setSalary] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  const handleClearAll = () => {
    setProfile("");
    setLocation("");
    setRemote(false);
    setSalary(0);
    setSortBy("relevance");
  };

  return (
    <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
      <div className="flex gap-3 items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile
          </label>
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="e.g. Marketing"
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Delhi"
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Options
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
              className="h-4 w-4 p-2 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Remote (Only)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Annual salary (in lakhs)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
            <span>10</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>

        <button
          onClick={handleClearAll}
          className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

interface JobListingProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  timeAgo: string;
}

const onClickJob = async (_id: string) => {
  const res = await axios.get(`/api/job/${_id}`);
  const job = res.data.job;
  console.log(job);
  // Navigate to job detail page
  window.location.href = `/jobs/${_id}`;
};
const JobListing = ({
  _id,
  title,
  company,
  location,
  salary,
}: JobListingProps) => (
  <div
    onClick={() => onClickJob(_id)}
    className="rounded-lg p-4 mb-4 shadow-md bg-white cursor-pointer hover:shadow-lg transition duration-200 hover:scale-100"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">
          {company} <span className="text-blue-600 ml-2">Actively hiring</span>
        </p>
        <div className="text-sm text-gray-500">
          <span>{location}</span> | <span>₹ {salary}</span>
        </div>
      </div>
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </div>
);

const Jobs = () => {
  const [jobListings, setJobListing] = useState<JobListingProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  const getJob = async () => {
    const res = await axios.get("/api/job");
    const jobs = res.data.jobs;
    setJobListing(jobs);
  };

  useEffect(() => {
    getJob();
  }, []);
  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="w-full flex justify-center items-start mt-10">
          <div className="w-1/3 p-4">
            <FilterComponent />
          </div>
          <div className="w-2/3 p-4">
            {currentJobs.map((job, index) => (
              <JobListing
                _id={job._id}
                key={index}
                title={job.title}
                company={job.company}
                location={job.location}
                experience={job.experience}
                salary={job.salary}
                timeAgo={job.timeAgo}
              />
            ))}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage <= 1
                    ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white cursor-pointer"
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white cursor-pointer"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
