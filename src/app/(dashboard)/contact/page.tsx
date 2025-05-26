import React from "react";
import bgImage from "@/assets/hero/about.jpg";

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Contact Form Section */}
        <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 shadow-lg rounded-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <form className="space-y-6">
            <div>
              <textarea
                className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700 resize-none"
                placeholder="Enter Message"
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              <input
                type="text"
                className="w-full sm:w-1/2 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700"
                placeholder="Enter your name"
              />
              <input
                type="email"
                className="w-full sm:w-1/2 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-700"
                placeholder="Enter Subject"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium text-lg"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="w-full lg:w-1/3 text-gray-700 space-y-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 mr-4 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="font-medium">Buttonwood, California.</p>
              <p className="text-sm text-gray-600">Rosemead, CA 91770</p>
            </div>
          </div>
          <div className="flex items-start">
            <svg
              className="w-6 h-6 mr-4 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7h-7m5 4h-5m5 4h-5"
              />
            </svg>
            <div>
              <p className="font-medium">+1 253 565 2365</p>
              <p className="text-sm text-gray-600">Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div className="flex items-start">
            <svg
              className="w-6 h-6 mr-4 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="font-medium">support@careerflow.com</p>
              <p className="text-sm text-gray-600">
                Send us your query anytime!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold z-10">About Us</h1>
        </div>
      </div>

      {/* Contact Section */}
      <ContactPage />
    </div>
  );
};

export default HomePage;
