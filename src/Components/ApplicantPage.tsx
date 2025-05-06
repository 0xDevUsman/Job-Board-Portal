"use client";
import React from "react";
import { useState } from "react";

const ApplicantPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("pending");

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
  return (
    <>
      <div className="bg-gray-50 flex justify-between px-4 rounded-lg shadow-xl p-4 mb-4 w-full">
        <div>
          <h2 className="text-xl text-gray-600 mt-1 font-semibold">
            Applied by{" "}
            <span className="font-medium text-black">
              {"Usman"} {"Ali"}
            </span>{" "}
          </h2>
          <h2 className="text-sm text-gray-600 font-semibold">
            Applied on :{" "}
            <span className="font-medium text-black">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>{" "}
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
          <button className="ml-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-200 hover:bg-blue-500">
            Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default ApplicantPage;
