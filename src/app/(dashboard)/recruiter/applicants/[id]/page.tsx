import ApplicantPage from "@/Components/ApplicantPage";
import RecruiterNavbar from "@/Components/RecruiterNavbar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full">
        <RecruiterNavbar />

        <div className="flex flex-col gap-4 px-6">
          <ApplicantPage />
        </div>
      </div>
    </>
  );
};

export default page;
