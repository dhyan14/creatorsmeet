'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'idea' | 'analysis' | 'registration'>('idea');
  const [projectIdea, setProjectIdea] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    role: 'innovator',
    projectRequirements: {
      description: '',
      technologies: [],
      preferredStack: ''
    },
    developerStack: {
      name: '',
      technologies: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisResults, setAnalysisResults] = useState<{
    technologies: Array<{ name: string; confidence: number }>;
    potentialMatches?: Array<{ id: string; name: string; technologies: string[] }>;
  } | null>(null);

  const analyzeIdea = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'innovator',
          projectRequirements: {
            description: projectIdea
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze project');
      }

      setAnalysisResults(data);
      setStep('analysis');
      setFormData(prev => ({
        ...prev,
        projectRequirements: {
          ...prev.projectRequirements,
          description: projectIdea,
          technologies: data.technologies.map((tech: { name: string }) => tech.name)
        }
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze project');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {step === 'idea' ? 'Describe Your Project' : 
             step === 'analysis' ? 'Project Analysis' : 
             'Create Your Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {step === 'registration' && (
              <>
                Or{' '}
                <Link href="/signin" className="font-medium text-purple-500 hover:text-purple-400">
                  sign in to your account
                </Link>
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 'idea' && (
          <div className="space-y-6">
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <textarea
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                placeholder="Describe your project idea in detail. Include features, target users, and any specific requirements..."
                className="w-full h-40 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                required
              />
              <button
                onClick={analyzeIdea}
                disabled={loading || !projectIdea.trim()}
                className="mt-4 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Analyzing...' : 'Analyze Project'}
              </button>
            </div>
          </div>
        )}

        {step === 'analysis' && analysisResults && (
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Project Analysis Results</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Recommended Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tech.name} ({Math.round(tech.confidence * 100)}%)
                      </span>
                    ))}
                  </div>
                </div>

                {analysisResults.potentialMatches && analysisResults.potentialMatches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Available Team Members</h4>
                    <div className="space-y-2">
                      {analysisResults.potentialMatches.map((coder) => (
                        <div
                          key={coder.id}
                          className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
                        >
                          <div>
                            <p className="text-white font-medium">{coder.name}</p>
                            <p className="text-sm text-gray-400">
                              {coder.technologies.join(' • ')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep('registration')}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  Continue with Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'registration' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  autoComplete="name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  autoComplete="email"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  autoComplete="country"
                />
              </div>

              <div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  required
                >
                  <option value="innovator">Innovator</option>
                  <option value="coder">Coder</option>
                </select>
              </div>

              {formData.role === 'innovator' && (
                <div>
                  <textarea
                    name="projectRequirements.description"
                    placeholder="Describe your project idea"
                    value={formData.projectRequirements.description}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      projectRequirements: {
                        ...prev.projectRequirements,
                        description: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    rows={4}
                  />
                </div>
              )}

              {formData.role === 'coder' && (
                <div>
                  <input
                    type="text"
                    name="developerStack.name"
                    placeholder="Your tech stack name (e.g., MERN, MEAN)"
                    value={formData.developerStack.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      developerStack: {
                        ...prev.developerStack,
                        name: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 