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
    try {
      const res = await axios.get(`/api/job/${_id}`);
      const job = res.data.job;
      console.log(job);
      // Navigate to job detail page
      window.location.href = `/jobs/${_id}`;
    } catch (error) {
      console.error("Failed to fetch job details", error);
    }
  };

  return (
    <div
      onClick={() => onClickJob(_id)}
      className="flex flex-col sm:flex-row hover:scale-105 transition duration-200 cursor-pointer items-start sm:items-center p-6 bg-white rounded-lg shadow-sm w-full max-w-5xl mt-6"
    >
      <div className="flex-1 w-full sm:w-auto">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex flex-wrap items-center text-gray-600 text-sm space-x-1 sm:space-x-2 mt-1">
          <span>{company}</span>
          <span className="text-gray-400">•</span>
          <span>{location}</span>
        </div>
      </div>

      <div className="text-gray-600 text-sm mx-0 sm:mx-4 mt-2 sm:mt-0">{salary}</div>

      <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
        <button className="flex gap-1 items-center px-3 py-1 bg-blue-100 text-slate-700 rounded-full text-sm font-medium whitespace-nowrap">
          {jobType}
        </button>
      </div>

      <div className="text-gray-500 text-sm ml-0 sm:ml-4 mt-2 sm:mt-0 whitespace-nowrap">{timePosted}</div>
    </div>
  );
};

export default JobCard;
