"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface PostedBy {
  _id: string;
  firstname: string;
  email: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobType: string;
  requirements: string[];
  salary: number;
  createdAt: string;
  postedBy: PostedBy;
}

interface UserSession {
  id?: string;
  role?: "recruiter" | "employee";
}

const SpecificJob: React.FC = () => {
  const params = useParams();
  const { data: session } = useSession();
  const user = session?.user as UserSession | undefined;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const jobId = params.id as string;
  const userId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ job: Job }>(`/api/job/${jobId}`);
        setJob(res.data.job);
      } catch (err) {
        const error = err as AxiosError;
        setError("Failed to fetch job details");
        console.error("Fetch job error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse text-lg text-gray-700">
          Loading job details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Job not found</div>
      </div>
    );
  }

  const isJobPoster = job?.postedBy && userId === job.postedBy._id;

  const isRecruiter = userRole === "recruiter";
  const isEmployee = userRole === "employee";
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const showApplyButton = isEmployee && !isJobPoster;
  const showViewApplicationsButton = isRecruiter && isJobPoster;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="text-lg text-gray-600 mb-1">{job.company}</div>
              <div className="text-gray-500">{job.location}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Posted: {postedDate}</div>
              <div className="text-sm text-gray-500">
                Job Type: {job.jobType}
              </div>
              <div className="text-sm text-gray-500">
                Posted by: {job?.postedBy?.firstname}
              </div>
            </div>
          </div>

          {/* Salary Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-800">
              Salary: ${job?.salary?.toLocaleString()} per year
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Job Description
            </h2>
            <div className="text-gray-700 whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Requirements
            </h2>
            <div className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-2">•</div>
                  <div className="text-gray-700">{requirement}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About Company */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About {job.company}
            </h2>
            <div className="text-gray-700">
              {job.company} is a leading company in their industry, committed to
              innovation and excellence. They provide opportunities for growth
              and skill enhancement.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            {showApplyButton && (
              <Link href={`/apply/${jobId}`} passHref>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                  Apply Now
                </button>
              </Link>
            )}

            {showViewApplicationsButton && (
              <Link href={`/recruiter/applicants/${jobId}`} passHref>
                <button className="w-full cursor-pointer sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                  View Applications
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificJob;
