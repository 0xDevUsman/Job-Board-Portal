"use client";
import Image from "next/image";
import { useState } from "react";

const RecruiterProfile = () => {
  // Dummy data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@careerconnect.com",
    role: "Senior Talent Acquisition Specialist",
    company: "TechHire Solutions",
    bio: "Specializing in connecting top tech talent with innovative companies. 5+ years experience in technical recruitment.",
    avatar: "/default-avatar.jpg",
    stats: {
      positionsFilled: 142,
      candidatesPlaced: 89,
      activeListings: 15,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-blue-600 h-32"></div>

          <div className="px-6 pb-6 relative">
            <div className="flex items-end -mt-16">
              <div className="relative">
                <Image
                  className="h-24 w-24 rounded-full border-4 border-white bg-white"
                  src={profile.avatar}
                  alt="Profile"
                  width={96}
                  height={96}
                />
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <p className="text-blue-600">{profile.role}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Positions Filled</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.stats.positionsFilled}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Candidates Placed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.stats.candidatesPlaced}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Active Listings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.stats.activeListings}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Profile Information
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Role
                </label>
                <p className="mt-1 text-sm text-gray-900">{profile.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Company
                </label>
                <p className="mt-1 text-sm text-gray-900">{profile.company}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Bio
                </label>
                <p className="mt-1 text-sm text-gray-900">{profile.bio}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity (Optional) */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Interview scheduled with Sarah Williams
                  </p>
                  <p className="text-sm text-gray-500">
                    Frontend Developer position • 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Candidate accepted offer
                  </p>
                  <p className="text-sm text-gray-500">
                    Michael Chen for Senior Backend Engineer • 1 day ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

// Profile page  connect with backend
