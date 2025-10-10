'use client';

import React, { useEffect, useState } from 'react';

interface Performance {
  projectProgress: number;
  tasksCompleted: number;
  totalTasks: number;
  milestones: {
    name: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    date: string;
  }[];
  teamMetrics: {
    communicationScore: number;
    collaborationScore: number;
    deliverySpeed: number;
    codeQuality: number;
  };
}

export default function PerformancePage() {
  const [performance, setPerformance] = useState<Performance>({
    projectProgress: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    milestones: [],
    teamMetrics: {
      communicationScore: 0,
      collaborationScore: 0,
      deliverySpeed: 0,
      codeQuality: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch('/api/user/performance');
        if (!response.ok) {
          throw new Error('Failed to fetch performance data');
        }
        const data = await response.json();
        setPerformance(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching performance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
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
          Loading performance data...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
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
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Performance</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              Performance & Progress
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Project Progress</h3>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-4 items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-purple-400">
                      {performance.projectProgress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-purple-500/10">
                  <div
                    style={{ width: `${performance.projectProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Tasks Completed */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Tasks</h3>
              </div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-green-400">{performance.tasksCompleted}</span>
                <span className="text-gray-400">/ {performance.totalTasks}</span>
              </div>
              <p className="text-sm text-gray-300">Tasks completed</p>
            </motion.div>

            {/* Team Score */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Team Score</h3>
              </div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-blue-400">89</span>
                <span className="text-gray-400">/ 100</span>
              </div>
              <p className="text-sm text-gray-300">Overall performance</p>
            </motion.div>

            {/* Time Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Time Tracking</h3>
              </div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-orange-400">24</span>
                <span className="text-gray-400">days left</span>
              </div>
              <p className="text-sm text-gray-300">Until next milestone</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Milestones */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Project Milestones</h3>
              </div>
              <div className="space-y-6">
                {performance.milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      milestone.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : milestone.status === 'in-progress'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : milestone.status === 'in-progress' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{milestone.name}</h4>
                      <p className="text-sm text-gray-300">{new Date(milestone.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      milestone.status === 'completed'
                        ? 'text-green-300 bg-green-500/20 border border-green-500/30'
                        : milestone.status === 'in-progress'
                        ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30'
                        : 'text-gray-300 bg-gray-500/20 border border-gray-500/30'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Team Metrics</h3>
              </div>
              <div className="space-y-6">
                {Object.entries(performance.teamMetrics).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-300">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-bold text-blue-400">{value}%</span>
                    </div>
                    <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-blue-500/10">
                      <div
                        style={{ width: `${value}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 