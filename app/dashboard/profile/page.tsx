'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Creator',
    bio: 'Passionate about creating innovative solutions and bringing ideas to life.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    country: 'United States',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe'
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the profile
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedData)
      // });
      
      setProfileData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Content */}
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Photo and Basic Info */}
            <div className="space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src="/logo.png" // Replace with actual user photo
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-4 border-purple-600"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-center w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                )}
                <p className="text-purple-400 mt-1">{profileData.role}</p>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Member since</p>
                <p className="text-white">January 2024</p>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    value={editedData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full h-32"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.bio}</p>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full mt-1"
                      />
                    ) : (
                      <p className="text-white">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Country</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.country}
                        onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full mt-1"
                      />
                    ) : (
                      <p className="text-white">{profileData.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm hover:bg-purple-600/30">
                      + Add Skill
                    </button>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Social Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">GitHub</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.github}
                        onChange={(e) => setEditedData({ ...editedData, github: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full mt-1"
                      />
                    ) : (
                      <p className="text-white">{profileData.github}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.linkedin}
                        onChange={(e) => setEditedData({ ...editedData, linkedin: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full mt-1"
                      />
                    ) : (
                      <p className="text-white">{profileData.linkedin}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 