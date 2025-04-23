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
