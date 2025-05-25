'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconBrain, IconRocket, IconUsers, IconCode, IconMessage } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import ProjectIdeaForm from '../components/ProjectIdeaForm';
import ProjectRequirements from '../components/ProjectRequirements';
import { useRouter } from 'next/navigation';

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
  const [projectIdea, setProjectIdea] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        // Fetch user data
        const userResponse = await fetch('/api/user/me');
        
        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          console.error('Failed to fetch user data:', errorData);
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        console.log('User data received:', {
          role: userData.role,
          hasProjectRequirements: !!userData.projectRequirements,
          projectRequirements: userData.projectRequirements
        });

        // Show project form for innovators without requirements
        if (userData.role === 'innovator' && !userData.projectRequirements?.description) {
          console.log('Showing project form for innovator without requirements');
          setShowProjectForm(true);
        }

        setUser(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching data:', err);
        setError(errorMessage);
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
  }, description: string) => {
    try {
      console.log('Handling project analysis:', { analysis, description });
      
      // Update user's project requirements
      const response = await fetch('/api/user/update-requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          technologies: analysis.technologies.map(tech => tech.name),
          complexity: analysis.complexity,
          expertise: analysis.expertise,
          preferredStack: analysis.technologies[0]?.name || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update project requirements:', errorData);
        throw new Error(errorData.message || 'Failed to update project requirements');
      }

      const updatedUser = await response.json();
      console.log('Project requirements updated:', updatedUser);
      
      // Update the user state with the new data
      setUser(prevUser => {
        const newUser = {
          ...prevUser!,
          projectRequirements: {
            description: description,
            technologies: analysis.technologies.map(tech => tech.name),
            complexity: analysis.complexity,
            expertise: analysis.expertise,
            preferredStack: analysis.technologies[0]?.name || '',
          }
        };
        console.log('Updated user state:', newUser);
        return newUser;
      });
      
      setShowProjectForm(false);
      
      // Force a refresh of the page data
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project requirements';
      console.error('Error updating project requirements:', err);
      setError(errorMessage);
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
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className={cn("text-xl font-semibold", stat.color)}>{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Requirements or Developer Stack Section */}
          {user.role === 'innovator' && user.projectRequirements ? (
            <ProjectRequirements
              description={user.projectRequirements.description}
              technologies={user.projectRequirements.technologies}
              complexity={user.projectRequirements.complexity}
              expertise={user.projectRequirements.expertise}
            />
          ) : user.role === 'coder' && user.developerStack ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Developer Profile</h2>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <IconCode className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.developerStack.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

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