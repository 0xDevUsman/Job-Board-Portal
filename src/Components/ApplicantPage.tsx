"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define types for Applicant and Job
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
  status: string;
  createdAt: string;
  userId: User;
  jobId: Job;
}

const ApplicantPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const [applications, setApplications] = useState<Application[]>([]); // State to store all applicants
  const params = useParams();
  const { id } = params;

  const statuses = [
    {
      label: "Pending",
      value: "pending",
      classes: {
        text: "text-yellow-500",
        border: "border-yellow-500",
        bg: "bg-yellow-500",
      },
    },
    {
      label: "Accepted",
      value: "accepted",
      classes: {
        text: "text-green-500",
        border: "border-green-500",
        bg: "bg-green-500",
      },
    },
    {
      label: "Rejected",
      value: "rejected",
      classes: {
        text: "text-red-500",
        border: "border-red-500",
        bg: "bg-red-500",
      },
    },
  ];

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const response = await axios.get(`/api/recruiter/application/${id}`);
        const applicants: Application[] = response.data.applications;
        setApplications(applicants); // Store all applicants
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    getApplicants();
  }, [id]);

  if (applications.length === 0) {
    return <div>Loading...</div>; // Display a loading message while waiting for the applicant data
  }

  return (
    <>
      <h1 className="text-3xl py-10 font-bold text-blue-600 text-start px-6">
        {applications[0].jobId.title} Applicants
      </h1>

      {/* Iterate over all applicants */}
      {applications.map((applicant) => (
        <div
          key={applicant._id}
          className="bg-gray-50 flex justify-between px-4 rounded-lg shadow-xl p-4 mb-4 w-full"
        >
          <div>
            <h2 className="text-xl text-gray-600 mt-1 font-semibold">
              Applied by{" "}
              <span className="font-medium text-black">
                {applicant.userId.firstname} {applicant.userId.lastname}
              </span>
            </h2>
            <h2 className="text-sm text-gray-600 font-semibold">
              Applied on :{" "}
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
            {statuses.map((status) => {
              const isSelected = selectedStatus === status.value;
              return (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 border
          ${
            isSelected
              ? `${status.classes.bg} text-white border-transparent`
              : `bg-white ${status.classes.text} ${status.classes.border}`
          } hover:opacity-80`}
                >
                  {status.label}
                </button>
              );
            })}

            {/* Resume Button - Separate */}
            <Link
              href={applicant.resume}
              target="_blank"
              className="ml-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-blue-500"
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
