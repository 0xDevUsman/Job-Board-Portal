"use client";
import React, { useEffect } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
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

  const { data: session, update } = useSession();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (session?.user) {
      const { name, email, role } = session.user;

      setUser({
        id: session.user.id || "",
        name: name || "",
        email: email || "",
        role: role || "",
      });

      setEditedUser({
        name: name || "",
        email: email || "",
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
      setJobs(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id && user.id.length === 24) {
      getJob();
    }
  }, [getJob, user.id]);

  const deleteJob = async (jobId: string) => {
    try {
      const response = await axios.delete(`/api/recruiter/jobs`, {
        data: {
          jobId: jobId,
          userId: user.id,
        },
      });
      if (response.status === 200) {
        toast.success("Job deleted successfully");
        getJob();
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditProfile = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const nameParts = editedUser.name.trim().split(/\s+/);
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      const response = await axios.patch(`/api/profile/${user.id}`, {
        userId: user.id,
        firstname,
        lastname,
        email: editedUser.email,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setUser((prev) => ({
          ...prev,
          name: response.data.user.name,
          email: response.data.user.email,
        }));

        await update({
          ...session,
          user: {
            ...session?.user,
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
          },
        });

        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="relative">
      <RecruiterNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
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
            <button onClick={handleEditProfile}>
              <span className="text-sm border cursor-pointer hover:opacity-85 bg-blue-500 px-4 py-2 text-white rounded-lg font-bold">
                Edit Profile
              </span>
            </button>
          </div>

          {/* Jobs Section */}
          <section className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              My Jobs
            </h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500">
                You haven&apos;t posted any jobs yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map((app, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
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

      {/* Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Profile
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterProfile;
