"use client";

import React, { useState, useEffect, useCallback } from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface JobListingProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  experience?: string;
  salary: number;
  timeAgo: string;
  onJobDeleted?: (id: string) => void;
}

const RecruiterJob = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState<JobListingProps[]>([]);

  const fetchJobs = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.get("/api/recruiter/jobs", {
        params: { userId },
      });
      setJobListings(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleJobDeleted = (deletedJobId: string) => {
    setJobListings((prev) => prev.filter((job) => job._id !== deletedJobId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading jobs...</div>
      </div>
    );
  }

  return (
    <>
      <RecruiterNavbar />
      <main className="max-w-6xl mx-auto p-6">
        <section className="w-full">
          {jobListings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                You haven’t posted any jobs yet.
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {jobListings.map((job) => (
                <li key={job._id}>
                  <JobListing {...job} onJobDeleted={handleJobDeleted} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

const JobListing: React.FC<JobListingProps> = ({
  _id,
  title,
  company,
  location,
  salary,
  timeAgo,
  onJobDeleted,
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const deleteJob = async (jobId: string) => {
    try {
      const response = await axios.delete("/api/recruiter/jobs", {
        data: { jobId, userId },
      });

      if (response.status === 200) {
        toast.success("Job deleted successfully");
        onJobDeleted?.(jobId);
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  return (
    <div className="rounded-lg p-5 shadow-md bg-white hover:shadow-lg transition duration-200 cursor-pointer flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">
          {company}{" "}
          <span className="text-blue-600 font-medium ml-2">
            Actively hiring
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span>{location}</span> | <span>₹{salary.toLocaleString()}</span> |{" "}
          <span>{timeAgo}</span>
        </p>
      </div>
      <button
        aria-label="Delete job"
        onClick={(e) => {
          e.stopPropagation();
          deleteJob(_id);
        }}
        className="text-red-500 hover:text-red-700 transition"
      >
        <MdDelete className="w-6 h-6" />
      </button>
    </div>
  );
};

export default RecruiterJob;
