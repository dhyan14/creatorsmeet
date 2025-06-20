'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SignupSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Sign Up As</h2>
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
      </div>
    </div>
  );
} 