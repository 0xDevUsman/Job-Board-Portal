"use client";

import React, { useState, useEffect, useCallback } from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// Interfaces
interface JobListing {
  _id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: number;
  timeAgo: string;
}

const RecruiterJob = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loading, setLoading] = useState(true);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);

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
    const updatedJobs = jobListings.filter((job) => job._id !== deletedJobId);
    setJobListings(updatedJobs);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading jobs...</div>
      </div>
    );
  }

  return (
    <>
      <RecruiterNavbar />
      <main className="max-w-6xl mx-auto p-6">
        <section className="w-full">
          {jobListings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven’t posted any jobs yet.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {jobListings.map((job) => (
                <li key={job._id} onClick={() => console.log("Job clicked")}>
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

const JobListing = ({
  _id,
  title,
  company,
  location,
  salary,
  timeAgo,
  onJobDeleted,
}: JobListing & { onJobDeleted?: (id: string) => void }) => {
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
    <div className="rounded-lg p-4 mb-4 shadow-md bg-white hover:shadow-lg transition duration-200 cursor-pointer">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">
            {company}
            <span className="text-blue-600 ml-2">Actively hiring</span>
          </p>
          <div className="text-sm text-gray-500">
            <span>{location}</span> | <span>₹ {salary.toLocaleString()}</span> |{" "}
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className="text-red-500 cursor-pointer">
          <MdDelete
            onClick={(e) => {
              e.stopPropagation();
              deleteJob(_id);
            }}
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterJob;
