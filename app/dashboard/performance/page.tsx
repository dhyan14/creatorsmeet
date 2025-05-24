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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Performance & Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Project Progress */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Project Progress</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-purple-500/10 text-purple-400">
                  {performance.projectProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-500/10">
              <div
                style={{ width: `${performance.projectProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-600"
              ></div>
            </div>
          </div>
        </div>

        {/* Tasks Completed */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Tasks</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">{performance.tasksCompleted}</span>
            <span className="text-gray-400">/ {performance.totalTasks}</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Tasks completed</p>
        </div>

        {/* Team Score */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Team Score</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">89</span>
            <span className="text-gray-400">/ 100</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Overall performance</p>
        </div>

        {/* Time Tracking */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium mb-4">Time Tracking</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">24</span>
            <span className="text-gray-400">days left</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Until next milestone</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Milestones */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6">Project Milestones</h3>
          <div className="space-y-6">
            {performance.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : milestone.status === 'in-progress'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {milestone.status === 'completed' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : milestone.status === 'in-progress' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.name}</h4>
                  <p className="text-sm text-gray-400">{new Date(milestone.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-sm ${
                  milestone.status === 'completed'
                    ? 'text-green-400'
                    : milestone.status === 'in-progress'
                    ? 'text-purple-400'
                    : 'text-gray-400'
                }`}>
                  {milestone.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Metrics */}
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-6">Team Metrics</h3>
          <div className="space-y-6">
            {Object.entries(performance.teamMetrics).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-500/10">
                  <div
                    style={{ width: `${value}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-600"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 