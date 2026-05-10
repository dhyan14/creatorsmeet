"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HowItWorks } from "@/components/sections/how-it-works";
import DevelopersSection from "@/components/sections/developers";
import { ContactSection } from "@/components/sections/contact";
import {
  IconRocket, IconUsers, IconCode, IconBrain,
  IconChartBar, IconShield, IconArrowRight,
  IconSparkles, IconMenu2, IconX,
} from "@tabler/icons-react";

/* ─── Marquee data ─── */
const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "Prisma", "NextAuth", "Vercel", "OpenAI", "GitHub"];

/* ─── Features ─── */
const features = [
  {
    icon: <IconBrain className="w-7 h-7" />,
    title: "AI-Powered Matching",
    description: "Intelligent algorithm connects you with perfect collaborators based on skills, interests, and project goals.",
    gradient: "from-violet-600 to-purple-600",
    span: "md:col-span-2",
    accent: "#7c3aed",
  },
  {
    icon: <IconCode className="w-7 h-7" />,
    title: "Collaborative Workspace",
    description: "Real-time collaboration and integrated dev tools for seamless teamwork.",
    gradient: "from-sky-500 to-cyan-500",
    span: "",
    accent: "#0ea5e9",
  },
  {
    icon: <IconUsers className="w-7 h-7" />,
    title: "Smart Team Building",
    description: "Form teams based on complementary skills and shared vision.",
    gradient: "from-emerald-500 to-green-500",
    span: "",
    accent: "#10b981",
  },
  {
    icon: <IconChartBar className="w-7 h-7" />,
    title: "Project Analytics",
    description: "Track progress and visualize performance with comprehensive dashboards.",
    gradient: "from-orange-500 to-amber-500",
    span: "",
    accent: "#f97316",
  },
  {
    icon: <IconShield className="w-7 h-7" />,
    title: "Secure & Private",
    description: "Enterprise-grade security with end-to-end encryption.",
    gradient: "from-indigo-500 to-blue-600",
    span: "",
    accent: "#6366f1",
  },
  {
    icon: <IconRocket className="w-7 h-7" />,
    title: "Quick Deployment",
    description: "Integrated CI/CD pipelines and one-click deployment.",
    gradient: "from-pink-500 to-rose-500",
    span: "",
    accent: "#ec4899",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "5K+", label: "Projects Built" },
  { value: "50K+", label: "Connections" },
  { value: "95%", label: "Success Rate" },
];

