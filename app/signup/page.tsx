'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock, FaUser, FaCode, FaLightbulb } from 'react-icons/fa';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('creator'); // 'creator' or 'developer'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Signup attempt with:', { name, email, password, userType });
    alert('Signup functionality would be implemented in a real application');
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-md mx-auto my-16 px-4 pt-16">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Join CreatorsMeet</h1>
            <p className="text-gray-600 mt-2">Create your account and start connecting</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-full pl-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-full pl-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 w-full pl-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`flex items-center justify-center py-3 px-4 rounded-md border ${
                    userType === 'creator' 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setUserType('creator')}
                >
                  <FaLightbulb className="mr-2" />
                  Creator
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center py-3 px-4 rounded-md border ${
                    userType === 'developer' 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setUserType('developer')}
                >
                  <FaCode className="mr-2" />
                  Developer
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-primary-500 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-600 transition-colors w-full"
            >
              Create Account
            </button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 