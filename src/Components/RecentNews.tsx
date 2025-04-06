import Image from "next/image";
import React from "react";
import home_blog1 from "@/assets/blog/home-blog1.jpg";
import home_blog2 from "@/assets/blog/home-blog2.jpg";
const RecentNews = () => {
  const newsItems = [
    {
      image: home_blog1, // Replace with actual image URL
      date: "24 Nov",
      category: "Properties",
      title: "Footprints in Time is perfect House in Kurashiki",
    },
    {
      image: home_blog2, // Replace with actual image URL
      date: "24 Nov",
      category: "Properties",
      title: "Footprints in Time is perfect House in Kurashiki",
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h3 className="text-pink-500 text-lg font-medium uppercase tracking-wide mb-2">
          Our latest blog
        </h3>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Our recent news
        </h1>
      </div>

      {/* News Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
                width={600}
                height={400}
              />
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg">
                <p className="text-sm font-medium">{item.date}</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-2">{item.category}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
