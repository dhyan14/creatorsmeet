'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLaptopCode, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-tech-dark/90 backdrop-blur-md shadow-lg" : "bg-tech-dark"
    } border-b border-tech-light`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <FaLaptopCode className="h-8 w-8 text-tech-accent animate-pulse-glow" />
                <div className="absolute inset-0 bg-tech-accent rounded-full blur-md opacity-30 animate-pulse-glow"></div>
              </div>
              <span className="ml-2 text-white font-bold text-xl">
                <span className="gradient-text">Creators</span>Meet
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                href="/about"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-tech-light/30 transition-all"
              >
                About
              </Link>
              <Link 
                href="/creators"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-tech-light/30 transition-all"
              >
                Creators
              </Link>
              <Link 
                href="/developers"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-tech-light/30 transition-all"
              >
                Developers
              </Link>
              <Link 
                href="/login"
                className="btn-secondary text-sm shiny-border"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="btn-primary text-sm shiny-border"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/about"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-tech-light/30 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/creators"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-tech-light/30 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Creators
            </Link>
            <Link
              href="/developers"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-tech-light/30 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Developers
            </Link>
            <div className="flex flex-col space-y-2 mt-4 px-3 py-2">
              <Link
                href="/login"
                className="btn-secondary text-center shiny-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-center shiny-border"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 