"use client";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import RecruiterNavbar from "./RecruiterNavbar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const RecruiterProfile = () => {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  const { data: session } = useSession();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (session?.user) {
      const { name, email, role } = session.user;

      setUser({
        id: session.user.id || "",
        name: name || "",
        email: email || "",
        role: role || "",
      });
    }
  }, [session]);

  interface Job {
    _id: string;
    title: string;
    location: string;
    createdAt: string;
    company: string;
    jobType: string;
    salary: number;
  }

  interface JobResponse {
    jobs: Job[];
  }

  const getJob = React.useCallback(async () => {
    try {
      const response = await axios.get<JobResponse>("/api/recruiter/jobs", {
        params: { userId: user.id },
      });
      const jobs = response.data.jobs;
      setJobs(jobs); // Set jobs in the state
      console.log("Jobs:", jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id && user.id.length === 24) {
      getJob();
    }
  }, [getJob, user.id]);

  if (!user.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please log in to view your dashboard.
        </h1>
      </div>
    );
  }

  console.log(jobs);

  const deleteJob = async (jobId: string) => {
    try {
      const response = await axios.delete(`/api/recruiter/jobs`, {
        data: {
          jobId: jobId,
          userId: user.id,
        },
      });
      if (response.status === 200) {
        console.log("Job deleted successfully");
        toast.success("Job deleted successfully");
        getJob();
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  return (
    <div>
      <RecruiterNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: User Info */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl">
                <FaUser />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {user?.email || "No email available"}
                </p>
                <p className="text-sm text-gray-500">
                  Role: {user?.role || "No role available"}
                </p>
              </div>
            </div>
            <button>
              <span className="text-sm border cursor-pointer hover:opacity-85 bg-blue-500 px-3 py-2 text-white rounded-lg font-bold">
                Edit Profile
              </span>
            </button>
          </div>

          {/* Posted Jobs */}
          <section className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              My Jobs
            </h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500">You haven’t posted any jobs yet.</p>
            ) : (
              <div className="grid gap-4">
                {jobs.map((app, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-500">{app.company}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Job type : {app.jobType}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Location : {app.location} | Salary : {app.salary}
                      </p>
                    </div>
                    <div className="text-red-500 cursor-pointer">
                      <MdDelete
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteJob(app._id);
                        }}
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
