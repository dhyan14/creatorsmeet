'use client';

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Image from 'next/image';
import { FaCode, FaLightbulb, FaUsers, FaRocket, FaComment } from 'react-icons/fa';

export default function Home() {
  // Add scroll animation functionality
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Add padding to account for the fixed navbar */}
      <div className="pt-16">
        <Hero />
      </div>
      
      <section className="bg-tech-gray py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-tech-accent opacity-5 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, transparent 49px, #00ff9d 50px, #00ff9d 51px, transparent 51px), linear-gradient(to bottom, transparent 49px, #00ff9d 50px, #00ff9d 51px, transparent 51px)',
             backgroundSize: '50px 50px'
           }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 section-animate">
            <h2 className="text-3xl font-bold text-white">How It <span className="gradient-text">Works</span></h2>
            <p className="mt-4 text-xl text-gray-300">Connecting ideas and skills has never been easier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center animate-on-scroll">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6 animate-pulse-glow glow">
                <span className="text-2xl font-bold text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create a Profile</h3>
              <p className="text-gray-300">
                Sign up and tell us whether you're a creator with ideas or a developer with coding skills.
              </p>
            </div>
            
            <div className="card text-center animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6 animate-pulse-glow glow" style={{ animationDelay: '0.3s' }}>
                <span className="text-2xl font-bold text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
              <p className="text-gray-300">
                Browse profiles, project ideas, or post your own. Use our matching system to find the perfect partner.
              </p>
            </div>
            
            <div className="card text-center animate-on-scroll" style={{ animationDelay: '0.4s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900 mb-6 animate-pulse-glow glow" style={{ animationDelay: '0.6s' }}>
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
      
      <section className="bg-tech-dark py-16 relative overflow-hidden">
        {/* Animated code-like background */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div className="code-animation text-xs text-tech-accent opacity-30">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="code-line" style={{ animationDelay: `${i * 0.1}s` }}>
                {`function connect(creator, developer) {`}
                {`  const project = new Project(creator.idea, developer.skills);`}
                {`  return project.launch();`}
                {`}`}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 section-animate">
            <h2 className="text-3xl font-bold text-white">Success <span className="gradient-text">Stories</span></h2>
            <p className="mt-4 text-xl text-gray-300">Projects that started with a connection on CreatorsMeet</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card glass-effect animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-tech-accent animate-pulse-glow"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">EcoTracker App</h3>
                  <p className="text-gray-400">Sarah (Creator) & Amit (Developer)</p>
                </div>
              </div>
              <p className="text-gray-300 relative">
                <FaComment className="text-primary-500 opacity-10 absolute top-0 left-0 -translate-x-2 -translate-y-4 w-8 h-8" />
                "I had an idea for an app that helps people track their carbon footprint, but no technical skills. Through CreatorsMeet, I connected with Amit who helped turn my vision into reality."
              </p>
              
              <div className="mt-4 flex space-x-2">
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full">Mobile App</span>
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full">Sustainability</span>
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full">React Native</span>
              </div>
            </div>
            
            <div className="card glass-effect animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-tech-accent animate-pulse-glow" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">FoodShare Platform</h3>
                  <p className="text-gray-400">Miguel (Creator) & Jenna (Developer)</p>
                </div>
              </div>
              <p className="text-gray-300 relative">
                <FaComment className="text-primary-500 opacity-10 absolute top-0 left-0 -translate-x-2 -translate-y-4 w-8 h-8" />
                "As a restaurant owner, I wanted a platform to donate excess food to shelters. I met Jenna who was looking for meaningful projects, and together we built FoodShare which now serves 50+ locations."
              </p>
              
              <div className="mt-4 flex space-x-2 flex-wrap">
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full mb-2">Web Platform</span>
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full mb-2">Social Impact</span>
                <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded-full mb-2">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-br from-tech-dark via-tech-gray to-tech-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-animate">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to <span className="gradient-text">Connect</span>?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our community of creators and developers today. Turn ideas into reality.
            </p>
            <a href="/signup" className="btn-primary text-lg px-10 py-4 shiny-border">
              Get Started Now
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 