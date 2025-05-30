/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FilterComponent = ({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    profile: string;
    location: string;
    remote: boolean;
    salary: number;
    sortBy: string;
  }) => void;
}) => {
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [salary, setSalary] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  const debouncedProfile = useDebounce(profile, 500);
  const debouncedLocation = useDebounce(location, 500);
  const debouncedRemote = useDebounce(remote, 500);
  const debouncedSalary = useDebounce(salary, 500);
  const debouncedSortBy = useDebounce(sortBy, 500);

  const handleClearAll = () => {
    setProfile("");
    setLocation("");
    setRemote(false);
    setSalary(0);
    setSortBy("relevance");
  };

  useEffect(() => {
    const newFilters = {
      profile: debouncedProfile,
      location: debouncedLocation,
      remote: debouncedRemote,
      salary: debouncedSalary,
      sortBy: debouncedSortBy,
    };
    onFilterChange(newFilters);
  }, [
    debouncedProfile,
    debouncedLocation,
    debouncedRemote,
    debouncedSalary,
    debouncedSortBy,
    onFilterChange,
  ]);

  return (
    <div className="w-full md:max-w-md p-4 md:p-6 bg-white shadow-md rounded-lg">
      <div className="flex gap-3 items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile</label>
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="e.g. Marketing"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Delhi"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Remote (Only)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly salary (in thousands)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>20k</span>
            <span>40k</span>
            <span>60k</span>
            <span>80k</span>
            <span>100k</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>

        <button
          onClick={handleClearAll}
          className="w-full mt-4 py-2 px-4 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
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
  salary: string | number;
  timeAgo: string;
}

export const JobListing = ({
  title,
  company,
  location,
  salary,
}: JobListingProps) => (
  <div className="rounded-lg p-4 mb-4 shadow-md bg-white cursor-pointer hover:shadow-lg transition duration-200 hover:scale-100">
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
);

const Jobs = () => {
  const [jobListings, setJobListing] = useState<JobListingProps[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListingProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastFilters, setLastFilters] = useState<{
    profile: string;
    location: string;
    remote: boolean;
    salary: number;
    sortBy: string;
  } | null>(null);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const { data: session } = useSession();
  const role = session?.user?.role;

  const getJob = async () => {
    try {
      const res = await axios.get("/api/job");
      setJobListing(res.data.jobs);
      setFilteredJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleFilterChange = useCallback(
    (filters: {
      profile: string;
      location: string;
      remote: boolean;
      salary: number;
      sortBy: string;
    }) => {
      if (
        lastFilters &&
        lastFilters.profile === filters.profile &&
        lastFilters.location === filters.location &&
        lastFilters.remote === filters.remote &&
        lastFilters.salary === filters.salary &&
        lastFilters.sortBy === filters.sortBy
      ) {
        return;
      }

      setLastFilters(filters);

      let filtered = [...jobListings];

      if (filters.profile) {
        filtered = filtered.filter((job) =>
          job.title.toLowerCase().includes(filters.profile.toLowerCase())
        );
      }

      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.remote) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes("remote")
        );
      }

      if (filters.salary > 0) {
        filtered = filtered.filter((job) => {
          const jobSalary =
            typeof job.salary === "string"
              ? Number(String(job.salary).replace(/[^\d]/g, ""))
              : typeof job.salary === "number"
              ? job.salary
              : 0;
          return jobSalary >= filters.salary * 1000;
        });
      }

      if (filters.sortBy === "salary") {
        filtered.sort((a, b) => {
          const salaryA =
            typeof a.salary === "string"
              ? Number(String(a.salary).replace(/[^\d]/g, ""))
              : a.salary;
          const salaryB =
            typeof b.salary === "string"
              ? Number(String(b.salary).replace(/[^\d]/g, ""))
              : b.salary;
          return salaryB - salaryA;
        });
      } else if (filters.sortBy === "date") {
        filtered.sort((a, b) => {
          return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
        });
      }

      setFilteredJobs(filtered);
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    },
    [jobListings, lastFilters, currentPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClickJob = async (_id: string) => {
    const res = await axios.get(`/api/job/${_id}`);
    const job = res.data.job;
    if (role === "recruiter") {
      window.location.href = `/recruiter/jobs/${_id}`;
    } else {
      window.location.href = `/jobs/${_id}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="w-full">
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-2 w-full">
          {currentJobs.map((job) => (
            <div key={job._id} className="mb-4" onClick={() => onClickJob(job._id)}>
              <JobListing {...job} />
            </div>
          ))}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage <= 1
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-md ${
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
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
