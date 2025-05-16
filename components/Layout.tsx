import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen dark-radial-bg">
      <div className="green-glow-point before:top-[30%] before:left-[10%] before:opacity-70 hidden md:block"></div>
      <div className="green-glow-point before:top-[80%] before:right-[15%] before:opacity-50 hidden md:block"></div>
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 