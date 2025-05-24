"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconDashboard,
  IconSettings,
  IconUser,
  IconMessage,
  IconBriefcase,
  IconCode,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Messages",
      href: "/messages",
      icon: <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Code Editor",
      href: "/editor",
      icon: <IconCode className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: isLoggingOut ? "Logging out..." : "Logout",
      onClick: handleLogout,
      icon: (
        <IconArrowLeft 
          className={`h-5 w-5 shrink-0 ${isLoggingOut ? 'animate-pulse' : ''} text-neutral-700 dark:text-neutral-200`}
        />
      )
    }
  ];

  return (
    <div className="h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Your Profile",
                href: "/profile",
                icon: (
                  <Image
                    src="/default-avatar.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-purple-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        CreatorsMeet
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-purple-500" />
    </a>
  );
}; 