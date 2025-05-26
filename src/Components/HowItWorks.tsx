import React from "react";
import { FaSearch, FaUserCheck, FaBriefcase } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      number: "1.",
      title: "Search a job",
      description:
        "Browse through job listings based on your skills, experience, and preferences. Use filters to narrow down opportunities that match your profile.",
      icon: FaSearch,
    },
    {
      number: "2.",
      title: "Apply for job",
      description:
        "Once you find a suitable job, submit your application by uploading your resume and filling out necessary details.",
      icon: FaUserCheck,
    },
    {
      number: "3.",
      title: "Get your job",
      description:
        "If your application is shortlisted, the employer may contact you for an interview. Successfully passing the interview leads to a job offer.",
      icon: FaBriefcase,
    },
  ];

  return (
    <div
      className="mx-auto px-4 sm:px-6 py-10 sm:py-12 h-auto sm:h-[600px]"
      style={{
        backgroundImage:
          "url('https://themewagon.github.io/jobfinderportal/assets/img/gallery/how-applybg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl text-center text-blue-500 mt-6 sm:mt-10">
          Apply process
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-semibold text-center mt-3 sm:mt-4">
          How it works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-[#26317F] bg-opacity-80 p-4 sm:p-6 rounded-lg text-center"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Icon className="text-white w-8 h-8 sm:w-12 sm:h-12" />
                </div>

                <h3 className="text-xl sm:text-2xl text-white font-semibold">
                  {step.number} {step.title}
                </h3>

                <p className="text-[#A5A0C0] mt-2 text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;