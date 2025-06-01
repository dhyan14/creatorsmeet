'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconEdit, IconBriefcase, IconTrophy, IconCalendar } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Reusing the interfaces from dashboard
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
  bio?: string;
  joinedDate?: Date;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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
          router.push('/signin');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const userData = await response.json();
      console.log('Fetched user data:', userData);
      
      // Add some mock data for profile-specific fields if they don't exist
      if (!userData.bio) {
        userData.bio = "Creator passionate about building innovative solutions.";
      }
      if (!userData.joinedDate) {
        userData.joinedDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 days ago
      }
      if (!userData.skills) {
        userData.skills = userData.role === 'coder' 
          ? ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Next.js'] 
          : ['Product Management', 'UX Design', 'Business Strategy', 'Marketing'];
      }
      
      setUser(userData);
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-500/10 p-4 rounded-lg text-red-500 mb-4">
          <p>{error}</p>
        </div>
        <button
          onClick={() => fetchUserData()}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-400">No user data found.</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 mb-8 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border-4 border-purple-500/30">
              {user.name ? (
                <span className="text-4xl text-white font-bold">{user.name[0]}</span>
              ) : (
                <IconUser size={48} className="text-white" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-500 p-2 rounded-full hover:bg-purple-600 transition-colors">
              <IconEdit size={18} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-purple-300 mb-2">{user.role === 'innovator' ? 'Innovator' : 'Coder'}</p>
            <p className="text-gray-300 mb-4 max-w-2xl">{user.bio}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                Level {user.level}
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                {user.points} Points
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                <IconCalendar size={16} className="inline mr-1" />
                Joined {formatDate(user.joinedDate as Date)}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Profile Tabs */}
      <div className="mb-8 border-b border-white/10 pb-2">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium ${activeTab === 'projects' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 font-medium ${activeTab === 'achievements' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Achievements
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 font-medium ${activeTab === 'team' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Team
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'overview' && (
          <>
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              {user.role === 'innovator' && user.projectRequirements && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Project Requirements</h3>
                  <p className="text-gray-300 mb-3">{user.projectRequirements.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Complexity</h4>
                      <p>{user.projectRequirements.complexity}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Expertise Level</h4>
                      <p>{user.projectRequirements.expertise}</p>
                    </div>
                    {user.projectRequirements.preferredStack && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-1">Preferred Stack</h4>
                        <p>{user.projectRequirements.preferredStack}</p>
                      </div>
                    )}
                    <div className="bg-white/5 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-1">Technologies</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.projectRequirements.technologies.map((tech, index) => (
                          <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400">Level</h3>
                    <span className="text-xl font-bold">{user.level}</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500" 
                      style={{ width: `${(user.points % 100)}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400 text-right">
                    {user.points} / {(Math.floor(user.points / 100) + 1) * 100} points to next level
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Projects</h3>
                    <p className="text-2xl font-bold">{user.projects?.length || 0}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Team Size</h3>
                    <p className="text-2xl font-bold">{user.teamMembers?.length || 0}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Achievements</h3>
                    <p className="text-2xl font-bold">{user.achievements?.length || 0}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm">Completed</h3>
                    <p className="text-2xl font-bold">
                      {user.projects?.filter(p => p.status === 'completed').length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'projects' && (
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                  New Project
                </button>
              </div>
              
              {user.projects && user.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.projects.map((project) => (
                    <motion.div
                      key={project._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 rounded-xl p-5 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-lg">{project.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-4">
                        <div>
                          <span className="text-gray-400 block">Due Date</span>
                          <span>{formatDate(project.dueDate)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Team</span>
                          <span>{project.team.length} members</span>
                        </div>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 4).map((member) => (
                          <div 
                            key={member._id} 
                            className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-black"
                            title={member.name}
                          >
                            <span className="text-xs">{member.name[0]}</span>
                          </div>
                        ))}
                        {project.team.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-black">
                            <span className="text-xs">+{project.team.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <IconBriefcase size={48} className="mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Projects Yet</h3>
                  <p className="text-gray-400 mb-6">Start creating your first project</p>
                  <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                    Create Project
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-6">Achievements</h2>
              
              {user.achievements && user.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.achievements.map((achievement) => (
                    <motion.div
                      key={achievement._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 rounded-xl p-5 border border-white/10"
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl text-purple-400">{achievement.icon}</span>
                        </div>
                        <h3 className="font-medium text-lg">{achievement.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-3">{achievement.description}</p>
                      <div className="text-sm text-gray-400">
                        Earned on {formatDate(achievement.earnedDate)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <IconTrophy size={48} className="mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Achievements Yet</h3>
                  <p className="text-gray-400">Complete projects and tasks to earn achievements</p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                  Add Member
                </button>
              </div>
              
              {user.teamMembers && user.teamMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.teamMembers.map((member) => (
                    <motion.div
                      key={member._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-center space-x-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                        ) : (
                          <span className="text-xl text-purple-400">{member.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-gray-400">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <IconUser size={48} className="mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Team Members Yet</h3>
                  <p className="text-gray-400 mb-6">Add team members to collaborate on projects</p>
                  <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                    Add Team Member
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
