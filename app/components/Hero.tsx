'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Where Ideas Meet Code Expertise
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Connect creative minds with technical talent. Turn brilliant ideas into reality.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="bg-primary-500 text-white px-8 py-3 rounded-md font-medium inline-flex items-center">
              Get Started <FaArrowRight className="ml-2" />
            </Link>
            <Link href="/about" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium inline-flex items-center">
              Learn More <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Idea Creators</h2>
            <p className="text-gray-600 mb-4">
              Have brilliant ideas but lack technical expertise? Find skilled developers to bring your vision to life.
            </p>
            <Link href="/creators" className="text-primary-500 font-medium inline-flex items-center">
              Join as Creator <FaArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Developers</h2>
            <p className="text-gray-600 mb-4">
              Skilled in coding but searching for inspiring projects? Connect with creative minds to work on innovative ideas.
            </p>
            <Link href="/developers" className="text-primary-500 font-medium inline-flex items-center">
              Join as Developer <FaArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 