'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { FaCode, FaLightbulb, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Add padding to account for the fixed navbar */}
      <div className="pt-16">
        <Hero />
      </div>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Connecting ideas and skills has never been easier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-6">
                <span className="text-xl font-bold text-primary-500">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create a Profile</h3>
              <p className="text-gray-600">
                Sign up and tell us whether you're a creator with ideas or a developer with coding skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-6">
                <span className="text-xl font-bold text-primary-500">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600">
                Browse profiles, project ideas, or post your own. Use our matching system to find the perfect partner.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-6">
                <span className="text-xl font-bold text-primary-500">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborate</h3>
              <p className="text-gray-600">
                Use our platform to communicate, share resources, and bring your project to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-600">Projects that started with a connection on CreatorsMeet</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">EcoTracker App</h3>
                  <p className="text-gray-600">Sarah (Creator) & Amit (Developer)</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I had an idea for an app that helps people track their carbon footprint, but no technical skills. Through CreatorsMeet, I connected with Amit who helped turn my vision into reality."
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Mobile App</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Sustainability</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">React Native</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">FoodShare Platform</h3>
                  <p className="text-gray-600">Miguel (Creator) & Jenna (Developer)</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a restaurant owner, I wanted a platform to donate excess food to shelters. I met Jenna who was looking for meaningful projects, and together we built FoodShare which now serves 50+ locations."
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Web Platform</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Social Impact</span>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Connect?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of creators and developers today. Turn ideas into reality.
          </p>
          <a href="/signup" className="bg-primary-500 text-white px-8 py-3 rounded-md font-medium">
            Get Started Now
          </a>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 