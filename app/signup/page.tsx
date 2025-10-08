'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Animated Orbs */}
      <motion.div
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"
      />
      <motion.div
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[120px] animate-pulse"
        transition={{ delay: 0.5 }}
      />
      <motion.div
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px]"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full relative z-10"
      >
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative glass-effect bg-black/40 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md opacity-50" />
                    <Image
                      src="/logo.png"
                      alt="CreatorsMeet Logo"
                      width={70}
                      height={70}
                      className="mx-auto rounded-xl relative z-10"
                    />
                  </div>
                </motion.div>
              </Link>
              
              <motion.h2 
                className="mt-6 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {step === 'idea' ? '✨ Describe Your Vision' : 
                 step === 'analysis' ? '🎯 AI Analysis Results' : 
                 '🚀 Create Your Account'}
              </motion.h2>
              
              <motion.p 
                className="mt-3 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {step === 'registration' && (
                  <>
                    Already have an account?{' '}
                    <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      Sign in
                    </Link>
                  </>
                )}
                {step === 'idea' && 'Let AI analyze your idea and match you with the perfect team'}
              </motion.p>
            </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm flex items-center gap-3 mb-6"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          {step === 'idea' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Idea
                </label>
                <textarea
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  placeholder="Describe your project idea in detail. Include features, target users, and any specific requirements..."
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzeIdea}
                disabled={loading || !projectIdea.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Analyze with AI
                  </>
                )}
              </motion.button>
            </div>
          )}

          {step === 'analysis' && analysisResults && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Analysis Complete!</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">Recommended Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.technologies.map((tech) => (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium"
                        >
                          {tech.name} ({Math.round(tech.confidence * 100)}%)
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {analysisResults.potentialMatches && analysisResults.potentialMatches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Potential Team Members</h4>
                      <div className="space-y-2">
                        {analysisResults.potentialMatches.map((coder, index) => (
                          <motion.div
                            key={coder.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg hover:border-purple-500/30 transition-all"
                          >
                            <div>
                              <p className="text-white font-semibold">{coder.name}</p>
                              <p className="text-sm text-gray-400 mt-1">
                                {coder.technologies.join(' • ')}
                              </p>
                            </div>
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('registration')}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                  >
                    Continue to Registration
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {step === 'registration' && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United States"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                    autoComplete="country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all"
                  required
                >
                  <option value="innovator">Innovator (I have an idea)</option>
                  <option value="coder">Developer (I can code)</option>
                </select>
              </div>

              {formData.role === 'innovator' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Idea</label>
                  <textarea
                    name="projectRequirements.description"
                    placeholder="Describe your project idea..."
                    value={formData.projectRequirements.description}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      projectRequirements: {
                        ...prev.projectRequirements,
                        description: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all resize-none"
                    rows={4}
                  />
                </div>
              )}

              {formData.role === 'coder' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack</label>
                  <input
                    type="text"
                    name="developerStack.name"
                    placeholder="e.g., MERN, MEAN, React/Node.js"
                    value={formData.developerStack.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      developerStack: {
                        ...prev.developerStack,
                        name: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                  />
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          )}
          </div>
        </motion.div>

        <p className="text-center text-gray-500 text-xs mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
} 