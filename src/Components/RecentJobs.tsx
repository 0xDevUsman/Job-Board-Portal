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
        const response = await axios.get("http://localhost:3000/api/job/");
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
    <div className="mx-auto px-4 py-10 mt-5">
      <h1 className="text-base font-bold text-center text-blue-500 mt-10">
        RECENT JOB
      </h1>
      <h1 className="text-5xl text-slate-700 font-semibold text-center mt-4">
        Featured Jobs
      </h1>
      <div className="p-4 flex flex-col justify-center items-center w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
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
