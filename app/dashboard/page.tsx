'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrain, IconCode, IconRefresh } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface ProjectRequirements {
  description: string;
  technologies: string[];
  complexity: string;
  expertise: string;
  preferredStack?: string;
  lastAnalyzed?: Date;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  _id: string;
  title: string;
  status: 'active' | 'completed';
  progress: number;
  dueDate: Date;
  team: TeamMember[];
}

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'innovator' | 'coder';
  projectRequirements?: ProjectRequirements;
  points: number;
  level: number;
  teamMembers: TeamMember[];
  projects: Project[];
  achievements: Achievement[];
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProject = async (description: string) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/project/analyze', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectIdea: description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze project');
      }

      // Refresh user data to get updated analysis
      await fetchUserData();
    } catch (err) {
      console.error('Error analyzing project:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze project');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const userData = await response.json();
      console.log('Fetched user data:', userData);
      
      // Check if analysis is needed
      if (
        userData.role === 'innovator' &&
        userData.projectRequirements?.description &&
        (!userData.projectRequirements.technologies || userData.projectRequirements.technologies.length === 0)
      ) {
        setUser(userData); // Set initial user data to show loading state
        await analyzeProject(userData.projectRequirements.description);
      } else {
        setUser(userData);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  if (loading || isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950/20 to-black">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200/30 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-gray-300 text-lg font-medium"
        >
          {isAnalyzing ? 'Analyzing your project requirements...' : 'Loading your dashboard...'}
        </motion.p>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-md mx-auto p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-sm text-gray-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <IconBrain className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">AI Analysis in Progress</h3>
            </div>
            <p className="mb-4">We're using AI to analyze your project and determine:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                Required technologies
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                Project complexity
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                Required expertise
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                Best practices and recommendations
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950/20 to-black">
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
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-300 mb-6">{error || 'Please try refreshing the page'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchUserData()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-gray-300 text-lg mt-2">
                    {user.role === 'innovator' 
                      ? "Let's bring your ideas to life"
                      : 'Ready to build amazing projects'}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{user.name[0]}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-6 rounded-2xl text-center border border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-purple-400">{user.points || 0}</p>
                  <p className="text-sm text-gray-300 font-medium">Total Points</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 p-6 rounded-2xl text-center border border-pink-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-pink-500/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-pink-400">Level {user.level || 1}</p>
                  <p className="text-sm text-gray-300 font-medium">Current Level</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Project Requirements Section */}
          {user.role === 'innovator' && user.projectRequirements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <IconBrain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Project Requirements</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => user.projectRequirements?.description && analyzeProject(user.projectRequirements.description)}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/30"
                >
                  <IconRefresh className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span className="font-medium">Reanalyze</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Description */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                      <IconBrain className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-300">Project Description</h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{user.projectRequirements.description}</p>
                </motion.div>

                {/* Required Technologies */}
                {user.projectRequirements.technologies && user.projectRequirements.technologies.length > 0 && (
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                        <IconCode className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-300">Required Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {user.projectRequirements.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Project Complexity */}
                {user.projectRequirements.complexity && (
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-pink-500/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-gray-300">Project Complexity</h3>
                    </div>
                    <p className="text-gray-200">{user.projectRequirements.complexity}</p>
                  </motion.div>
                )}

                {/* Required Expertise */}
                {user.projectRequirements.expertise && (
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-gray-300">Required Expertise</h3>
                    </div>
                    <p className="text-gray-200">{user.projectRequirements.expertise}</p>
                  </motion.div>
                )}
              </div>

              {/* Last Analyzed */}
              {user.projectRequirements.lastAnalyzed && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last analyzed: {new Date(user.projectRequirements.lastAnalyzed).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Stats Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Quick Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-gray-300 text-sm font-medium">Active Projects</h3>
                </div>
                <p className="text-2xl font-bold text-purple-400">{user.projects?.filter(p => p.status === 'active').length || 0}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-4 border border-green-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-300 text-sm font-medium">Completed</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">{user.projects?.filter(p => p.status === 'completed').length || 0}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 border border-blue-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-300 text-sm font-medium">Team Members</h3>
                </div>
                <p className="text-2xl font-bold text-blue-400">{user.teamMembers?.length || 0}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-4 border border-yellow-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-300 text-sm font-medium">Achievements</h3>
                </div>
                <p className="text-2xl font-bold text-yellow-400">{user.achievements?.length || 0}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Members Box */}
          {user.teamMembers && user.teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Team Members</h2>
                </div>
                <span className="text-sm text-purple-400 font-medium bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                  {user.teamMembers.length} Members
                </span>
              </div>
              <div className="space-y-4">
                {user.teamMembers.map((member) => (
                  <motion.div
                    key={member._id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-2xl" />
                      ) : (
                        <span className="text-lg font-bold text-white">{member.name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white truncate">{member.name}</h3>
                      <p className="text-sm text-gray-300 truncate">{member.role}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievements Box */}
          {user.achievements && user.achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Recent Achievements</h2>
                </div>
                <span className="text-sm text-yellow-400 font-medium bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                  {user.achievements.length} Total
                </span>
              </div>
              <div className="space-y-4">
                {user.achievements.slice(0, 4).map((achievement) => (
                  <motion.div
                    key={achievement._id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-white">{achievement.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white truncate">{achievement.title}</h3>
                        <p className="text-sm text-gray-300 truncate">{achievement.description}</p>
                      </div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
} 