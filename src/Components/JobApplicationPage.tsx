"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const JobApplicationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const params = useParams();
  const { id } = params;
  const jobId = id;

  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Resume is required.");
      return;
    }

    try {
      const resumeText = await formData.resume.text();

      const payload = {
        jobId,
        userId,
        resume: resumeText,
        coverLetter: formData.coverLetter,
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Application submitted successfully!");
      console.log("API Response:", data);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
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
            Please fill out the form below with your details to apply for the
            position.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 text-gray-700"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 text-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 text-gray-700"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 text-gray-700"
                placeholder="Write your cover letter here"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Resume <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
                accept=".pdf,.doc,.docx"
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
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium text-lg"
              disabled={
                !formData.fullName ||
                !formData.email ||
                !formData.phone ||
                !formData.resume
              }
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
