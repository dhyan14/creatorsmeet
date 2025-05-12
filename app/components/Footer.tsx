'use client';

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaLaptopCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-tech-dark border-t border-tech-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-600 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-tech-accent opacity-5 rounded-full blur-3xl"></div>
      
      <div className="absolute inset-0 opacity-5" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #00ff9d 1px, transparent 1px)', 
             backgroundSize: '30px 30px',
             backgroundPosition: '0 0'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative">
                <FaLaptopCode className="h-6 w-6 text-tech-accent animate-pulse-glow" />
                <div className="absolute inset-0 bg-tech-accent rounded-full blur-sm opacity-30 animate-pulse-glow"></div>
              </div>
              <h3 className="ml-2 text-white text-lg font-bold">
                <span className="gradient-text">Creators</span>Meet
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting creative minds with technical talent to build amazing projects together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 hover:scale-110 transform">
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-md font-semibold mb-4 inline-block relative">
              Platform
              <span className="absolute bottom-0 left-0 w-0 border-b-2 border-primary-500 group-hover:w-full transition-all duration-300 h-0.5"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  For Developers
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  Browse Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-md font-semibold mb-4 inline-block relative">
              Resources
              <span className="absolute bottom-0 left-0 w-0 border-b-2 border-tech-accent group-hover:w-full transition-all duration-300 h-0.5"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-tech-accent rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-tech-accent rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-tech-accent rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center">
                  <span className="w-1.5 h-1.5 bg-tech-accent rounded-full mr-2 opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-tech-light">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} <span className="gradient-text">CreatorsMeet</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 