import React from 'react';
import { IconBrain, IconCode, IconGauge } from '@tabler/icons-react';

interface ProjectRequirementsProps {
  description?: string;
  technologies?: string[];
  complexity?: string;
  expertise?: string;
}

export default function ProjectRequirements({
  description,
  technologies = [],
  complexity,
  expertise,
}: ProjectRequirementsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Project Requirements</h2>
      
      <div className="space-y-4">
        {description && (
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3">Project Description</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        )}

        {technologies.length > 0 && (
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <IconCode className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Required Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complexity && (
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <IconGauge className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white">Project Complexity</h3>
              </div>
              <p className="text-gray-300">{complexity}</p>
            </div>
          )}

          {expertise && (
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <IconBrain className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-white">Required Expertise</h3>
              </div>
              <p className="text-gray-300">{expertise}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 