import Postjob from "@/Components/Postjob";
import RecruiterNavbar from "@/Components/RecruiterNavbar";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-100 h-full">
      <RecruiterNavbar />
      <Postjob />
    </div>
  );
};

export default page;
