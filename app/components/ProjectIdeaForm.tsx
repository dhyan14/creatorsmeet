'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock icons to avoid dependency on @tabler/icons-react
const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconLoader2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Simple router mock to avoid next/navigation dependency
const useRouter = () => ({
  push: (path: string) => window.location.href = path,
  refresh: () => window.location.reload(),
});

interface ProjectIdeaFormProps {
  onAnalysisComplete?: (analysis: {
    technologies: Array<{ name: string; confidence: number }>;
    complexity: string;
    expertise: string;
  }, description: string) => void;
}

export default function ProjectIdeaForm({ onAnalysisComplete }: ProjectIdeaFormProps) {
  const [projectIdea, setProjectIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null as string | null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('Submitting project idea...');
      // First, analyze the project
      const analysisResponse = await fetch('/api/project/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectIdea: projectIdea,
        }),
      });

      const result = await analysisResponse.json();
      console.log('Analysis response:', result);

      if (!analysisResponse.ok) {
        console.error('Error response:', result);
        throw new Error(result.error || 'Failed to analyze project requirements');
      }

      if (!result.technologies || !Array.isArray(result.technologies)) {
        console.error('Invalid response format:', result);
        throw new Error('Invalid response from server: missing or invalid technologies');
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(result, projectIdea);
      } else {
        // Update project requirements with analysis results
        const updateResponse = await fetch('/api/user/update-requirements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: projectIdea,
            technologies: result.technologies.map((tech: any) => tech.name),
            complexity: result.complexity,
            expertise: result.expertise,
            preferredStack: result.technologies[0]?.name || '',
          }),
        });

        if (!updateResponse.ok) {
          const updateError = await updateResponse.json();
          throw new Error(updateError.message || 'Failed to save project requirements');
        }

        router.refresh(); // Refresh the current page data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for refresh
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Project analysis error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing your project');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
          <IconBrain className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold">Describe Your Project Idea</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={projectIdea}
            onChange={(e: { target: { value: string } }) => setProjectIdea(e.target.value)}
            placeholder="Describe your project idea in detail. Include features, target users, and any specific requirements..."
            className="w-full h-40 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? (
            <>
              <IconLoader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Project...</span>
            </>
          ) : (
            <span>Analyze Project</span>
          )}
        </motion.button>

        <p className="text-sm text-gray-400 text-center">
          Our AI will analyze your idea to recommend technologies and find the perfect team.
        </p>
      </form>
    </div>
  );
} 