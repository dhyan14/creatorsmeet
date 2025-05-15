




'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, className, children, onClick = () => {} }: NavLinkProps) => (
  <Link 
    href={href}
    className={`${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      scrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaCode className="h-5 w-5 text-primary-500" />
              <span className="ml-2 font-bold text-xl">
                CreatorsMeet
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink 
                href="/about"
                className="text-gray-600 hover:text-primary-500 px-3 py-2 text-sm font-medium"
              >
                About
              </NavLink>
              <NavLink 
                href="/creators"
                className="text-gray-600 hover:text-primary-500 px-3 py-2 text-sm font-medium"
              >
                Creators
              </NavLink>
              <NavLink 
                href="/developers"
                className="text-gray-600 hover:text-primary-500 px-3 py-2 text-sm font-medium"
              >
                Developers
              </NavLink>
              <Link 
                href="/login"
                className="text-gray-600 hover:text-primary-500 px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              href="/about"
              className="text-gray-600 hover:text-primary-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              href="/creators"
              className="text-gray-600 hover:text-primary-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Creators
            </NavLink>
            <NavLink
              href="/developers"
              className="text-gray-600 hover:text-primary-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Developers
            </NavLink>
            <div className="flex flex-col space-y-2 mt-4 px-3 py-2">
              <Link
                href="/login"
                className="text-gray-600 hover:text-primary-500 block py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary-500 text-white px-4 py-2 rounded-md text-base font-medium text-center"
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