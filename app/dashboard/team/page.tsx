'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  _id: string;
  name: string;
  role: 'innovator' | 'coder';
  developerStack?: {
    name: string;
    technologies: string[];
  };
  projectRequirements?: {
    description: string;
    technologies: string[];
  };
  performance: {
    communicationScore: number;
    collaborationScore: number;
    deliverySpeed: number;
    codeQuality: number;
  };
}

export default function TeamPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/user/team');
        if (response.ok) {
          const data = await response.json();
          setTeamMember(data);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
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
          Loading team data...
        </motion.p>
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
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Your Team
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Team Member Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              {teamMember ? (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    >
                      {teamMember.name[0]}
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{teamMember.name}</h2>
                      <div className="mt-2">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30">
                          {teamMember.role === 'coder' 
                            ? teamMember.developerStack?.name || 'Developer'
                            : 'Project Lead'}
                        </span>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Expertise</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {(teamMember.role === 'coder' 
                        ? teamMember.developerStack?.technologies
                        : teamMember.projectRequirements?.technologies
                      )?.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
                        >
                          {tech}
                        </motion.span>
                      )) || <p className="text-gray-400">No technologies specified</p>}
                    </div>
                  </motion.div>

                  {teamMember.role === 'innovator' && teamMember.projectRequirements && (
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-pink-500/30 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Project Vision</h3>
                      </div>
                      <p className="text-gray-200 leading-relaxed">{teamMember.projectRequirements.description}</p>
                    </motion.div>
                  )}

                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(teamMember.performance).map(([key, value]) => (
                        <motion.div 
                          key={key}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30 backdrop-blur-sm"
                        >
                          <div className="text-sm text-gray-300 mb-2 font-medium">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-purple-400">{value}</div>
                            <div className="text-sm text-gray-400">/ 100</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No Team Member Yet</h3>
                  <p className="text-gray-400">We're working on finding the perfect match for you!</p>
                </motion.div>
              )}
            </motion.div>

            {/* Communication Center */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                </div>
                <div className="space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="w-full py-4 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all duration-200 border border-purple-500/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Start Chat</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="w-full py-4 px-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all duration-200 border border-blue-500/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video Call</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="w-full py-4 px-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-300 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all duration-200 border border-green-500/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Schedule Meeting</span>
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Collaboration Tools</h3>
                </div>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    href="#"
                    className="block py-4 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-500/30 rounded-lg flex items-center justify-center">
                          <Image
                            src="/github-icon.svg"
                            alt="GitHub"
                            width={20}
                            height={20}
                          />
                        </div>
                        <span className="font-medium text-white">GitHub Repository</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    href="#"
                    className="block py-4 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-white">Discord Channel</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 