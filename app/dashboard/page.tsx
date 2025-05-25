'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconBrain, IconRocket, IconUsers, IconCode, IconMessage, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import ProjectIdeaForm from '../components/ProjectIdeaForm';

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
    complexity: string;
    expertise: string;
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
      complexity: string;
      expertise: string;
      preferredStack: string;
    };
  };
  activeProject?: {
    status: string;
    progress: number;
  };
  aiMentor?: {
    name: string;
    expertise: string[];
    avatar: string;
    description: string;
    assignedAt: string;
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
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user/me');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Fetch or assign AI mentor if not already assigned
        const mentorResponse = await fetch('/api/user/assign-mentor');
        if (mentorResponse.ok) {
          const mentorData = await mentorResponse.json();
          userData.aiMentor = mentorData;
        }

        // Show project form for innovators without requirements
        if (userData.role === 'innovator' && !userData.projectRequirements?.description) {
          setShowProjectForm(true);
        }

        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProjectAnalysis = async (analysis: {
    technologies: Array<{ name: string; confidence: number }>;
    complexity: string;
    expertise: string;
  }) => {
    try {
      // Update user's project requirements
      const response = await fetch('/api/user/update-requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: user?.projectRequirements?.description || '',
          technologies: analysis.technologies.map(tech => tech.name),
          complexity: analysis.complexity,
          expertise: analysis.expertise,
          preferredStack: analysis.technologies[0]?.name || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project requirements');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setShowProjectForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project requirements');
    }
  };

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
      {showProjectForm && user.role === 'innovator' ? (
        <ProjectIdeaForm onAnalysisComplete={handleProjectAnalysis} />
      ) : (
        <>
          {/* Project Requirements Section for Innovators */}
          {user.role === 'innovator' && user.projectRequirements && (
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Project Requirements</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Project Description</h3>
                  <p className="text-gray-300">{user.projectRequirements.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Required Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.projectRequirements.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Project Complexity</h3>
                    <p className="text-gray-300">{user.projectRequirements.complexity}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Required Expertise</h3>
                    <p className="text-gray-300">{user.projectRequirements.expertise}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {stat.icon}
                    <h3 className="text-gray-400">{stat.label}</h3>
                  </div>
                  <span className={cn("font-semibold", stat.color)}>{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Mentor Section */}
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <IconBrain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your AI Mentor</h2>
                  <p className="text-gray-400">Get personalized guidance for your project</p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowMentorChat(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg flex items-center space-x-2"
              >
                <IconMessage className="w-4 h-4" />
                <span>Chat Now</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMentor(mentor)}
                  className={cn(
                    "relative bg-white/5 rounded-xl p-4 border cursor-pointer transition-all",
                    selectedMentor.name === mentor.name
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "border-white/5 hover:border-purple-500/20"
                  )}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={mentor.avatar}
                        alt={mentor.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{mentor.name}</h3>
                      <p className="text-sm text-gray-400">{mentor.expertise[0]}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{mentor.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 