'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from '@/app/components/LanguageSelector';

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
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="CreatorsMeet Logo"
              width={60}
              height={60}
              className="rounded-xl mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Join as a Creator
          </h1>
          <p className="text-gray-400 mt-2">
            Start your journey of innovation with us
          </p>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {formStep === 1 ? (
              <>
                {/* Basic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-200">
                    I am a
                  </label>
                  {roleOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        role === option.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setRole(option.id)}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">
                            {option.label}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {option.description}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          role === option.id
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-white/30'
                        }`}>
                          {role === option.id && (
                            <svg
                              className="w-full h-full text-white p-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {role === 'coder' ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Select Your Tech Stack</h2>
                    <LanguageSelector onStackSelect={handleStackSelect} />
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

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
            >
              {formStep === 1 ? 'Continue' : 'Create Account'}
            </button>
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

              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200">
                  <Image
                    src="/google-icon.svg"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                  <span>Continue with Google</span>
                </button>
                <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200">
                  <Image
                    src="/github-icon.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                  />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              <p className="mt-6 text-center text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/signin/creators"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 