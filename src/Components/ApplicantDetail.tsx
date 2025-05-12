"use client";
import { useParams } from "next/navigation";
import RecruiterNavbar from "./RecruiterNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: number;
  jobType: string;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Application {
  _id: string;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
  job: Job;
  user: User;
}

const ApplicantDetail = () => {
  const params = useParams();
  const { id } = params;
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `/api/recruiter/applicationDetails/${id}`
        );
        setApplication(response.data.application);
      } catch (error) {
        toast.error("Failed to load application details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleStatusChange = async (
    newStatus: "Pending" | "Accepted" | "Rejected"
  ) => {
    if (!application) return;

    setStatusLoading(true);
    try {
      const response = await axios.patch(
        `/api/recruiter/applicationDetails/${application._id}`,
        {
          status: newStatus,
        }
      );
      if (response.status !== 200) {
        toast.error("Failed to update status");
        return;
      }

      setApplication({ ...application, status: newStatus });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <RecruiterNavbar />
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse bg-white rounded-lg shadow p-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50">
        <RecruiterNavbar />
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">Application not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />

      <div className="container mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {application.user.firstname} {application.user.lastname}
            </h1>
            <p className="text-gray-600">{application.user.email}</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <select
              value={application.status}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value as "Pending" | "Accepted" | "Rejected"
                )
              }
              disabled={statusLoading}
              className={`px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                application.status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : application.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Personal Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Applicant Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-800">
                  {application.user.firstname} {application.user.lastname}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{application.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied Position</p>
                <p className="text-gray-800">{application.job.title}</p>
                <p className="text-gray-600 text-sm">
                  {application.job.company}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Applied on:{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 font-bold py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Resume
              </Link>
            </div>
          </div>

          {/* Right Column - Job Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">{application.job.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="text-gray-800">{application.job.jobType}</p>
              </div>
              {application.job.salary && (
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="text-gray-800">
                    ${application.job.salary.toLocaleString()}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-800">{application.job.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
