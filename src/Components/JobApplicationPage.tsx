"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

const JobApplicationPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    jobId: string;
    userId: string;
    resume: File | null;
  }>({
    jobId: "",
    userId: "",
    resume: null,
  });

  const params = useParams();
  const router = useRouter();

  const { id } = params;
  const jobId = Array.isArray(id) ? id[0] : id || "";

  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        resume: file,
        jobId: jobId,
        userId: userId,
      }));
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Resume is required.");
      return;
    }

    if (!formData.jobId || !formData.userId) {
      toast.error("Job ID or User ID is missing.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("jobId", formData.jobId);
      payload.append("userId", formData.userId);
      payload.append("resume", formData.resume);

      const response = await axios.post("/api/apply/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload resume");
      }

      toast.success("Thanks for applying!");

      setFormData({
        jobId: "",
        userId: "",
        resume: null,
      });

      setTimeout(() => {
        router.push(`/profile/${userId}`);
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 shadow-md sm:shadow-lg rounded-lg border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Apply for Job
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Please upload your resume (PDF only) to apply for this position.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              {formData.resume && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                  Selected file: {formData.resume.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-medium text-base sm:text-lg"
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