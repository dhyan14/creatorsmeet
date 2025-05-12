'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLaptopCode, FaBars, FaTimes, FaCode } from 'react-icons/fa';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, className, children, onClick = () => {} }: NavLinkProps) => (
  <Link 
    href={href}
    className={`${className} relative group overflow-hidden`}
    onClick={onClick}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-matrix-green group-hover:w-full transition-all duration-300"></span>
  </Link>
);

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
      scrolled ? "bg-tech-dark/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    } border-b border-tech-accent/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 flex items-center justify-center bg-tech-dark border border-matrix-green rounded-md shadow-neon group-hover:shadow-neon-strong transition-all duration-300">
                  <FaCode className="h-6 w-6 text-matrix-green" />
                </div>
              </div>
              <span className="ml-2 text-white font-bold text-xl">
                <span className="cyber-gradient-text">Creators</span>Meet
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <NavLink 
                href="/about"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                About
              </NavLink>
              <NavLink 
                href="/creators"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Creators
              </NavLink>
              <NavLink 
                href="/developers"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Developers
              </NavLink>
              <Link 
                href="/login"
                className="btn-secondary text-sm shadow-cyber"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="btn-matrix text-sm"
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
        <div className="md:hidden glass-effect border-t border-tech-accent/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              href="/about"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              href="/creators"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Creators
            </NavLink>
            <NavLink
              href="/developers"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Developers
            </NavLink>
            <div className="flex flex-col space-y-2 mt-4 px-3 py-2">
              <Link
                href="/login"
                className="btn-secondary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-matrix text-center"
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