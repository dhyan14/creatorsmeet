import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <section className="bg-tech-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-300">Connecting ideas and skills has never been easier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6">
                <span className="text-2xl font-bold text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create a Profile</h3>
              <p className="text-gray-300">
                Sign up and tell us whether you're a creator with ideas or a developer with coding skills.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6">
                <span className="text-2xl font-bold text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
              <p className="text-gray-300">
                Browse profiles, project ideas, or post your own. Use our matching system to find the perfect partner.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6">
                <span className="text-2xl font-bold text-primary-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collaborate</h3>
              <p className="text-gray-300">
                Use our platform to communicate, share resources, and bring your project to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-tech-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-300">Projects that started with a connection on CreatorsMeet</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-tech-accent"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">EcoTracker App</h3>
                  <p className="text-gray-400">Sarah (Creator) & Amit (Developer)</p>
                </div>
              </div>
              <p className="text-gray-300">
                "I had an idea for an app that helps people track their carbon footprint, but no technical skills. Through CreatorsMeet, I connected with Amit who helped turn my vision into reality."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-tech-accent"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">FoodShare Platform</h3>
                  <p className="text-gray-400">Miguel (Creator) & Jenna (Developer)</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As a restaurant owner, I wanted a platform to donate excess food to shelters. I met Jenna who was looking for meaningful projects, and together we built FoodShare which now serves 50+ locations."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 