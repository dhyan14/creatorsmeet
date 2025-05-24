'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconBrain, IconRocket, IconUsers, IconCode, IconMessage, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface User {
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
    preferredStack: string;
  };
  matchedWith?: {
    _id: string;
    name: string;
    role: string;
    developerStack?: {
      name: string;
      technologies: string[];
    };
    projectRequirements?: {
      description: string;
      technologies: string[];
      preferredStack: string;
    };
  };
  activeProject?: {
    status: string;
    progress: number;
  };
}

interface AIMentor {
  name: string;
  expertise: string[];
  avatar: string;
  description: string;
}

const aiMentors: AIMentor[] = [
  {
    name: "TechGuide AI",
    expertise: ["Architecture Design", "Code Review", "Best Practices"],
    avatar: "/ai-mentor-1.png",
    description: "Your technical advisor for software architecture and development best practices."
  },
  {
    name: "ProjectPro AI",
    expertise: ["Project Management", "Timeline Planning", "Risk Assessment"],
    avatar: "/ai-mentor-2.png",
    description: "Specialized in project planning and management methodologies."
  },
  {
    name: "InnovateMind AI",
    expertise: ["Innovation Strategy", "Market Analysis", "Product Development"],
    avatar: "/ai-mentor-3.png",
    description: "Helps refine your ideas and develop market-ready solutions."
  }
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<AIMentor>(aiMentors[0]);
  const [showMentorChat, setShowMentorChat] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading dashboard</h1>
        <p className="text-gray-400 mt-2">{error || 'Please try refreshing the page'}</p>
      </div>
    );
  }

  const stats = [
    {
      icon: <IconRocket className="w-5 h-5 text-purple-400" />,
      label: "Project Status",
      value: user.activeProject ? user.activeProject.status : "No Active Project",
      color: "text-purple-400"
    },
    {
      icon: <IconUsers className="w-5 h-5 text-pink-400" />,
      label: "Team Members",
      value: user.matchedWith ? "2" : "1",
      color: "text-pink-400"
    },
    {
      icon: <IconCode className="w-5 h-5 text-blue-400" />,
      label: "Technologies",
      value: user.role === 'innovator' 
        ? user.projectRequirements?.technologies?.length || 0
        : user.developerStack?.technologies?.length || 0,
      color: "text-blue-400"
    },
    {
      icon: <IconBrain className="w-5 h-5 text-green-400" />,
      label: "Project Progress",
      value: user.activeProject ? `${user.activeProject.progress}%` : "0%",
      color: "text-green-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section with Stats */}
      <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <IconMessage className="w-4 h-4" />
            <span>Quick Chat</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-2">
                {stat.icon}
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <div className={cn("text-xl font-semibold", stat.color)}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Team</h2>
            <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1">
              <span>View All</span>
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {user.matchedWith ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-purple-500/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {user.matchedWith.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{user.matchedWith.name}</h3>
                  <p className="text-sm text-gray-400">
                    {user.matchedWith.role === 'coder' 
                      ? user.matchedWith.developerStack?.name
                      : 'Project Lead'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm transition-colors"
                >
                  Message
                </motion.button>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-black/30 rounded-lg text-sm text-gray-300 hover:bg-black/40 transition-colors">
                    Schedule Meeting
                  </button>
                  <button className="p-2 bg-black/30 rounded-lg text-sm text-gray-300 hover:bg-black/40 transition-colors">
                    Share Files
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <IconUsers className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-400 mb-4">Matching you with the perfect team member...</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg inline-flex items-center space-x-2 transition-colors"
              >
                <span>View Potential Matches</span>
                <IconChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* AI Mentor Section */}
        {user.role === 'innovator' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your AI Mentor</h2>
              <button 
                onClick={() => setShowMentorChat(!showMentorChat)}
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
              >
                <span>{showMentorChat ? 'Hide Chat' : 'Start Chat'}</span>
                <IconChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-purple-500/20 transition-colors">
                <Image
                  src={selectedMentor.avatar}
                  alt={selectedMentor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{selectedMentor.name}</h3>
                  <p className="text-sm text-gray-400">{selectedMentor.expertise.join(' • ')}</p>
                </div>
                <div className="flex space-x-2">
                  {aiMentors.map((mentor, index) => (
                    <button
                      key={mentor.name}
                      onClick={() => setSelectedMentor(mentor)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        selectedMentor.name === mentor.name
                          ? "bg-purple-500"
                          : "bg-white/20 hover:bg-white/40"
                      )}
                    />
                  ))}
                </div>
              </div>

              {showMentorChat ? (
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <IconBrain className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1 p-3 bg-black/30 rounded-lg text-sm text-gray-300">
                        How can I assist you with your project today?
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-colors"
                    >
                      Send
                    </motion.button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">{selectedMentor.description}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {user.role === 'innovator' ? 'Your Project' : 'Current Project'}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm transition-colors"
            >
              {user.role === 'innovator' ? 'Edit Project' : 'View Details'}
            </motion.button>
          </div>

          {user.role === 'innovator' ? (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Project Description</h3>
                <p className="text-gray-300">{user.projectRequirements?.description}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Required Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.projectRequirements?.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Timeline</h3>
                  <p className="text-2xl font-semibold text-white">4 weeks</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Budget Range</h3>
                  <p className="text-2xl font-semibold text-white">$2k - $5k</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Priority Level</h3>
                  <p className="text-2xl font-semibold text-green-400">Medium</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Your Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {user.developerStack?.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Active Projects</h3>
                  <p className="text-2xl font-semibold text-white">1</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Completed</h3>
                  <p className="text-2xl font-semibold text-white">12</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Rating</h3>
                  <p className="text-2xl font-semibold text-yellow-400">4.8/5</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 