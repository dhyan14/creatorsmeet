'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  skills: string[];
  country: string;
  github: string;
  linkedin: string;
  joinedAt: string;
  profileImage: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [editedData, setEditedData] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/me', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfileData(data);
      setEditedData(data);
    } catch (err) {
      setError('Failed to load profile data');
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedData) return;

    try {
      const response = await fetch('/api/user/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      setIsEditing(false);
      // Show success message
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setError('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setProfileData(prev => prev ? { ...prev, profileImage: data.imageUrl } : null);
      setEditedData(prev => prev ? { ...prev, profileImage: data.imageUrl } : null);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!profileData || !editedData) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center">
        <div className="text-white">No profile data found</div>
      </div>
    );
  }

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
                  src={profileData.profileImage || '/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-4 border-purple-600"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
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
                <p className="text-white">{new Date(profileData.joinedAt).toLocaleDateString()}</p>
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
                    <button 
                      onClick={() => {
                        const newSkill = prompt('Enter new skill:');
                        if (newSkill && editedData) {
                          setEditedData({
                            ...editedData,
                            skills: [...editedData.skills, newSkill]
                          });
                        }
                      }}
                      className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm hover:bg-purple-600/30"
                    >
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
                      <a 
                        href={`https://github.com/${profileData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400"
                      >
                        {profileData.github}
                      </a>
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
                      <a 
                        href={`https://linkedin.com/in/${profileData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400"
                      >
                        {profileData.linkedin}
                      </a>
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