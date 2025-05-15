'use client';

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">CreatorsMeet</h3>
            <p className="text-gray-600 mb-6">
              Connecting creative minds with technical talent to build amazing projects together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500">
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-gray-600 hover:text-primary-500">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-gray-600 hover:text-primary-500">
                  For Developers
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-primary-500">
                  Browse Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-primary-500">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CreatorsMeet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 