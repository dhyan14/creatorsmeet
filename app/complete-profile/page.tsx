'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconRocket, IconUser, IconBriefcase, IconCode, IconLink,
  IconCheck, IconX, IconLoader2, IconChevronRight, IconChevronLeft,
  IconSparkles, IconShieldCheck, IconLock
} from '@tabler/icons-react';
import RoleSelector from '../components/auth/RoleSelector';
import TechnologySelector from '../components/auth/TechnologySelector';
import AvailabilitySelector from '../components/auth/AvailabilitySelector';
import ExperienceSelector from '../components/auth/ExperienceSelector';

export default function CompleteProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const timerRef = useRef<NodeJS.Timeout>();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: '' as 'creator' | 'innovator' | '',
    skills: [] as string[],
    interests: [] as string[],
    technologies: [] as string[],
    bio: '',
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'expert',
    availability: 'available' as 'available' | 'busy' | 'not-available',
    lookingFor: '',
    github: '',
    linkedin: '',
    portfolio: ''
  });

  const totalSteps = 4;

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({ ...prev, name: session.user.name || '' }));
    }
  }, [session]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.profileCompleted) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  const checkUsername = async (val: string) => {
    if (!val || val.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setUsernameChecking(true);
    try {
      const excludeEmail = session?.user?.email ? `&exclude=${encodeURIComponent(session.user.email)}` : '';
      const response = await fetch(`/api/auth/check-username?username=${val}${excludeEmail}`);
      const data = await response.json();
      setUsernameAvailable(data.available);
      if (!data.available) {
        setErrors(prev => ({ ...prev, username: data.message || 'Username taken' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setUsernameChecking(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const ne = { ...prev }; delete ne[name]; return ne; });

    if (name === 'username') {
      const formatted = value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
      setFormData(prev => ({ ...prev, username: formatted }));
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => checkUsername(formatted), 500);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.username) newErrors.username = 'Username is required';
      if (formData.username && usernameAvailable === false) newErrors.username = 'Username is not available';
    } else if (step === 2) {
      if (!formData.role) newErrors.role = 'Role is required';
      if (formData.role === 'creator' && formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
      if (formData.role === 'innovator' && formData.interests.length === 0) newErrors.interests = 'At least one interest is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch('/api/user/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to complete profile');
      router.push('/dashboard');
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <IconLoader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  const stepTitles = [
    { icon: <IconUser className="w-5 h-5" />, title: 'Identity' },
    { icon: <IconBriefcase className="w-5 h-5" />, title: 'Role' },
    { icon: <IconCode className="w-5 h-5" />, title: 'Details' },
    { icon: <IconLink className="w-5 h-5" />, title: 'Social' }
  ];

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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-24 px-4 overflow-y-auto">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <IconRocket className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">CreatorsMeet</h1>
            </div>
            <h2 className="text-3xl font-extrabold mb-3">Complete your profile</h2>
            <p className="text-white/40">Let's get you set up so you can start connecting.</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 rounded-full z-0" />
            <div className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-in-out" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }} />

            <div className="relative z-10 flex justify-between">
              {stepTitles.map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isPast = currentStep > stepNum;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isActive || isPast ? 'rgba(139, 92, 246, 1)' : 'rgba(15, 15, 25, 1)',
                        borderColor: isActive || isPast ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive || isPast ? 'text-white shadow-lg shadow-violet-500/40' : 'text-white/30'}`}
                    >
                      {isPast ? <IconCheck className="w-5 h-5" /> : step.icon}
                    </motion.div>
                    <span className={`text-xs font-medium ${isActive ? 'text-violet-400' : isPast ? 'text-white/70' : 'text-white/30'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Container */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={currentStep}>
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Who are you?</h3>
                      <p className="text-sm text-white/40 mb-6">Let's start with your basic identity.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Full Name <span className="text-pink-500">*</span></label>
                        <div className="relative">
                          <IconUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                              }`}
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name}</p>}
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Username <span className="text-pink-500">*</span></label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">@</span>
                          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe"
                            className={`w-full pl-9 pr-10 py-3 rounded-xl border text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 transition-all ${errors.username ? 'border-red-500/50 focus:ring-red-500/30' :
                                usernameAvailable ? 'border-emerald-500/50 focus:ring-emerald-500/30' :
                                  'border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50'
                              }`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {usernameChecking && <IconLoader2 className="w-4 h-4 text-white/30 animate-spin" />}
                            {usernameAvailable === true && <IconCheck className="w-4 h-4 text-emerald-400" />}
                            {usernameAvailable === false && <IconX className="w-4 h-4 text-red-400" />}
                          </div>
                        </div>
                        {errors.username && <p className="text-xs text-red-400 mt-1 ml-1">{errors.username}</p>}
                        {!errors.username && usernameAvailable === true && <p className="text-xs text-emerald-400 mt-1 ml-1">Username available!</p>}
                      </div>

                      {/* Email (Readonly if from OAuth) */}
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                        <div className="relative">
                          <IconShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                          <input type="email" value={session?.user?.email || ''} disabled
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/5 bg-white/[0.01] text-white/40 cursor-not-allowed text-sm"
                          />
                        </div>
                        <p className="text-[11px] text-white/30 mt-1 ml-1">Verified via authentication provider</p>
                      </div>

                      {/* Backup Password */}
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Set Backup Password (Optional)</label>
                        <div className="relative">
                          <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                        <p className="text-[11px] text-white/30 mt-1 ml-1">Allows you to sign in with email and password later</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Choose your path</h3>
                      <p className="text-sm text-white/40 mb-6">Are you here to build or bring ideas?</p>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">I am a <span className="text-pink-500">*</span></label>
                        <RoleSelector value={formData.role} onChange={(role) => { setFormData(prev => ({ ...prev, role, skills: [], interests: [], technologies: [] })); setErrors({}); }} error={errors.role} darkMode={true} />
                      </div>

                      <AnimatePresence>
                        {formData.role === 'creator' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Primary Skills <span className="text-pink-500">*</span></label>
                              <p className="text-xs text-white/40 mb-3">Select the main areas of your expertise</p>
                              <TechnologySelector selectedTechnologies={formData.skills} onChange={(skills) => setFormData(prev => ({ ...prev, skills }))} error={errors.skills} darkMode={true} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Specific Technologies (Optional)</label>
                              <p className="text-xs text-white/40 mb-3">Languages, frameworks, or tools you excel at</p>
                              <TechnologySelector selectedTechnologies={formData.technologies} onChange={(technologies) => setFormData(prev => ({ ...prev, technologies }))} darkMode={true} />
                            </div>
                          </motion.div>
                        )}

                        {formData.role === 'innovator' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Areas of Interest <span className="text-pink-500">*</span></label>
                              <p className="text-xs text-white/40 mb-3">Which domains or industries are you targeting?</p>
                              <TechnologySelector selectedTechnologies={formData.interests} onChange={(interests) => setFormData(prev => ({ ...prev, interests }))} error={errors.interests} darkMode={true} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/70 mb-2">Required Technologies (Optional)</label>
                              <p className="text-xs text-white/40 mb-3">Any specific tech stacks your project needs</p>
                              <TechnologySelector selectedTechnologies={formData.technologies} onChange={(technologies) => setFormData(prev => ({ ...prev, technologies }))} darkMode={true} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Tell us more</h3>
                      <p className="text-sm text-white/40 mb-6">Give potential collaborators a feel for who you are.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">Experience Level</label>
                        <ExperienceSelector value={formData.experienceLevel} onChange={(level) => setFormData(prev => ({ ...prev, experienceLevel: level }))} darkMode={true} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">Availability</label>
                        <AvailabilitySelector value={formData.availability} onChange={(availability) => setFormData(prev => ({ ...prev, availability }))} darkMode={true} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Short Bio (Optional)</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} maxLength={500}
                          placeholder={formData.role === 'creator' ? "I'm a full-stack developer who loves building SaaS products..." : "I'm a founder looking to build the next big ed-tech platform..."}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all resize-none"
                        />
                        <div className="flex justify-end mt-1">
                          <span className="text-[10px] text-white/30">{formData.bio.length}/500</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">What are you looking for?</label>
                        <input type="text" name="lookingFor" value={formData.lookingFor} onChange={handleChange}
                          placeholder={formData.role === 'creator' ? "e.g., A designer for a side project" : "e.g., A React developer for an MVP"}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Connect your links</h3>
                      <p className="text-sm text-white/40 mb-6">Showcase your work across the web (all optional).</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">GitHub Profile</label>
                        <div className="relative">
                          <IconLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">LinkedIn Profile</label>
                        <div className="relative">
                          <IconLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Personal Portfolio / Website</label>
                        <div className="relative">
                          <IconLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://yourwebsite.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 text-sm bg-white/[0.03] placeholder-white/25 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-start gap-3 mt-8">
                      <IconSparkles className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-violet-100">You're all set!</p>
                        <p className="text-xs text-violet-300/70 mt-1">Click the button below to finish creating your profile and jump into CreatorsMeet.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                {currentStep > 1 && (
                  <motion.button type="button" onClick={() => setCurrentStep(prev => prev - 1)}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 font-medium transition-all text-sm flex items-center justify-center gap-2">
                    <IconChevronLeft className="w-4 h-4" /> Back
                  </motion.button>
                )}

                <motion.button type="submit" disabled={loading || (currentStep === 1 && usernameAvailable === false)}
                  whileHover={{ scale: (loading || (currentStep === 1 && usernameAvailable === false)) ? 1 : 1.02 }}
                  whileTap={{ scale: (loading || (currentStep === 1 && usernameAvailable === false)) ? 1 : 0.98 }}
                  className={`${currentStep === 1 ? 'w-full' : 'flex-[2]'} py-3 px-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2`}>
                  {loading ? (
                    <><IconLoader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : currentStep === totalSteps ? (
                    <>Complete Profile <IconSparkles className="w-4 h-4" /></>
                  ) : (
                    <>Continue <IconChevronRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </div>

              {errors.submit && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
