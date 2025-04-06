import React from "react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  timePosted: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  jobType,
  timePosted,
}) => {
  return (
    <div className="flex hover:scale-105 transition duration-200 cursor-pointer items-center p-6 bg-white rounded-lg shadow-sm w-full max-w-5xl mt-6">
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
