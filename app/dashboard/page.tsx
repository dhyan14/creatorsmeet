'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [selectedMentor, setSelectedMentor] = useState<AIMentor>(aiMentors[0]);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading dashboard</h1>
        <p className="text-gray-400 mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-gray-400 mt-2">
            {user.role === 'innovator' 
              ? "Let's bring your ideas to life"
              : 'Ready to build amazing projects'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Section */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Your Team</h2>
          {user.matchedWith ? (
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {user.matchedWith.name[0]}
              </div>
              <div>
                <h3 className="font-medium">{user.matchedWith.name}</h3>
                <p className="text-sm text-gray-400">
                  {user.matchedWith.role === 'coder' 
                    ? user.matchedWith.developerStack?.name
                    : 'Project Lead'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Matching you with the perfect team member...</p>
          )}
        </div>

        {/* AI Mentor Section */}
        {user.role === 'innovator' && (
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Your AI Mentor</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <Image
                  src={selectedMentor.avatar}
                  alt={selectedMentor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedMentor.name}</h3>
                  <p className="text-sm text-gray-400">{selectedMentor.expertise.join(' • ')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{selectedMentor.description}</p>
            </div>
          </div>
        )}

        {/* Project Overview */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {user.role === 'innovator' ? 'Your Project' : 'Current Project'}
          </h2>
          {user.role === 'innovator' ? (
            <div className="space-y-4">
              <p className="text-gray-300">{user.projectRequirements?.description}</p>
              <div>
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
            </div>
          ) : (
            <div className="space-y-4">
              <div>
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
              {user.matchedWith && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Project Description</h3>
                  <p className="text-gray-300">
                    {user.matchedWith.projectRequirements?.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 