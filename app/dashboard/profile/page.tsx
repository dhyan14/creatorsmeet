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
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200/30 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-gray-300 text-lg font-medium"
        >
          Loading profile...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Profile</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchUserProfile()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!profileData || !editedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-400 mb-4">No Profile Data</h1>
          <p className="text-gray-300">Please complete your profile setup</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Profile
              </h1>
            </div>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
              >
                Edit Profile
              </motion.button>
            )}
          </motion.div>

          {/* Profile Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Photo and Basic Info */}
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative w-40 h-40 mx-auto"
                >
                  <Image
                    src={profileData.profileImage || '/default-avatar.png'}
                    alt="Profile"
                    fill
                    className="rounded-2xl object-cover border-4 border-gradient-to-r from-purple-500 to-pink-500"
                  />
                  {isEditing && (
                    <motion.label 
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer shadow-lg"
                    >
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
                    </motion.label>
                  )}
                </motion.div>
                
                <div className="text-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center w-full font-semibold text-xl"
                    />
                  ) : (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{profileData.name}</h2>
                  )}
                  <div className="mt-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30">
                      {profileData.role}
                    </span>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm font-medium">Member since</p>
                  </div>
                  <p className="text-white font-semibold">{new Date(profileData.joinedAt).toLocaleDateString()}</p>
                </motion.div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">About</h3>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedData.bio}
                      onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white w-full h-32 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-200 leading-relaxed">{profileData.bio || "No bio available"}</p>
                  )}
                </motion.div>

                {/* Contact Information */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white w-full"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.country}
                          onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white w-full"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.country || "Not specified"}</p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {profileData.skills?.map((skill, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
                      >
                        {skill}
                      </motion.span>
                    )) || <p className="text-gray-400">No skills added yet</p>}
                    {isEditing && (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          const newSkill = prompt('Enter new skill:');
                          if (newSkill && editedData) {
                            setEditedData({
                              ...editedData,
                              skills: [...(editedData.skills || []), newSkill]
                            });
                          }
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 rounded-xl text-sm font-medium border border-green-500/30 hover:from-green-500/30 hover:to-green-600/30"
                      >
                        + Add Skill
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Social Links</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">GitHub</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.github || ''}
                          onChange={(e) => setEditedData({ ...editedData, github: e.target.value })}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white w-full"
                          placeholder="username"
                        />
                      ) : (
                        <a 
                          href={`https://github.com/${profileData.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-purple-400 font-medium"
                        >
                          {profileData.github || "Not linked"}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.linkedin || ''}
                          onChange={(e) => setEditedData({ ...editedData, linkedin: e.target.value })}
                          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white w-full"
                          placeholder="username"
                        />
                      ) : (
                        <a 
                          href={`https://linkedin.com/in/${profileData.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-purple-400 font-medium"
                        >
                          {profileData.linkedin || "Not linked"}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-end gap-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
                >
                  Save Changes
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 