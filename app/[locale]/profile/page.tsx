"use client";

import { Button } from "@/app/components";
import type React from "react";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Dr. Aziz Karimov",
    email: "aziz.karimov@agro.uz",
    phone: "+998 71 234 56 78",
    bio: "Experienced agronomist specializing in sustainable farming practices, crop management, and agricultural technology implementation. 15+ years of expertise in Central Asian agriculture.",
    location: "Tashkent, Uzbekistan",
    specialization: "Crop Science & Sustainable Agriculture",
    experience: "15 years",
    education: "PhD in Agricultural Sciences",
    license: "Certified Professional Agronomist #AG-2024-001",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const stats = [
    { label: "Farms Consulted", value: "120+", color: "bg-green-600" },
    { label: "Crop Yield Improved", value: "35%", color: "bg-blue-600" },
    { label: "Hectares Managed", value: "2,500", color: "bg-yellow-600" },
    { label: "Success Rate", value: "94%", color: "bg-emerald-600" },
  ];

  const activities = [
    {
      action: "Completed soil analysis for wheat farm in Samarkand region",
      time: "2 days ago",
      type: "analysis",
    },
    {
      action: "Implemented drip irrigation system for cotton cultivation",
      time: "1 week ago",
      type: "implementation",
    },
    {
      action: "Conducted training on organic farming methods",
      time: "2 weeks ago",
      type: "training",
    },
    {
      action: "Published research on drought-resistant crop varieties",
      time: "1 month ago",
      type: "research",
    },
    {
      action: "Certified in precision agriculture technology",
      time: "2 months ago",
      type: "certification",
    },
  ];

  const expertise = [
    { name: "Crop Management", level: 95, color: "bg-green-600" },
    { name: "Soil Science", level: 92, color: "bg-amber-600" },
    { name: "Irrigation Systems", level: 88, color: "bg-blue-600" },
    { name: "Pest Control", level: 90, color: "bg-red-600" },
    { name: "Organic Farming", level: 85, color: "bg-emerald-600" },
    { name: "Agricultural Technology", level: 82, color: "bg-purple-600" },
    { name: "Climate Adaptation", level: 87, color: "bg-teal-600" },
    { name: "Crop Breeding", level: 80, color: "bg-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Agronomist Profile
              </h1>
            </div>
            <Button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {formData.name}
                </h2>
                <p className="text-green-600 font-medium mb-1">
                  {formData.specialization}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {formData.experience} experience
                </p>
                <div className="flex justify-center items-center space-x-1 text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {formData.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Professional Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-2 rounded-lg ${stat.color} flex items-center justify-center text-white text-lg font-bold`}
                    >
                      {stat.value.charAt(0)}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Areas of Expertise
              </h3>
              <div className="space-y-3">
                {expertise.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-gray-600">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 ${skill.color} rounded-full transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6 px-6">
                  {[
                    { key: "profile", label: "Personal Info", icon: "user" },
                    { key: "activity", label: "Recent Work", icon: "activity" },
                    { key: "settings", label: "Settings", icon: "settings" },
                  ].map((tab) => (
                    <Button
                      type="button"
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.key
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {tab.icon === "user" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        )}
                        {tab.icon === "activity" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        )}
                        {tab.icon === "settings" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                        )}
                      </svg>
                      <span>{tab.label}</span>
                    </Button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: "name", label: "Full Name", type: "text" },
                          {
                            key: "email",
                            label: "Email Address",
                            type: "email",
                          },
                          { key: "phone", label: "Phone Number", type: "tel" },
                          {
                            key: "specialization",
                            label: "Specialization",
                            type: "text",
                          },
                          {
                            key: "experience",
                            label: "Years of Experience",
                            type: "text",
                          },
                          {
                            key: "education",
                            label: "Education",
                            type: "text",
                          },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {field.label}
                            </label>
                            {isEditing ? (
                              <input
                                type={field.type}
                                name={field.key}
                                value={
                                  formData[field.key as keyof typeof formData]
                                }
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            ) : (
                              <div className="px-3 py-2 bg-gray-50 rounded-lg border">
                                <span className="text-gray-900">
                                  {formData[field.key as keyof typeof formData]}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-50 rounded-lg border">
                          <p className="text-gray-900 leading-relaxed">
                            {formData.bio}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional License
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="license"
                          value={formData.license}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-50 rounded-lg border">
                          <span className="text-gray-900">
                            {formData.license}
                          </span>
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "activity" && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Recent Professional Activities
                    </h3>
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-green-500 pl-4 py-3"
                        >
                          <p className="text-gray-900 font-medium">
                            {activity.action}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {activity.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Account Settings
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Public Profile",
                            desc: "Make profile visible to potential clients",
                          },
                          {
                            title: "Email Notifications",
                            desc: "Receive updates about consultations",
                          },
                          {
                            title: "SMS Alerts",
                            desc: "Get urgent notifications via SMS",
                          },
                          {
                            title: "Professional Directory",
                            desc: "List in agronomist directory",
                          },
                        ].map((setting, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {setting.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {setting.desc}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={index < 2}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-red-600 mb-4">
                        Account Management
                      </h3>
                      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h4 className="font-medium text-red-900 mb-2">
                          Delete Account
                        </h4>
                        <p className="text-red-700 mb-4 text-sm">
                          Permanently delete your profile and all associated
                          data. This action cannot be undone.
                        </p>
                        <Button
                          type="button"
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
