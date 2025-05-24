'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const roleOptions = [
  { id: 'innovator', label: 'Innovator', description: 'I have ideas to bring to life' },
  { id: 'coder', label: 'Coder', description: 'I can help build amazing projects' }
];

export default function CreatorSignup() {
  const [role, setRole] = useState('');

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
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Country
              </label>
              <select
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                required
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                {/* Add more countries as needed */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Continue with Google</span>
            </button>
            <button
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200"
            >
              <Image
                src="/github-icon.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 