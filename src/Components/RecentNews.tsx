import Image from "next/image";
import React from "react";
import home_blog1 from "@/assets/blog/home-blog1.jpg";
import home_blog2 from "@/assets/blog/home-blog2.jpg";

const RecentNews = () => {
  const newsItems = [
    {
      image: home_blog1,
      date: "24 Nov",
      category: "Properties",
      title: "Footprints in Time is perfect House in Kurashiki",
    },
    {
      image: home_blog2,
      date: "24 Nov",
      category: "Properties",
      title: "Footprints in Time is perfect House in Kurashiki",
    },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-blue-500 text-base sm:text-lg font-medium uppercase tracking-wide mb-2">
          Our latest blog
        </h3>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Our recent news
        </h1>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48 sm:h-56">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                width={600}
                height={400}
              />
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg">
                <p className="text-xs sm:text-sm font-medium">{item.date}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-gray-500 text-xs sm:text-sm mb-2">
                {item.category}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;