/* ─── Marquee Component ─── */
function Marquee() {
  const items = [...techStack, ...techStack];
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/8">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050510] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050510] to-transparent z-10" />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-sm font-medium text-white/30 tracking-widest uppercase flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-purple-500 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Mesh Orbs ─── */
function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050510]" />
      {/* Grid lines */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

/* ─── Nav ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#developers", label: "Developers" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 rounded-2xl ${scrolled
          ? "bg-black/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50"
          : "bg-white/5 backdrop-blur-md border border-white/10"
        }`}
    >
      <div className="relative flex items-center justify-between px-5 h-14">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <IconRocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">CreatorsMeet</p>
            <p className="text-[10px] text-white/40 leading-tight">by Youdex</p>
          </div>
        </div>

        {/* Desktop links — absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center gap-6 z-0">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors font-medium whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center justify-end gap-2 shrink-0 z-10">
          <Link href="/signin">
            <button className="text-sm text-white/60 hover:text-white transition-colors px-4 py-1.5 font-medium">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="text-sm px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center shrink-0 z-10">
          <button className="text-white/70 flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-sm text-white/60 hover:text-white transition-colors font-medium py-1">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link href="/signin" className="flex-1">
              <button className="w-full text-sm border border-white/15 rounded-xl py-2 text-white/70 hover:text-white transition-colors">Sign In</button>
            </Link>
            <Link href="/signup" className="flex-1">
              <button className="w-full text-sm rounded-xl py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold">Get Started</button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
            >
              <IconSparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300 font-medium">Powered by Youdex Technologies</span>
            </motion.div>

            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                Where{" "}
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #818cf8 100%)", backgroundSize: "200%", animation: "gradient-shift 4s ease infinite" }}
                  >
                    Ideas Meet
                  </span>
                </span>
                <br />
                <span className="text-white">Talent</span>
              </h1>
            </div>

            <p className="text-lg text-white/50 max-w-lg leading-relaxed">
              Connect with innovators and developers to turn your vision into reality.
              CreatorsMeet brings the brightest minds together to build the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-purple-500/30 transition-all"
                >
                  Start Building Now
                  <IconArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="#how-it-works">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold text-base transition-all backdrop-blur-sm"
                >
                  See How It Works
                </motion.button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["#7c3aed", "#db2777", "#2563eb", "#059669", "#d97706"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050510] flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: c }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-white font-semibold">10,000+ creators</p>
                <p className="text-xs text-white/40">already building on CreatorsMeet</p>
              </div>
            </div>
          </motion.div>

          {/* Right – Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
              {/* Card top bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <div className="ml-3 flex-1 h-6 rounded-lg bg-white/6 flex items-center px-3">
                  <span className="text-[10px] text-white/30">creatorsmeet.io/dashboard</span>
                </div>
              </div>

              {/* Project cards inside */}
              <div className="space-y-3">
                {[
                  { name: "AI Resume Builder", tag: "Hiring", color: "#7c3aed", members: 3 },
                  { name: "EdTech Platform", tag: "Active", color: "#059669", members: 5 },
                  { name: "DeFi Dashboard", tag: "Building", color: "#d97706", members: 4 },
                ].map((proj, i) => (
                  <motion.div
                    key={proj.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center justify-between p-3 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/8 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: proj.color + "33", border: `1px solid ${proj.color}55` }}>
                        <IconCode className="w-4 h-4" style={{ color: proj.color }} />
                      </div>
                      <div>
                        <p className="text-sm text-white font-semibold">{proj.name}</p>
                        <div className="flex -space-x-1 mt-1">
                          {Array.from({ length: proj.members }).map((_, j) => (
                            <div key={j} className="w-4 h-4 rounded-full border border-[#050510] bg-gradient-to-br from-violet-500 to-pink-500" />
                          ))}
                          <span className="text-[10px] text-white/30 ml-2 self-center">{proj.members} members</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: proj.color + "22", color: proj.color }}>
                      {proj.tag}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Match notification */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4 flex items-center gap-3 p-3 rounded-2xl border border-violet-500/20 bg-violet-500/10"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                  <IconBrain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-violet-300 font-semibold">AI Match Found!</p>
                  <p className="text-[10px] text-white/40">3 developers match your project</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-violet-400"
                />
              </motion.div>

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />
            </div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-8 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-xl"
            >
              <p className="text-xs text-white/40 font-medium">Projects Built</p>
              <p className="text-2xl font-extrabold text-white">5K+</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-xl"
            >
              <p className="text-xs text-white/40 font-medium">Success Rate</p>
              <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">95%</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              className="relative p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm text-center overflow-hidden group"
            >
              <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-pink-400">{s.value}</div>
              <div className="text-sm text-white/40 mt-1 font-medium">{s.label}</div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Bento Features ─── */
function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
            <IconSparkles className="w-4 h-4" /> Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">Succeed</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Powerful tools designed to make collaboration seamless and productive.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`relative p-7 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden group cursor-pointer transition-all ${f.span}`}
            >
              {/* Icon */}
              <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5 shadow-lg w-12 h-12 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all"
                style={{ ["--tw-gradient-from" as string]: f.accent }}>
                {f.title}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">{f.description}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${f.accent}15 0%, transparent 60%)` }} />
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <main className="min-h-screen text-white overflow-hidden">
      <MeshBackground />
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturesSection />
      <HowItWorks />
      <DevelopersSection />
      <ContactSection />

      {/* Footer */}
      <footer className="relative border-t border-white/8 py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                  <IconRocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white">CreatorsMeet</p>
                  <p className="text-xs text-white/30">by Youdex Technologies</p>
                </div>
              </div>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-4">
                Connecting innovators with developers to build the future. Join our thriving community.
              </p>
              <p className="text-xs text-white/20">© 2026 Youdex Technologies. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {[["#how-it-works", "How It Works"], ["#developers", "Our Team"], ["#contact", "Contact"], ["/signin", "Sign In"]].map(([href, label]) => (
                  <li key={href}><Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {[["/tips", "Tips & Guides"], ["#", "Documentation"], ["#", "API Reference"], ["#", "Privacy Policy"]].map(([href, label]) => (
                  <li key={label}><Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/8 text-center text-white/20 text-sm">
            Built with ❤️ by <span className="text-violet-400 font-semibold">Youdex Technologies</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
