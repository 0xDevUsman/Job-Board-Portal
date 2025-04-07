import axios from "axios";
import React from "react";

interface JobCardProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  timePosted: string;
}

const JobCard: React.FC<JobCardProps> = ({
  _id,
  title,
  company,
  location,
  salary,
  jobType,
  timePosted,
}) => {
  const onClickJob = async (_id: string) => {
    const res = await axios.get(`/api/job/${_id}`);
    const job = res.data.job;
    console.log(job);
    // Navigate to job detail page
    window.location.href = `/jobs/${_id}`;
  };
  return (
    <div
      onClick={() => onClickJob(_id)} // Replace "jobId" with the actual job ID
      className="flex hover:scale-105 transition duration-200 cursor-pointer items-center p-6 bg-white rounded-lg shadow-sm w-full max-w-5xl mt-6"
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm space-x-2">
          <span>{company}</span>
          <span className="text-gray-400">•</span>
          <span>{location}</span>
        </div>
      </div>

      <div className="text-gray-600 text-sm mx-4">{salary}</div>

      <div className="ml-4">
        <button className="flex gap-1 items-center px-3 py-1 bg-indigo-100 text-slate-700 rounded-full text-sm font-medium">
          {jobType}
        </button>
      </div>

      <div className="text-gray-500 text-sm ml-4">{timePosted}</div>
    </div>
  );
};

export default JobCard;
