"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const JobApplicationPage: React.FC = () => {
  // Define formData with proper types
  const [formData, setFormData] = useState<{
    jobId: string; // We'll ensure it's a string in the logic
    userId: string; // We'll ensure it's a string in the logic
    resume: File | null;
  }>({
    jobId: "",
    userId: "",
    resume: null,
  });

  const params = useParams();
  const { id } = params; // id can be string | string[] | undefined
  const jobId = Array.isArray(id) ? id[0] : id || ""; // Ensure it's a string

  const { data: session } = useSession();
  const userId = session?.user?.id || ""; // Ensure it's a string, default to "" if undefined

  // Handle resume file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        resume: file,
        jobId: jobId, // Use the resolved jobId
        userId: userId, // Use the resolved userId
      }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle form submission with Axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Resume is required.");
      return;
    }

    if (!formData.jobId || !formData.userId) {
      alert("Job ID or User ID is missing.");
      return;
    }

    try {
      // Create FormData for file upload
      const payload = new FormData();
      payload.append("jobId", formData.jobId);
      payload.append("userId", formData.userId);
      payload.append("resume", formData.resume);

      // Send request to backend
      const response = await axios.post("/api/applications", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");
      console.log("Permanent resume URL:", response.data.application.resume);

      // Reset form
      setFormData({
        jobId: "",
        userId: "",
        resume: null,
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Submission failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto py-12 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Apply for Job
          </h2>
          <p className="text-gray-600 mb-8">
            Please fill out the form below to apply for the position.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
                required
              />
              {formData.resume && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected file: {formData.resume.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium text-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
