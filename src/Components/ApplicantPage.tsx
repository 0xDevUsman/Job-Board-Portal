"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Job {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface Application {
  _id: string;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
  userId: User;
  jobId: Job;
}

const ApplicantPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const response = await axios.get(`/api/recruiter/application/${id}`);
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to load applicants");
      }
    };
    getApplicants();
  }, [id]);

  const updateStatus = async (
    applicationId: string,
    newStatus: "Pending" | "Accepted" | "Rejected"
  ) => {
    setLoading((prev) => ({ ...prev, [applicationId]: true }));

    try {
      const response = await axios.patch(
        `/api/recruiter/application/${applicationId}`,
        { status: newStatus }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? response.data.application : app
        )
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading((prev) => ({ ...prev, [applicationId]: false }));
    }
  };

  const handleStatusChange = (
    applicationId: string,
    newStatus: "Pending" | "Accepted" | "Rejected"
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    updateStatus(applicationId, newStatus);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8 text-center sm:text-left">
        {applications[0]?.jobId.title} Applicants
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">No applicants found</p>
      ) : (
        <div className="space-y-4">
          {applications.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Applicant Info */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {applicant.userId.firstname} {applicant.userId.lastname}
                  </h2>
                  <p className="text-gray-600">
                    Applied on:{" "}
                    {new Date(applicant.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600">{applicant.userId.email}</p>
                </div>

                {/* Status + Resume */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <select
                    value={applicant.status}
                    onChange={(e) =>
                      handleStatusChange(
                        applicant._id,
                        e.target.value as "Pending" | "Accepted" | "Rejected"
                      )
                    }
                    disabled={loading[applicant._id]}
                    className={`px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full sm:w-auto ${
                      applicant.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : applicant.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <Link
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantPage;
