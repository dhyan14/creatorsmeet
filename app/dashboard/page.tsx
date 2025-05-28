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
      {/* Welcome Section with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400 mt-2">
              {user.role === 'innovator' 
                ? "Let's bring your ideas to life"
                : 'Ready to build amazing projects'}
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-500/10 p-4 rounded-lg text-center"
            >
              <p className="text-2xl font-bold text-purple-400">{user.points || 0}</p>
              <p className="text-sm text-gray-400">Total Points</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-pink-500/10 p-4 rounded-lg text-center"
            >
              <p className="text-2xl font-bold text-pink-400">Level {user.level || 1}</p>
              <p className="text-sm text-gray-400">Current Level</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <h3 className="text-gray-400 text-sm mb-2">Active Projects</h3>
          <p className="text-2xl font-bold text-white">{user.projects?.filter(p => p.status === 'active').length || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <h3 className="text-gray-400 text-sm mb-2">Completed Projects</h3>
          <p className="text-2xl font-bold text-white">{user.projects?.filter(p => p.status === 'completed').length || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <h3 className="text-gray-400 text-sm mb-2">Team Members</h3>
          <p className="text-2xl font-bold text-white">{user.teamMembers?.length || 0}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
        >
          <h3 className="text-gray-400 text-sm mb-2">Achievements</h3>
          <p className="text-2xl font-bold text-white">{user.achievements?.length || 0}</p>
        </motion.div>
      </div>

      {/* Team Members Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.teamMembers?.map((member) => (
            <motion.div
              key={member._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4 flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-xl text-purple-400">{member.name[0]}</span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-white">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Active Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <div className="space-y-4">
          {user.projects?.filter(p => p.status === 'active').map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-white">{project.title}</h3>
                <span className="text-sm text-purple-400">
                  Due {new Date(project.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member) => (
                  <div
                    key={member._id}
                    className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-black flex items-center justify-center"
                  >
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-sm text-purple-400">{member.name[0]}</span>
                    )}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-black flex items-center justify-center">
                    <span className="text-sm text-purple-400">+{project.team.length - 3}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.achievements?.slice(0, 6).map((achievement) => (
            <motion.div
              key={achievement._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xl text-purple-400">{achievement.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Original Project Requirements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {user.role === 'innovator' ? 'Your Project Requirements' : 'Available Projects'}
          </h2>
          {user.role === 'innovator' && user.projectRequirements && (
            <button
              onClick={() => user.projectRequirements?.description && analyzeProject(user.projectRequirements.description)}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconRefresh className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>Reanalyze</span>
            </button>
          )}
        </div>

        {user.role === 'innovator' && user.projectRequirements ? (
          <div className="space-y-6">
            {/* Project Description */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center space-x-2 mb-2">
                <IconBrain className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-medium text-gray-400">Project Description</h3>
              </div>
              <p className="text-gray-300">{user.projectRequirements.description}</p>
            </div>

            {/* Required Technologies */}
            {user.projectRequirements.technologies && user.projectRequirements.technologies.length > 0 && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center space-x-2 mb-2">
                  <IconCode className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-medium text-gray-400">Required Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.projectRequirements.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Complexity */}
            {user.projectRequirements.complexity && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Project Complexity</h3>
                <p className="text-gray-300">{user.projectRequirements.complexity}</p>
              </div>
            )}

            {/* Required Expertise */}
            {user.projectRequirements.expertise && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Required Expertise</h3>
                <p className="text-gray-300">{user.projectRequirements.expertise}</p>
              </div>
            )}

            {/* Last Analyzed */}
            {user.projectRequirements.lastAnalyzed && (
              <div className="text-sm text-gray-500 mt-4">
                Last analyzed: {new Date(user.projectRequirements.lastAnalyzed).toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
              <IconBrain className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-400 mb-4">
              {user.role === 'innovator'
                ? "You haven't added a project idea yet"
                : "No projects available yet"}
            </p>
            {user.role === 'innovator' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/create-project')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Add Project Idea
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 