import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrain, IconLoader2 } from '@tabler/icons-react';

interface ProjectIdeaFormProps {
  onAnalysisComplete: (analysis: {
    technologies: Array<{ name: string; confidence: number }>;
    complexity: string;
    expertise: string;
  }) => void;
}

export default function ProjectIdeaForm({ onAnalysisComplete }: ProjectIdeaFormProps) {
  const [projectIdea, setProjectIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/project/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectIdea }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze project');
      }

      const analysis = await response.json();
      onAnalysisComplete(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
            onChange={(e) => setProjectIdea(e.target.value)}
            placeholder="Describe your project idea in detail. Include features, target users, and any specific requirements..."
            className="w-full h-40 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
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