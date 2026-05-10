'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  IconRocket, IconMail, IconLock, IconEye, IconEyeOff,
  IconArrowRight, IconBrandGoogle, IconBrandGithub,
  IconLoader2, IconSparkles, IconUsers, IconCode, IconBulb
} from '@tabler/icons-react';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ identifier: '', password: '', rememberMe: false });

  const set = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier.trim()) { setError('Email is required'); return; }
    if (!form.password) { setError('Password is required'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: form.identifier, password: form.password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid credentials');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex">
      {/* Mesh Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* Left Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                <IconRocket className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold">CreatorsMeet</p>
            </Link>
          </motion.div>

          {/* Desktop logo */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="hidden lg:block mb-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <IconRocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">CreatorsMeet</p>
                <p className="text-[11px] text-white/40">by Youdex Technologies</p>
              </div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Welcome back</h1>
            <p className="text-white/40 text-sm">Sign in to pick up where you left off</p>
          </motion.div>

          {/* Social buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="grid grid-cols-2 gap-3 mb-6">
            <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setLoading(true); signIn('google'); }}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm font-medium text-white/70 disabled:opacity-50">
              <IconBrandGoogle className="w-4.5 h-4.5" /> Google
            </motion.button>
            <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setLoading(true); signIn('github'); }}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm font-medium text-white/70 disabled:opacity-50">
              <IconBrandGithub className="w-4.5 h-4.5" /> GitHub
            </motion.button>
          </motion.div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#050510] text-white/30">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="space-y-4">

            {/* Email */}
            <div>
              <div className="relative">
                <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="text" placeholder="Email address" value={form.identifier}
                  onChange={e => set('identifier', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
                  onChange={e => set('password', e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={form.rememberMe}
                    onChange={e => set('rememberMe', e.target.checked)}
                    className="peer sr-only" />
                  <div className="w-4 h-4 rounded border border-white/15 bg-white/5 peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all flex items-center justify-center">
                    {form.rememberMe && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400 text-center">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-50 text-sm">
              {loading ? <><IconLoader2 className="w-4 h-4 animate-spin" /> Signing in...</> : <>Sign in <IconArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </motion.form>

          {/* Sign up link */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-center mt-8 text-sm text-white/30">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">Create one</Link>
          </motion.p>
        </div>
      </div>

      {/* Right Panel — Branding (desktop only) */}
      <div className="hidden lg:flex lg:w-[42%] relative items-center justify-center p-12">
        <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 mb-8">
              <IconSparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs text-violet-300 font-medium">Your projects are waiting</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
              Pick up where{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400">
                you left off
              </span>
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Your team, projects, and connections are all here.
              Jump back in and keep building.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 mb-10">
              {[
                { icon: <IconUsers className="w-4 h-4" />, title: "Team Dashboard", desc: "See your active collaborations" },
                { icon: <IconCode className="w-4 h-4" />, title: "Project Feed", desc: "Latest updates from your projects" },
                { icon: <IconBulb className="w-4 h-4" />, title: "New Matches", desc: "AI found new collaborators for you" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.03]">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70">{item.title}</p>
                    <p className="text-xs text-white/30">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active users indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#7c3aed", "#db2777", "#2563eb", "#059669"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#050510] flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: c }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-white/50"><span className="text-emerald-400 font-semibold">2,847</span> creators online now</p>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}