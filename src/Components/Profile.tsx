"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    applications?: { title: string; company: string; dateApplied: string }[];
  } | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios.get(`/api/profile/${id}`);
      console.log(response.data);
      const user = response.data.user;
      setUser(user);
    };
    if (id) {
      fetchUserProfile();
    }
  }, [id]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: User Info */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl">
              <FaUser />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-500">
                {user?.email || "No email available"}
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
        </div>

        {/* Applications */}
        <section className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            My Applications
          </h2>
          {user?.applications?.length === 0 ? (
            <p className="text-gray-500">
              You haven’t applied to any jobs yet.
            </p>
          ) : (
            <div className="grid gap-4">
              {user?.applications?.map((app, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h3 className="text-base font-medium text-gray-800">
                      {app.title}
                    </h3>
                    <p className="text-sm text-gray-500">{app.company}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied on {app.dateApplied}
                    </p>
                  </div>
                  <div className="text-red-500 cursor-pointer">
                    <MdDelete className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
