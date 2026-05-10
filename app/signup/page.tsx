'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  IconRocket, IconMail, IconArrowRight, IconArrowLeft,
  IconSparkles, IconEye, IconEyeOff, IconCheck, IconX,
  IconBrandGoogle, IconBrandGithub, IconUser, IconAt,
  IconLock, IconShieldCheck, IconLoader2
} from '@tabler/icons-react';

/* ─── Password strength helper ─── */
function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  return score; // 0-5
}
const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

/* ─── Username availability hook ─── */
function useUsernameCheck() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const timer = useRef<NodeJS.Timeout>();

  const check = (val: string) => {
    if (val.length < 3) { setStatus('idle'); return; }
    setStatus('checking');
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check-username?username=${encodeURIComponent(val)}`);
        const data = await res.json();
        setStatus(data.available ? 'available' : 'taken');
      } catch { setStatus('idle'); }
    }, 500);
  };

  return { status, check };
}

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = account, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const username = useUsernameCheck();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
    setError('');
    if (field === 'username') username.check(value);
  };

  // Auto-generate username from name
  const generateUsername = (name: string) => {
    const base = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15);
    if (base.length >= 3) {
      const suggestion = base + Math.floor(Math.random() * 100);
      set('username', suggestion);
      username.check(suggestion);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Enter your full name';
    if (!form.username.trim() || form.username.length < 3) errs.username = 'Username must be 3+ characters';
    else if (!/^[a-z0-9_-]+$/.test(form.username.toLowerCase())) errs.username = 'Only letters, numbers, _ and -';
    else if (username.status === 'taken') errs.username = 'Username already taken';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (form.password.length < 8) errs.password = 'At least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) errs.password = 'Need uppercase, lowercase & number';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          username: form.username.toLowerCase(),
          password: form.password,
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      if (data.otpSent) { setStep(2); return; }
      router.push('/complete-profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  };

  const handleOtp = async (otp: string) => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      router.push('/complete-profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    try {
      await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
    } catch { /* silent */ }
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen bg-[#050510] text-white flex">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* Left Panel — Desktop only */}
      <div className="hidden lg:flex lg:w-[42%] relative items-center justify-center p-12">
        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link href="/" className="inline-flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <IconRocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">CreatorsMeet</p>
                <p className="text-[11px] text-white/40">by Youdex Technologies</p>
              </div>
            </Link>

            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
              Start building{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400">something amazing</span>
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Join thousands of creators and developers building the future together.
              It takes less than a minute to get started.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { val: "10K+", label: "Creators" },
                { val: "5K+", label: "Projects" },
                { val: "95%", label: "Match Rate" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-3 rounded-xl border border-white/8 bg-white/[0.03]">
                  <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">{s.val}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="p-4 rounded-2xl border border-white/8 bg-white/[0.03]">
              <p className="text-sm text-white/50 italic leading-relaxed mb-3">
                "Found the perfect developer for my startup idea within 24 hours. CreatorsMeet is a game changer."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">A</div>
                <div>
                  <p className="text-xs font-semibold text-white/70">Alex M.</p>
                  <p className="text-[10px] text-white/30">Startup Founder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Right Panel — Form */}
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

          <AnimatePresence mode="wait">
            {/* ════════ STEP 1: Account Details ════════ */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-1">Create your account</h1>
                  <p className="text-white/40 text-sm">Quick signup — set up your profile after</p>
                </div>

                {/* Social buttons first */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => signIn('google')}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-medium text-white/70">
                    <IconBrandGoogle className="w-4 h-4" /> Google
                  </motion.button>
                  <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => signIn('github')}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-medium text-white/70">
                    <IconBrandGithub className="w-4 h-4" /> GitHub
                  </motion.button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#050510] text-white/30">or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <div className="relative">
                      <IconUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type="text" placeholder="Full name" value={form.name}
                        onChange={e => { set('name', e.target.value); if (!form.username && e.target.value.length > 2) generateUsername(e.target.value); }}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                        }`}
                      />
                    </div>
                    {fieldErrors.name && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.name}</p>}
                  </div>

                  {/* Username */}
                  <div>
                    <div className="relative">
                      <IconAt className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type="text" placeholder="Username" value={form.username}
                        onChange={e => set('username', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.username || username.status === 'taken' ? 'border-red-500/50 focus:ring-red-500/30' :
                          username.status === 'available' ? 'border-emerald-500/50 focus:ring-emerald-500/30' :
                          'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                        }`}
                      />
                      {/* Status indicator */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {username.status === 'checking' && <IconLoader2 className="w-4 h-4 text-white/30 animate-spin" />}
                        {username.status === 'available' && <IconCheck className="w-4 h-4 text-emerald-400" />}
                        {username.status === 'taken' && <IconX className="w-4 h-4 text-red-400" />}
                      </div>
                    </div>
                    {fieldErrors.username && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.username}</p>}
                    {username.status === 'available' && <p className="text-xs text-emerald-400 mt-1 ml-1">Username available!</p>}
                    {username.status === 'taken' && !fieldErrors.username && <p className="text-xs text-red-400 mt-1 ml-1">Username taken</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type="email" placeholder="Email address" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                        }`}
                      />
                    </div>
                    {fieldErrors.email && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="relative">
                      <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="Create password" value={form.password}
                        onChange={e => set('password', e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.password ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                        }`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                        {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.password}</p>}
                    {/* Strength bar */}
                    {form.password.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                              style={{ backgroundColor: i <= strength ? strengthColor[strength] : 'rgba(255,255,255,0.06)' }} />
                          ))}
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: strengthColor[strength] }}>
                          {strengthLabel[strength]}
                        </span>
                      </div>
                    )}
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
                    className="w-full flex items-center justify-center gap-2 py-3 mt-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-50 text-sm">
                    {loading ? <><IconLoader2 className="w-4 h-4 animate-spin" /> Creating account...</> : <>Create account <IconArrowRight className="w-4 h-4" /></>}
                  </motion.button>

                  {/* Terms note */}
                  <p className="text-[11px] text-white/25 text-center leading-relaxed">
                    By signing up, you agree to our{' '}
                    <Link href="/terms" className="text-violet-400/60 hover:text-violet-400">Terms</Link>{' '}and{' '}
                    <Link href="/privacy" className="text-violet-400/60 hover:text-violet-400">Privacy Policy</Link>
                  </p>
                </form>
              </motion.div>
            )}

            {/* ════════ STEP 2: OTP Verification ════════ */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <OTPVerification
                  email={form.email}
                  loading={loading}
                  error={error}
                  onVerify={handleOtp}
                  onResend={handleResendOtp}
                  onBack={() => setStep(1)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign in link */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-center mt-6 text-sm text-white/30">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── OTP Component ─── */
function OTPVerification({ email, loading, error, onVerify, onResend, onBack }: {
  email: string; loading: boolean; error: string;
  onVerify: (otp: string) => void; onResend: () => void; onBack: () => void;
}) {
  const [otp, setOtp] = useState(['','','','','','']);
  const [resendCooldown, setResendCooldown] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCooldown]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
    if (next.every(d => d !== '')) onVerify(next.join(''));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const next = pasted.split('');
      setOtp(next);
      refs.current[5]?.focus();
      onVerify(pasted);
    }
  };

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
        <IconShieldCheck className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Check your email</h1>
      <p className="text-sm text-white/40 mb-8">
        We sent a 6-digit code to <span className="text-violet-400 font-medium">{email}</span>
      </p>

      {/* OTP boxes */}
      <div className="flex justify-center gap-2.5 mb-6" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input key={i} ref={el => { refs.current[i] = el; }} type="text" inputMode="numeric"
            maxLength={1} value={digit} onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-white/[0.03] text-white focus:outline-none focus:ring-2 transition-all ${
              digit ? 'border-violet-500/50 focus:ring-violet-500/30' : 'border-white/10 focus:ring-violet-500/30'
            }`}
          />
        ))}
      </div>

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 mb-4">{error}</motion.p>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-4">
          <IconLoader2 className="w-4 h-4 animate-spin" /> Verifying...
        </div>
      )}

      <button type="button" disabled={resendCooldown > 0}
        onClick={() => { onResend(); setResendCooldown(60); }}
        className="text-xs text-white/30 hover:text-violet-400 transition-colors disabled:opacity-40 mb-4">
        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Didn't receive it? Resend code"}
      </button>

      <div className="pt-4">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors">
          <IconArrowLeft className="w-3.5 h-3.5" /> Back to signup
        </button>
      </div>
    </div>
  );
}