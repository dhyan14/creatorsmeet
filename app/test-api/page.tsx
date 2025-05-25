'use client';

import { useState } from 'react';

export default function TestAPI() {
  const [projectIdea, setProjectIdea] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call the analysis endpoint directly
      const response = await fetch('/api/project/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectIdea }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const data = await response.json();
      setResult(data);
      console.log('Analysis result:', data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Hugging Face API Analysis</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white"
              placeholder="Enter your project description here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Project'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Required Technologies</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {result.technologies?.map((tech: any) => (
                    <li key={tech.name} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <span>{tech.name}</span>
                      <span className="text-purple-400">{(tech.confidence * 100).toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Project Complexity</h3>
                <p className="bg-gray-700 p-2 rounded">{result.complexity}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Required Expertise</h3>
                <p className="bg-gray-700 p-2 rounded">{result.expertise}</p>
              </div>

              <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Raw Response</h3>
                <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 