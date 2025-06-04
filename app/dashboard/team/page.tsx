'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface TeamMember {
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
  };
  performance: {
    communicationScore: number;
    collaborationScore: number;
    deliverySpeed: number;
    codeQuality: number;
  };
}

export default function TeamPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/user/team');
        if (response.ok) {
          const data = await response.json();
          setTeamMember(data);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Team</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Member Profile */}
        <div className="lg:col-span-2 bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          {teamMember ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {teamMember.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{teamMember.name}</h2>
                  <p className="text-gray-400">
                    {teamMember.role === 'coder' 
                      ? teamMember.developerStack?.name
                      : 'Project Lead'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {(teamMember.role === 'coder' 
                    ? teamMember.developerStack?.technologies
                    : teamMember.projectRequirements?.technologies
                  )?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {teamMember.role === 'innovator' && teamMember.projectRequirements && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Project Vision</h3>
                  <p className="text-gray-300">{teamMember.projectRequirements.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(teamMember.performance).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-sm text-gray-400">/ 100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No team member matched yet</p>
            </div>
          )}
        </div>

        {/* Communication Center */}
        <div className="space-y-6">
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Start Chat</span>
              </button>
              <button className="w-full py-3 px-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Video Call</span>
              </button>
              <button className="w-full py-3 px-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4">Collaboration Tools</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/github-icon.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                    />
                    <span className="font-medium">GitHub Repository</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                className="block py-3 px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                    </svg>
                    <span className="font-medium">Discord Channel</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 