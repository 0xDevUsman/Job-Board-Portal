"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";

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
  postedBy: string | null;
}

const SpecificJob: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ job: Job }>(`/api/job/${id}`);
        setJob(res.data.job);
      } catch (err) {
        const error = err as AxiosError;
        setError("Failed to fetch job details. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!job) {
    return null; // or a "Job not found" message
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white  rounded-lg p-6 max-w-6xl w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold pb-1">{job.title}</h1>
            <p className="text-gray-600 pb-1">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Posted:{" "}
              {new Date(job.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-500">Experience: Not specified</p>
            <p className="text-sm text-gray-500">Applicants: Not specified</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">
            Salary: ${job.salary} per year
          </p>
          <p className="text-gray-600">Start Date: Immediate</p>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">About the job</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Skills required</h2>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {job.requirements.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Learn Skills</h2>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {job.requirements.map((skill, index) => (
              <span key={index}>Learn {skill}</span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Who can apply</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Only those candidates can apply who:</li>
            <li>Are from {job.location}</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Salary</h2>
          <p className="text-gray-700">Annual Salary: ${job.salary} per year</p>
          <p className="text-gray-700">Perks: Not specified</p>
          <p className="text-gray-700">Number of openings: Not specified</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-2">About {job.company}</h2>
          <p className="text-gray-700">
            {job.company} is a leading company in the tech industry, committed
            to innovation and excellence in software development. We provide
            opportunities for growth and skill enhancement in various technical
            domains.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Activity: Hired on multiple occasions • Opportunities posted: Not
            specified • Joining since: Not specified
          </p>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificJob;
