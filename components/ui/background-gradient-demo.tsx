"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";

export default function BackgroundGradientDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <BackgroundGradient className="rounded-[22px] max-w-md p-6 bg-white dark:bg-zinc-900">
        <div className="flex items-center space-x-4 mb-6">
          <IconAppWindow className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold text-black dark:text-white">Featured Project</h2>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Creators Meet Platform
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-300">
            A revolutionary platform connecting visionary idea creators with skilled developers. 
            Build the next generation of innovative solutions together.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
              Next.js
            </span>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
              TypeScript
            </span>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300 rounded-full">
              Tailwind CSS
            </span>
          </div>
          
          <div className="pt-4">
            <button className="w-full rounded-full px-6 py-3 text-white flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors">
              <span>Learn More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
} 