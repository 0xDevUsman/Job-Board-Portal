"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { data: session, update } = useSession();
  const id = session?.user?.id;

  const [user, setUser] = useState<{
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    applications?: {
      applicationID: string;
      title: string;
      company: string;
      dateApplied: string;
    }[];
  } | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/profile/${id}`);
        const user = response.data.user;
        setUser(user);

        setEditedUser({
          name: user.name || "",
          email: user.email || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const nameParts = editedUser.name.trim().split(/\s+/);
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      const response = await axios.patch(`/api/profile/${id}`, {
        userId: id,
        firstname,
        lastname,
        email: editedUser.email,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        const updated = response.data.user;
        setUser((prev) => ({
          ...prev!,
          name: updated.name,
          email: updated.email,
        }));

        await update({
          ...session,
          user: {
            ...session?.user,
            id: updated.id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
          },
        });

        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async (appId: string) => {
    try {
      const response = await axios.delete(`/api/apply/${appId}`);
      if (response.status === 200) {
        toast.success("Application deleted successfully");
        setUser((prevUser) => ({
          ...prevUser!,
          applications: prevUser?.applications?.filter(
            (app) => app.applicationID !== appId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
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
              <p className="text-sm text-gray-500">
                Role: {user?.role || "No role available"}
              </p>
            </div>
          </div>
          <button onClick={handleEditProfile}>
            <span className="text-sm border cursor-pointer hover:opacity-85 bg-blue-500 px-3 py-2 text-white rounded-lg font-bold">
              Edit Profile
            </span>
          </button>
        </div>

        {/* Applications */}
        <section className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            My Applications
          </h2>
          {user?.applications?.length === 0 ? (
            <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
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
                    <MdDelete
                      onClick={() => handleDelete(app.applicationID)}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 cursor-pointer py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
