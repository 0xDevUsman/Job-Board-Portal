"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Job {
  _id: string;
  title: string;
  location: string;
  createdAt: string;
  applicantsCount: number;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
}

interface Application {
  _id: string;
  jobId: Job;
  userId: User;
  status: string;
  createdAt: string;
}

interface JobResponse {
  jobs: Job[];
}

const RecruiterDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [application, setApplication] = useState<Application[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const getJob = React.useCallback(async () => {
    try {
      const response = await axios.get<JobResponse>("/api/recruiter/jobs", {
        params: { userId },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [userId]);

  const getApplications = React.useCallback(async () => {
    try {
      const res = await axios.get("/api/recruiter/application", {
        params: { userId },
      });
      setApplication(res.data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplication([]);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && userId.length === 24) {
      getJob();
      getApplications();
    }
  }, [userId, getJob, getApplications]);

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please log in to view your dashboard.
        </h1>
      </div>
    );
  }

  return (
    <>
      <RecruiterNavbar />
      <div className="px-4 sm:px-6 lg:px-10 py-10 w-full min-h-screen bg-gray-50">
        <h1 className="text-blue-600 text-4xl font-bold text-center mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posted Jobs */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-[600px]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Posted Jobs
            </h2>
            <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 space-y-4">
              {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs posted yet.</p>
              ) : (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              )}
            </div>

            <Link
              href="/recruiter/jobs"
              className="mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-150"
            >
              View all jobs
            </Link>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-[600px] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Recent Applications
            </h2>
            <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 space-y-4">
              {application.length > 0 ? (
                application.map((app) => (
                  <ApplicationCard key={app._id} application={app} />
                ))
              ) : (
                <p className="text-gray-500">No applications yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;

// ------------------------
// JobCard Component
// ------------------------
interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 w-full">
      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Location: <span className="text-black">{job.location}</span>
      </p>
      <p className="text-sm text-gray-600">
        Posted on:{" "}
        <span className="text-black">
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>
      <button
        onClick={() => router.push(`/recruiter/applicants/${job._id}`)}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition"
      >
        View Applications
      </button>
    </div>
  );
};

// ------------------------
// ApplicationCard Component
// ------------------------
interface ApplicationProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationProps> = ({ application }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {application.jobId.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Applied by:{" "}
          <span className="text-black font-medium">
            {application.userId.firstname} {application.userId.lastname}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Applied on:{" "}
          <span className="text-black">
            {new Date(application.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
      <button
        onClick={() =>
          router.push(`/recruiter/applicants/details/${application.userId._id}`)
        }
        className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition"
      >
        View Details
      </button>
    </div>
  );
};
