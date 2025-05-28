'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrain, IconCode } from '@tabler/icons-react';

interface User {
  _id: string;
  name: string;
  role: 'innovator' | 'coder';
  projectRequirements?: {
    description: string;
    technologies: string[];
    complexity: string;
    expertise: string;
    preferredStack?: string;
    categories?: string[];
    lastAnalyzed?: Date;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('/api/user/me');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        console.log('Fetched user data:', userData);
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
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
        </div>
      </div>

      {/* Project Ideas Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {user.role === 'innovator' ? 'Your Project Idea' : 'Available Projects'}
          </h2>
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

            {/* Preferred Stack */}
            {user.projectRequirements.preferredStack && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Preferred Stack</h3>
                <p className="text-gray-300">{user.projectRequirements.preferredStack}</p>
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