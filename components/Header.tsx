import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-800 border-b border-dark-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl header-glow">Creative Developer</span>
        </div>
        
        {/* Mobile menu button - keeping this for mobile layout */}
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
      </div>
      
      {/* Mobile Navigation - only showing bio on mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-dark-700 px-4 py-4 text-gray-300">
            <p className="mb-4">
              Hi, I'm Dhyan Jain— a B.Tech student at UCP Institute of Technology who writes code that (usually) works.
            </p>
            <p>
              I specialize in crafting modern web and mobile applications using JavaScript, React, Node.js, and MongoDB. From backend logic to user-friendly interfaces, I enjoy turning ideas into functional, full-stack solutions. Let's build something cool together.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 