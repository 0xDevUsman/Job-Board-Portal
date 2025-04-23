"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import axios from "axios";
import { useSession } from "next-auth/react";

// Define TypeScript interfaces for job data
interface Job {
  _id: string;
  title: string;
  location: string;
  createdAt: string;
  applicantsCount: number;
}

interface JobResponse {
  jobs: Job[];
}

// RecruiterDashboard Component
const RecruiterDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Specify type for jobs state
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log("User ID:", userId);

  const getJob = React.useCallback(async () => {
    try {
      const response = await axios.get<JobResponse>(
        "http://localhost:3000/api/recruiter/jobs",
        {
          params: { userId: userId },
        }
      );
      const jobs = response.data.jobs;
      setJobs(jobs); // Set jobs in the state
      console.log("Jobs:", jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getJob();
    }
  }, [getJob, userId]);

  return (
    <>
      <RecruiterNavbar />
      <div className="px-6 w-full h-full">
        <h1 className="text-blue-600 text-4xl font-bold mt-10 mb-6 text-center">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Posted Jobs Section */}

          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-[600px]">
            <div className="space-y-4 overflow-y-auto scrollbar-thin pr-2">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
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
    </>
  );
};

export default RecruiterDashboard;

// JobCard Component
interface JobCardProps {
  job: Job; // Define the props that JobCard receives
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-xl p-4 mb-4 w-full">
      <h2 className="text-xl font-bold">{job.title}</h2>{" "}
      <h2 className="text-base text-gray-600 mt-1 font-semibold">
        Location :{" "}
        <span className="font-medium text-black">{job.location}</span>{" "}
      </h2>
      <h2 className="text-sm text-gray-600 font-semibold">
        Posted on :{" "}
        <span className="font-medium text-black">
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>{" "}
      </h2>
      <h2 className="text-sm text-gray-600 font-semibold">
        Applicants :{" "}
        <span className="font-medium text-black">{job.applicantsCount}</span>{" "}
      </h2>
      <button className="px-4 py-2 rounded-lg bg-blue-600 cursor-pointer text-white font-semibold mt-4 hover:bg-blue-500 transition-all duration-100">
        View Applications
      </button>
    </div>
  );
};
