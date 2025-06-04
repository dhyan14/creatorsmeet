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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <p className="mt-4 text-gray-400">
          {isAnalyzing ? 'Analyzing your project requirements...' : 'Loading your dashboard...'}
        </p>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-md mx-auto p-4 bg-white/5 rounded-lg text-sm text-gray-400"
          >
            <p className="mb-2">We're using AI to analyze your project and determine:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Required technologies</li>
              <li>Project complexity</li>
              <li>Required expertise</li>
              <li>Best practices and recommendations</li>
            </ul>
          </motion.div>
        )}
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error loading dashboard</h1>
        <p className="text-gray-400 mb-4">{error || 'Please try refreshing the page'}</p>
        <button
          onClick={() => fetchUserData()}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400">
                {user.role === 'innovator' 
                  ? "Let's bring your ideas to life"
                  : 'Ready to build amazing projects'}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-500/10 p-4 rounded-xl text-center border border-purple-500/20"
                >
                  <p className="text-2xl font-bold text-purple-400">{user.points || 0}</p>
                  <p className="text-sm text-gray-400">Total Points</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-pink-500/10 p-4 rounded-xl text-center border border-pink-500/20"
                >
                  <p className="text-2xl font-bold text-pink-400">Level {user.level || 1}</p>
                  <p className="text-sm text-gray-400">Current Level</p>
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
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Project Requirements</h2>
                <button
                  onClick={() => user.projectRequirements?.description && analyzeProject(user.projectRequirements.description)}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconRefresh className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>Reanalyze</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Description */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <IconBrain className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium text-gray-400">Project Description</h3>
                  </div>
                  <p className="text-gray-300">{user.projectRequirements.description}</p>
                </div>

                {/* Required Technologies */}
                {user.projectRequirements.technologies && user.projectRequirements.technologies.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-3">
                      <IconCode className="w-5 h-5 text-purple-400" />
                      <h3 className="text-sm font-medium text-gray-400">Required Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.projectRequirements.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Complexity */}
                {user.projectRequirements.complexity && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Project Complexity</h3>
                    <p className="text-gray-300">{user.projectRequirements.complexity}</p>
                  </div>
                )}

                {/* Required Expertise */}
                {user.projectRequirements.expertise && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Required Expertise</h3>
                    <p className="text-gray-300">{user.projectRequirements.expertise}</p>
                  </div>
                )}
              </div>

              {/* Last Analyzed */}
              {user.projectRequirements.lastAnalyzed && (
                <div className="mt-4 text-sm text-gray-500">
                  Last analyzed: {new Date(user.projectRequirements.lastAnalyzed).toLocaleString()}
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
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Stats</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-gray-400 text-sm mb-1">Active Projects</h3>
                <p className="text-2xl font-bold text-white">{user.projects?.filter(p => p.status === 'active').length || 0}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-gray-400 text-sm mb-1">Completed Projects</h3>
                <p className="text-2xl font-bold text-white">{user.projects?.filter(p => p.status === 'completed').length || 0}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-gray-400 text-sm mb-1">Team Members</h3>
                <p className="text-2xl font-bold text-white">{user.teamMembers?.length || 0}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-gray-400 text-sm mb-1">Achievements</h3>
                <p className="text-2xl font-bold text-white">{user.achievements?.length || 0}</p>
              </div>
            </div>
          </motion.div>

          {/* Team Members Box */}
          {user.teamMembers && user.teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Team Members</h2>
                <span className="text-sm text-purple-400">{user.teamMembers.length} Members</span>
              </div>
              <div className="space-y-3">
                {user.teamMembers.map((member) => (
                  <motion.div
                    key={member._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-lg text-purple-400">{member.name[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-white truncate">{member.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{member.role}</p>
                    </div>
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
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Recent Achievements</h2>
                <span className="text-sm text-purple-400">
                  {user.achievements.length} Total
                </span>
              </div>
              <div className="space-y-3">
                {user.achievements.slice(0, 4).map((achievement) => (
                  <motion.div
                    key={achievement._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-3 border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl text-purple-400">{achievement.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-white truncate">{achievement.title}</h3>
                        <p className="text-sm text-gray-400 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 