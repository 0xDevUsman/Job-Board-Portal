"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  jobType: string;
  timePosted: string;
}

const RecentJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/job/");
        const fetchedJobs = response.data.jobs;

        // Limit to 4 jobs
        const limitedJobs = fetchedJobs.slice(0, 4);
        setJobs(limitedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10 mt-5 max-w-screen-xl">
      <h1 className="text-base font-bold text-center text-blue-500 mt-10">
        RECENT JOB
      </h1>
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-slate-700 font-semibold text-center mt-4">
        Featured Jobs
      </h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Loading jobs...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No jobs available.
          </p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={`$${job.salary}`}
              jobType={job.jobType}
              timePosted={job.timePosted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
