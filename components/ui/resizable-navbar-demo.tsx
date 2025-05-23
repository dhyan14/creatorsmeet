"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Developers",
      link: "#developers",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Sign In</NavbarButton>
            <NavbarButton variant="gradient">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="gradient"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <div className="container mx-auto p-8 pt-24">
        <h1 className="mb-4 text-center text-3xl font-bold text-black dark:text-white">
          Welcome to Creators Meet
        </h1>
        <p className="mb-10 text-center text-sm text-zinc-500">
          Connect with developers and bring your ideas to life
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Connect",
              description: "Find the perfect developer for your project",
              bg: "bg-purple-100 dark:bg-purple-900/30",
            },
            {
              title: "Collaborate",
              description: "Work together to build amazing solutions",
              bg: "bg-blue-100 dark:bg-blue-900/30",
            },
            {
              title: "Create",
              description: "Turn your vision into reality",
              bg: "bg-green-100 dark:bg-green-900/30",
            },
          ].map((box, index) => (
            <div
              key={index}
              className={`${box.bg} flex flex-col items-center justify-center rounded-lg p-8 shadow-sm`}
            >
              <h2 className="mb-4 text-xl font-medium text-black dark:text-white">{box.title}</h2>
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">{box.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 