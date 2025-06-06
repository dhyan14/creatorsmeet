"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Simple router mock to avoid next/navigation dependency
const useRouter = () => ({
  push: (path: string) => window.location.href = path,
  refresh: () => window.location.reload(),
});

// Simple icon component that accepts children and className
const Icon: React.FC<{ children?: React.ReactNode; className?: string }> = ({ 
  children = null, 
  className = '' 
}) => (
  <div className={cn("h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200", className)}>
    {children}
  </div>
);

export default function CreatorsSidebar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        window.location.href = '/';
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Define the type for navigation links
  interface NavLink {
    label: string;
    href: string;
    icon: React.ReactNode;
    id: string;
  }

  // Navigation links with proper icons
  const navLinks: NavLink[] = [
    { 
      label: "Home", 
      href: "/dashboard", 
      icon: <span>H</span>, 
      id: "home" 
    },
    { 
      label: "Profile", 
      href: "/profile", 
      icon: <span>P</span>, 
      id: "profile" 
    },
    { 
      label: "Messages", 
      href: "/messages", 
      icon: <span>M</span>, 
      id: "messages" 
    },
    { 
      label: "Projects", 
      href: "/projects", 
      icon: <span>P</span>, 
      id: "projects" 
    },
    { 
      label: "Code Editor", 
      href: "/editor", 
      icon: <span>C</span>, 
      id: "editor" 
    },
    { 
      label: "Settings", 
      href: "/settings", 
      icon: <span>S</span>, 
      id: "settings" 
    },
  ];

  // Define the type for the logout button
  interface LogoutButton {
    label: string;
    onClick: () => void;
    icon: React.ReactNode;
    id: string;
  }

  // Logout button
  const logoutButton: LogoutButton = {
    label: isLoggingOut ? "Logging out..." : "Logout",
    onClick: handleLogout,
    icon: <span className={isLoggingOut ? 'animate-pulse' : ''}>←</span>,
    id: 'logout'
  };

  // Define the SidebarLink component with proper typing
  const SidebarLink = ({ item }: { item: NavLink | LogoutButton }) => {
    // Type guard to check if the item is a NavLink
    const isNavLink = (item: NavLink | LogoutButton): item is NavLink => {
      return 'href' in item;
    };

    if (isNavLink(item)) {
      return (
        <a 
          href={item.href}
          className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
          title={item.label}
        >
          <Icon>{item.icon}</Icon>
        </a>
      );
    } else {
      return (
        <button
          onClick={item.onClick}
          className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center w-full"
          title={item.label}
          disabled={isLoggingOut}
        >
          <Icon>{item.icon}</Icon>
        </button>
      );
    }
  };

  return (
    <div className="h-screen">
      <div className="fixed left-0 top-0 h-full w-16 bg-neutral-100 dark:bg-neutral-800 p-4 flex flex-col items-center">
        <div className="mb-8">
          {open ? <Logo /> : <LogoIcon />}
        </div>
        
        <nav className="flex-1 flex flex-col items-center space-y-4">
          {navLinks.map((item) => (
            <div key={item.id} className="w-full">
              <SidebarLink item={item} />
            </div>
          ))}
        </nav>
        
        <div className="w-full">
          <SidebarLink item={logoutButton} />
        </div>
      </div>
    </div>
  );
}

interface LogoProps {
  children?: React.ReactNode;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ children, className = '' }) => {
  return (
    <a
      href="/"
      className={cn("relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black", className)}
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-purple-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        CreatorsMeet
      </motion.span>
      {children}
    </a>
  );
};

export const LogoIcon: React.FC<LogoProps> = ({ children, className = '' }) => {
  return (
    <a
      href="/"
      className={cn("relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black", className)}
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-purple-500" />
      {children}
    </a>
  );
}; 