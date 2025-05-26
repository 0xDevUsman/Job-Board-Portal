import ApplicantPage from "@/Components/ApplicantPage";
import RecruiterNavbar from "@/Components/RecruiterNavbar";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <RecruiterNavbar />

      <main className="flex flex-col gap-4 px-4 sm:px-6 py-6">
        <ApplicantPage />
      </main>
    </div>
  );
};

export default Page;
