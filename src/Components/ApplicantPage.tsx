"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const response = await axios.get(`/api/recruiter/application/${id}`);
        const applicants: Application[] = response.data.applications;
        setApplications(applicants);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    getApplicants();
  }, [id]);

  // Function to handle status change
  const handleStatusChange = (
    applicationId: string,
    newStatus: "Pending" | "Accepted" | "Rejected"
  ) => {
    setApplications((prevApplications) =>
      prevApplications.map((applicant) =>
        applicant._id === applicationId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  return (
    <>
      <h1 className="text-3xl py-10 font-bold text-blue-600 text-start px-6">
        {applications[0]?.jobId.title} Applicants
      </h1>

      {applications.map((applicant) => (
        <div
          key={applicant._id}
          className="bg-gray-50 flex justify-between px-4 rounded-lg shadow-xl p-4 mb-4 mx-6"
        >
          <div>
            <h2 className="text-xl text-gray-600 mt-1 font-semibold">
              Applied by{" "}
              <span className="font-medium text-black">
                {applicant.userId.firstname} {applicant.userId.lastname}
              </span>
            </h2>
            <h2 className="text-sm text-gray-600 font-semibold">
              Applied on:{" "}
              <span className="font-medium text-black">
                {new Date(applicant.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <select
              value={applicant.status}
              onChange={(e) =>
                handleStatusChange(
                  applicant._id,
                  e.target.value as "Pending" | "Accepted" | "Rejected"
                )
              }
              className={`p-3 rounded-md border w-full max-w-xs outline-none shadow-sm transition-all font-semibold focus:ring-2`}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <Link
              href={applicant.resume}
              target="_blank"
              className="ml-4 px-4 py-2 whitespace-nowrap rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-blue-500"
            >
              View Resume
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApplicantPage;
