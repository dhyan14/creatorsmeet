'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Back button */}
        <Link 
          href="/" 
          className="absolute -top-12 left-0 text-white/70 hover:text-white flex items-center gap-2 transition-colors"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="CreatorsMeet Logo"
              width={60}
              height={60}
              className="mx-auto rounded-xl mb-4"
            />
          </Link>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Sign Up As</h2>
          <p className="text-gray-400 text-sm mb-8">Choose how you want to join CreatorsMeet</p>
        </div>

        {/* Sign up options */}
        <div className="flex flex-col gap-6">
          <button
            className="w-full py-6 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            onClick={() => router.push('/signup/creators')}
          >
            Creator
          </button>
          <button
            className="w-full py-6 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-xl font-semibold shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all opacity-60 cursor-not-allowed"
            disabled
          >
            Mentor (Coming Soon)
          </button>
          <button
            className="w-full py-6 px-4 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-xl text-xl font-semibold shadow-lg hover:from-green-700 hover:to-lime-700 transition-all opacity-60 cursor-not-allowed"
            disabled
          >
            Company (Coming Soon)
          </button>
        </div>

        {/* Sign in link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/signin/creators" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 