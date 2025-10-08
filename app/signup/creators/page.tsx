'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from '@/app/components/LanguageSelector';
import TechnologySelector from '@/app/components/TechnologySelector';

const roleOptions = [
  { id: 'innovator', label: 'Innovator', description: 'I have ideas to bring to life' },
  { id: 'coder', label: 'Coder', description: 'I can help build amazing projects' }
];

interface DeveloperStack {
  name: string;
  technologies: string[];
}

interface ProjectRequirements {
  description: string;
  technologies: string[];
  preferredStack: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  country: string;
  developerStack: DeveloperStack | null;
  projectRequirements: ProjectRequirements | null;
}

export default function CreatorSignup() {
  const [role, setRole] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    country: '',
    developerStack: null,
    projectRequirements: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStackSelect = (stack: { name: string; technologies: string[] }) => {
    setFormData({
      ...formData,
      developerStack: stack
    });
  };

  const handleProjectRequirements = (requirements: { description: string; technologies: string[]; preferredStack: string }) => {
    setFormData({
      ...formData,
      projectRequirements: requirements
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep === 1) {
      if (!role) {
        alert('Please select a role');
        return;
      }
      setFormStep(2);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role,
        }),
      });

      if (response.ok) {
        // Redirect to dashboard or show success message
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-md mx-auto">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/signup-select" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/logo.png"
                alt="CreatorsMeet Logo"
                width={70}
                height={70}
                className="rounded-xl mb-4 mx-auto"
              />
            </motion.div>
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-gradient mb-3">
            Join as a Creator
          </h1>
          <p className="text-gray-400">
            Start your journey of innovation with us
          </p>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative glass-effect bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        
          <form onSubmit={handleSubmit} className="space-y-4">
            {formStep === 1 ? (
              <>
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all"
                        required
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                      placeholder="Create a secure password"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    I am a
                  </label>
                  {roleOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 border rounded-xl cursor-pointer transition-all duration-200 ${
                        role === option.id
                          ? 'border-purple-500 bg-gradient-to-r from-purple-500/10 to-pink-500/10 shadow-lg shadow-purple-500/20'
                          : 'border-white/10 hover:border-purple-500/30 bg-black/20'
                      }`}
                      onClick={() => setRole(option.id)}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">
                            {option.label}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {option.description}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          role === option.id
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-500'
                        }`}>
                          {role === option.id && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {role === 'coder' ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Select Your Technologies</h2>
                    <p className="text-gray-400 text-sm">Choose the technologies you're proficient in</p>
                    <TechnologySelector 
                      onTechnologySelect={(technologies) => {
                        setFormData({
                          ...formData,
                          developerStack: {
                            name: 'Custom Stack',
                            technologies
                          }
                        });
                      }} 
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Tell Us About Your Project</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Project Description
                      </label>
                      <textarea
                        className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                        rows={4}
                        placeholder="Describe your project idea and requirements..."
                        onChange={(e) => handleProjectRequirements({
                          description: e.target.value,
                          technologies: [],
                          preferredStack: ''
                        })}
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              {formStep === 1 ? (
                <>
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                <>
                  Create Account
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {formStep === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all"
                >
                  <Image
                    src="/google-icon.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Google</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all"
                >
                  <Image
                    src="/github-icon.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                  />
                  <span>GitHub</span>
                </motion.button>
              </div>

              <p className="mt-6 text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 