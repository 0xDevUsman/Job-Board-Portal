"use client";
import Image from "next/image";
import React from "react";
import hero_Image from "@/assets/hero/h1_hero.jpg";
import Link from "next/link";
import CategoriesCard from "@/Components/CategoriesCards";
import { FaUserTie } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { MdConstruction } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { TbBooks } from "react-icons/tb";
import HowItWorks from "@/Components/HowItWorks";
import testmonial from "@/assets/testmonial/testimonial-founder.png";
import WhatWeAreDoing from "@/Components/WhatWeAreDoing";
import RecentNews from "@/Components/RecentNews";
import RecentJobs from "@/Components/RecentJobs";

const page = () => {
  const categoriesCard = [
    { name: "Design & Creative", number: 192, icon: FaUserTie },
    { name: "Design & Development", number: 265, icon: FaComputer },
    { name: "Sales & Marketing", number: 189, icon: FaRegChartBar },
    { name: "Mobile Application", number: 234, icon: CiMobile3 },
    { name: "Construction", number: 784, icon: MdConstruction },
    { name: "Information Technology", number: 898, icon: GrTechnology },
    { name: "Real Estate", number: 23, icon: MdOutlineRealEstateAgent },
    { name: "Content Writer", number: 121, icon: TbBooks },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh] md:h-[90vh]">
        <Image
          src={hero_Image}
          alt="Hero"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-700 mb-6">
            Find the most exciting <br /> startup jobs.
          </h1>
          <Link href="/jobs">
            <span className="px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600">
              Explore Jobs
            </span>
          </Link>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-sm font-bold text-center text-blue-500">
          FEATURED TOURS PACKAGES
        </h2>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-slate-700 font-semibold text-center mt-4">
          Browse Top Categories
        </h1>

        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categoriesCard.map((item, index) => (
              <CategoriesCard
                key={index}
                name={item.name}
                number={item.number}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/jobs">
            <span className="px-6 py-3 text-base border border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 transition-all rounded-full">
              Explore Jobs
            </span>
          </Link>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="flex justify-center w-full mt-16">
        <div className="h-0.5 w-[90%] bg-gray-700" />
      </div>

      {/* COMPONENT SECTIONS */}
      <RecentJobs />
      <HowItWorks />

      {/* TESTIMONIAL */}
      <div className="flex justify-center items-center w-full mt-16 mb-20 px-4">
        <div className="flex flex-col items-center w-full max-w-2xl text-center">
          <Image
            src={testmonial}
            alt="Testimonial"
            className="w-32 h-32 md:w-40 md:h-40"
          />
          <h1 className="text-xl md:text-2xl mt-6">Margaret Lawson</h1>
          <h2 className="text-gray-500 mt-2">Creative Director</h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            “I am at an age where I just want to be fit and healthy — our bodies
            are our responsibility! So start caring for your body and it will
            care for you. Eat clean and workout hard.”
          </p>
        </div>
      </div>

      <WhatWeAreDoing />
      <RecentNews />
    </>
  );
};

export default page;
