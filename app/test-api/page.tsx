'use client';

import { useState } from 'react';
import { IconBrain, IconLoader2 } from '@tabler/icons-react';

export default function TestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test-huggingface');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to test API');
      }
      
      setResult(data);
    } catch (err) {
      console.error('Test failed:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <IconBrain className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold">Hugging Face API Test</h1>
        </div>

        <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <button
            onClick={testAPI}
            disabled={isLoading}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <IconLoader2 className="w-5 h-5 animate-spin" />
                <span>Testing API...</span>
              </>
            ) : (
              <span>Test Hugging Face API</span>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <h3 className="font-semibold mb-2">Error:</h3>
              <pre className="whitespace-pre-wrap text-sm">{error}</pre>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">API Test Result:</h3>
              <pre className="whitespace-pre-wrap text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 