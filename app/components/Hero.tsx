'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaLightbulb, FaCode, FaArrowRight, FaBrain, FaPuzzlePiece } from 'react-icons/fa';

// Matrix rain effect component
const MatrixRain = () => {
  useEffect(() => {
    // Skip this effect during server-side rendering
    if (typeof window === 'undefined') return;
    
    const container = document.getElementById('matrix-container');
    if (!container) return;
    
    // Create matrix rain characters
    const characters = '01'.split('');
    const createRain = () => {
      const column = document.createElement('div');
      column.className = 'matrix-rain';
      column.style.left = `${Math.random() * 100}%`;
      column.style.animationDuration = `${Math.random() * 5 + 5}s`;
      column.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      
      // Add random characters to column
      let content = '';
      for (let i = 0; i < Math.floor(Math.random() * 15) + 5; i++) {
        content += characters[Math.floor(Math.random() * characters.length)];
      }
      column.textContent = content;
      
      // Remove after animation completes
      container.appendChild(column);
      setTimeout(() => {
        if (column.parentNode === container) {
          container.removeChild(column);
        }
      }, 10000);
    };
    
    // Create rain columns at intervals
    const interval = setInterval(createRain, 300);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);
  
  return <div id="matrix-container" className="matrix-container"></div>;
};

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
    <div className="relative overflow-hidden bg-matrix-rain">
      {/* Matrix rain effect background */}
      <MatrixRain />
      
      {/* Animated glowing orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 opacity-10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tech-accent opacity-10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-matrix-green opacity-5 rounded-full blur-3xl animate-float"></div>
      
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
        <div className="text-center section-animate">
          <div className="inline-block mb-4 relative">
            <span className="px-4 py-1 bg-tech-gray/50 text-tech-accent border border-tech-accent rounded-full text-sm font-semibold tracking-wide shadow-cyber">
              CONNECT • CREATE • COLLABORATE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            <span className="block">Where <span className="cyber-gradient-text">Ideas</span> Meet</span>
            <span className="block"><span className="cyber-gradient-text">Code</span> Expertise</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Connect creative minds with technical talent. Turn brilliant ideas into reality.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3 shiny-border group">
              Get Started <FaArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-matrix text-lg px-8 py-3 group">
              Learn More <FaArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card group animate-on-scroll">
            <div className="card-glow"></div>
            <div className="flex items-center mb-4">
              <div className="bg-tech-dark p-3 rounded-full border border-matrix-green shadow-neon">
                <FaBrain className="h-6 w-6 text-matrix-green" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-white">For Idea Creators</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Have brilliant ideas but lack technical expertise? Find skilled developers to bring your vision to life.
            </p>
            <Link href="/creators" className="flex items-center text-tech-accent hover:text-matrix-green font-medium group transition-colors duration-300">
              Join as Creator <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="card group animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="card-glow"></div>
            <div className="flex items-center mb-4">
              <div className="bg-tech-dark p-3 rounded-full border border-tech-accent shadow-cyber">
                <FaPuzzlePiece className="h-6 w-6 text-tech-accent" />
              </div>
              <h2 className="ml-4 text-2xl font-bold text-white">For Developers</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Skilled in coding but searching for inspiring projects? Connect with creative minds to work on innovative ideas.
            </p>
            <Link href="/developers" className="flex items-center text-tech-accent hover:text-matrix-green font-medium group transition-colors duration-300">
              Join as Developer <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 