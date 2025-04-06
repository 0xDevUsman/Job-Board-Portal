import React from "react";
import { FaSearch, FaUserCheck, FaBriefcase } from "react-icons/fa"; // Example icons from react-icons

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
        "Once you find a suitable job, submit your application by uploading your resume and filling out necessary details. Some positions may require a cover letter or additional information.",
      icon: FaUserCheck,
    },
    {
      number: "3.",
      title: "Get your job",
      description:
        "If your application is shortlisted, the employer may contact you for an interview. Successfully passing the interview and meeting the job requirements will lead to a job offer.",
      icon: FaBriefcase,
    },
  ];

  return (
    <div
      className="mx-auto px-4 py-10 mt-10 h-[600px]"
      style={{
        backgroundImage:
          "url('https://themewagon.github.io/jobfinderportal/assets/img/gallery/how-applybg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading Section */}
      <h1 className="text-xl text-center text-pink-500 mt-10">Apply process</h1>
      <h1 className="text-5xl text-white font-semibold text-center mt-4">
        How it works
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto my-12 ">
        {steps.map((step, index) => {
          const Icon = step.icon; // Capitalize for JSX rendering
          return (
            <div
              key={index}
              className="bg-[#26317F] bg-opacity-80 p-6 rounded-lg text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <Icon className="text-white w-12 h-12" />
              </div>

              {/* Number and Title */}
              <h3 className="text-2xl text-white font-semibold">
                {step.number} {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#A5A0C0] mt-2">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
