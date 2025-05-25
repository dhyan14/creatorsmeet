import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrain, IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
            onChange={(e) => setProjectIdea(e.target.value)}
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