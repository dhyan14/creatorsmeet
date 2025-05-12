'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaLightbulb, FaCode, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  // Add animation triggers on scroll
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
    <div className="relative overflow-hidden">
      {/* Animated glowing orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600 opacity-10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tech-accent opacity-10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-400 opacity-5 rounded-full blur-3xl animate-float"></div>
      
      {/* Background grid effect - subtle tech pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #00ff9d 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="text-center section-animate">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            <span className="block">Where <span className="gradient-text">Ideas</span> Meet</span>
            <span className="block"><span className="gradient-text">Code</span> Expertise</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Connect creative minds with technical talent. Turn brilliant ideas into reality.
          </p>
          
          <div className="mt-10 flex justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3 mr-4 shiny-border">
              Get Started
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-3 shiny-border">
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card group hover:border-primary-500 transition-colors glow animate-on-scroll">
            <div className="flex items-center mb-4">
              <div className="bg-primary-900 p-3 rounded-full animate-pulse-glow">
                <FaLightbulb className="h-6 w-6 text-primary-400" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-white">For Idea Creators</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Have brilliant ideas but lack technical expertise? Find skilled developers to bring your vision to life.
            </p>
            <Link href="/creators" className="flex items-center text-primary-400 hover:text-primary-300 font-medium group">
              Join as Creator <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="card group hover:border-tech-accent transition-colors glow animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <div className="bg-tech-gray p-3 rounded-full border border-tech-accent animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                <FaCode className="h-6 w-6 text-tech-accent" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-white">For Developers</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Skilled in coding but searching for inspiring projects? Connect with creative minds to work on innovative ideas.
            </p>
            <Link href="/developers" className="flex items-center text-tech-accent hover:text-green-300 font-medium group">
              Join as Developer <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 