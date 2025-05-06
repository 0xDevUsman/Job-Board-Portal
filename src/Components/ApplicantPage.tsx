import React from "react";

const ApplicantPage = () => {
  return (
    <>
      <div className="bg-gray-50 flex justify-between px-4 rounded-lg shadow-xl p-4 mb-4 w-full">
        <div>
          <h2 className="text-xl font-bold">{"usman ali"}</h2>{" "}
          <h2 className="text-base text-gray-600 mt-1 font-semibold">
            Applied by{" "}
            <span className="font-medium text-black">
              {"usman ali"} {"usman ali"}
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
        <div className="flex items-center">
          <button className="px-4 py-2 rounded-lg bg-blue-600 cursor-pointer text-white font-semibold mt-4 hover:bg-blue-500 transition-all duration-100 ml-4">
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default ApplicantPage;
