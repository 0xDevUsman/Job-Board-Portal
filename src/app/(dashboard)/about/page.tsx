import React from "react";
import bgImage from "@/assets/hero/about.jpg";
import HowItWorks from "@/Components/HowItWorks";
import WhatWeAreDoing from "@/Components/WhatWeAreDoing";
import RecentNews from "@/Components/RecentNews";

const AboutBanner: React.FC = () => {
  return (
    <>
      <div
        className="relative h-80 w-full overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay to add the blue tint */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        {/* Text Overlay */}
        <div className="relative flex items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold z-10">About Us</h1>
        </div>
      </div>
      <WhatWeAreDoing />
      <HowItWorks />
      <RecentNews />
    </>
  );
};

export default AboutBanner;
