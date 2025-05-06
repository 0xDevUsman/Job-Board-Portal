import ApplicantPage from "@/Components/ApplicantPage";
import RecruiterNavbar from "@/Components/RecruiterNavbar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full">
        <RecruiterNavbar />

        <h1 className="text-3xl py-10 font-bold text-blue-600 text-start px-6">
          Updated Frontend Developer
        </h1>
        <div className="flex flex-col gap-4 px-6">
          <ApplicantPage />
          <ApplicantPage />
        </div>
      </div>
    </>
  );
};

export default page;
