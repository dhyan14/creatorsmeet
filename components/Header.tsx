import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-800 border-b border-dark-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl header-glow">
          CreatorsMeet
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
            About Us
          </Link>
          <Link href="/developers" className="text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
            Developers
          </Link>
          <Link href="/contact" className="text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
            Contact Us
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col bg-dark-700 px-4 py-2">
            <Link href="/" className="py-2 text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
              Home
            </Link>
            <Link href="/about" className="py-2 text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
              About Us
            </Link>
            <Link href="/developers" className="py-2 text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
              Developers
            </Link>
            <Link href="/contact" className="py-2 text-gray-200 hover:text-primary-400 hover:glow-text transition-all duration-300">
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 