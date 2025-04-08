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
    {
      name: "Design & Creative",
      number: 192,
      icon: FaUserTie,
    },
    {
      name: "Design & Development",
      number: 265,
      icon: FaComputer,
    },
    {
      name: "Sales & Marketing",
      number: 189,
      icon: FaRegChartBar,
    },
    {
      name: "Mobile Application",
      number: 234,
      icon: CiMobile3,
    },
    {
      name: "Construction",
      number: 784,
      icon: MdConstruction,
    },
    {
      name: "Information Technology",
      number: 898,
      icon: GrTechnology,
    },
    {
      name: "Real Estate",
      number: 23,
      icon: MdOutlineRealEstateAgent,
    },
    {
      name: "Content Writer",
      number: 121,
      icon: TbBooks,
    },
  ];
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-full bg-gray-100">
        <Image src={hero_Image} alt="" />
        <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-7xl font-bold text-slate-700 mb-10">
            Find the most exciting <br /> startup jobs.{" "}
          </h1>
          <Link href={"/jobs"}>
            <span className="px-6 py-4 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600">
              Explore Jobs
            </span>
          </Link>
        </div>
      </div>
      <div className="mx-auto px-4 py-10 mt-5">
        <h1 className="text-base font-bold text-center text-blue-500 mt-10">
          FEATURED TOURS PACKAGES
        </h1>
        <h1 className="text-5xl text-slate-700 font-semibold text-center mt-4">
          Browse Top Categories
        </h1>
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-between flex-wrap w-[80%] gap-10 mt-10">
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
        <div className="flex justify-center items-center w-full mt-16">
          <Link href={"/jobs"}>
            <span className="px-6 py-4 text-lg border border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-600 transform-border transition-all duration-100 rounded-full ">
              Explore Jobs
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-16">
        <div className="h-0.5 w-[90%] bg-gray-700 flex justify-center items-center"></div>
      </div>
      <div>
        <RecentJobs />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div className="flex justify-center items-center w-full mt-16 mb-20">
        <div className="flex flex-col w-[40%] items-center justify-center">
          <Image src={testmonial} alt="" />
          <h1 className="text-2xl mt-6">Margaret Lawson</h1>
          <h2 className="text-gray-500 mt-3">Creative Director</h2>

          <p className="text-center text-xl text-gray-500 mt-4">
            “I am at an age where I just want to be fit and healthy our bodies
            are <br /> our responsibility! So start caring for your body and it
            will care for you. <br /> Eat clean it will care for you and workout
            hard.”
          </p>
        </div>
      </div>
      <div>
        <WhatWeAreDoing />
      </div>
      <div>
        <RecentNews />
      </div>
    </>
  );
};

export default page;
