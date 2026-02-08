'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconRocket, IconUser, IconBriefcase, IconCode, IconLink,
    IconCheck, IconX, IconLoader, IconChevronRight, IconChevronLeft
} from '@tabler/icons-react';
import FormInput from '../components/auth/FormInput';
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

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: '' as 'creator' | 'innov

ator' | '',
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
            console.log('Session data:', session.user);
            setFormData(prev => ({ ...prev, name: session.user.name || '' }));
        }
    }, [session]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.profileCompleted) {
            router.push('/dashboard');
        }
    }, [status, session, router]);

    useEffect(() => {
        const checkUsername = async () => {
            if (!formData.username || formData.username.length < 3) {
                setUsernameAvailable(null);
                return;
            }
            setUsernameChecking(true);
            try {
                const response = await fetch(`/api/user/check-username?username=${formData.username}`);
                const data = await response.json();
                setUsernameAvailable(data.available);
                if (!data.available) {
                    setErrors(prev => ({ ...prev, username: data.message }));
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
        const timer = setTimeout(checkUsername, 500);
        return () => clearTimeout(timer);
    }, [formData.username]);

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};
        if (step === 1) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.username) newErrors.username = 'Username is required';
            if (formData.username && !usernameAvailable) newErrors.username = 'Username is not available';
        } else if (step === 2) {
            if (!formData.role) newErrors.role = 'Role is required';
            if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...{ ...prev }, [name]: undefined } as any));
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Please sign in to continue</p>
                    <a href="/signin" className="text-purple-400 hover:text-purple-300">Go to Sign In</a>
                </div>
            </div>
        );
    }

    const stepTitles = [
        { icon: IconUser, title: 'Basic Info', desc: 'Your name and username' },
        { icon: IconBriefcase, title: 'Role & Skills', desc: 'What you do best' },
        { icon: IconCode, title: 'About You', desc: 'Tell us more' },
        { icon: IconLink, title: 'Social Links', desc: 'Connect your profiles' }
    ];

    return (
        <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                            <IconRocket className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">CreatorsMeet</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Complete Your Profile</h2>
                    <p className="text-gray-400">Step {currentStep} of {totalSteps} - {stepTitles[currentStep - 1].desc}</p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {stepTitles.map((step, index) => {
                            const StepIcon = step.icon;
                            const stepNumber = index + 1;
                            const isActive = currentStep === stepNumber;
                            const isCompleted = currentStep > stepNumber;
                            return (
                                <div key={stepNumber} className="flex-1 flex items-center">
                                    <div className="flex flex-col items-center relative">
                                        <motion.div
                                            animate={{ scale: isActive ? 1.1 : 1 }}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500' :
                                                    isActive ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent' :
                                                        'bg-white/5 border-white/20'
                                                }`}
                                        >
                                            {isCompleted ? <IconCheck className="w-6 h-6 text-white" /> :
                                                <StepIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />}
                                        </motion.div>
                                        <p className={`text-xs mt-2 hidden md:block ${isActive ? 'text-white font-medium' : 'text-gray-500'}`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < stepTitles.length - 1 && (
                                        <div className="flex-1 h-0.5 mx-2 bg-white/10">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: isCompleted ? '100%' : '0%' }}
                                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-xl rounded-3xl p-8 border bg-white/5 border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <FormInput label="Full Name" type="text" name="name" value={formData.name}
                                        onChange={handleChange} placeholder="John Doe" error={errors.name} darkMode={true} required />
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                        <div className="relative">
                                            <input type="email" value={session?.user?.email || ''} disabled
                                                className="w-full px-4 py-3 rounded-xl border bg-white/5 border-white/20 text-gray-400 cursor-not-allowed" />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-green-400 text-sm">
                                                <IconCheck className="w-5 h-5" />
                                                <span className="font-medium">Verified</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Email verified via OAuth</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">
                                            Username <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <input type="text" name="username" value={formData.username} onChange={handleChange}
                                                placeholder="johndoe" required
                                                className={`w-full px-4 py-3 rounded-xl border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none ${errors.username ? 'border-red-500' : ''}`} />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {usernameChecking && <IconLoader className="w-5 h-5 text-gray-400 animate-spin" />}
                                                {!usernameChecking && usernameAvailable === true && <IconCheck className="w-5 h-5 text-green-400" />}
                                                {!usernameChecking && usernameAvailable === false && <IconX className="w-5 h-5 text-red-400" />}
                                            </div>
                                        </div>
                                        {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                                        {!errors.username && usernameAvailable === true && <p className="mt-1 text-sm text-green-400">Username is available!</p>}
                                        <p className="text-xs text-gray-400 mt-1">3-20 characters, letters, numbers, and underscores only</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Set Password (Optional)</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                                            placeholder="Set a password as backup login"
                                            className="w-full px-4 py-3 rounded-xl border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none" />
                                        <p className="text-xs text-gray-400 mt-1">You can sign in with OAuth or password</p>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">
                                            I am a <span className="text-red-400">*</span>
                                        </label>
                                        <RoleSelector value={formData.role}
                                            onChange={(role) => setFormData(prev => ({ ...prev, role }))}
                                            error={errors.role} darkMode={true} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">
                                            Skills <span className="text-red-400">*</span>
                                        </label>
                                        <TechnologySelector selectedTechnologies={formData.skills}
                                            onChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
                                            error={errors.skills} darkMode={true} />
                                        <p className="text-xs text-gray-400 mt-1">Add your main technical skills</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Interests (Optional)</label>
                                        <TechnologySelector selectedTechnologies={formData.interests}
                                            onChange={(interests) => setFormData(prev => ({ ...prev, interests }))}
                                            darkMode={true} />
                                        <p className="text-xs text-gray-400 mt-1">What topics interest you?</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Preferred Technologies (Optional)</label>
                                        <TechnologySelector selectedTechnologies={formData.technologies}
                                            onChange={(technologies) => setFormData(prev => ({ ...prev, technologies }))}
                                            darkMode={true} />
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Experience Level</label>
                                        <ExperienceSelector value={formData.experienceLevel}
                                            onChange={(level) => setFormData(prev => ({ ...prev, experienceLevel: level }))}
                                            darkMode={true} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Availability</label>
                                        <AvailabilitySelector value={formData.availability}
                                            onChange={(availability) => setFormData(prev => ({ ...prev, availability }))}
                                            darkMode={true} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Bio (Optional)</label>
                                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} maxLength={500}
                                            placeholder="Tell us about yourself..."
                                            className="w-full px-4 py-3 rounded-xl border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none resize-none" />
                                        <p className="text-xs text-gray-400 mt-1">{formData.bio.length}/500 characters</p>
                                    </div>
                                    <FormInput label="What are you looking for?" type="text" name="lookingFor"
                                        value={formData.lookingFor} onChange={handleChange}
                                        placeholder="e.g., Co-founder for SaaS project, Frontend developer..."
                                        darkMode={true} />
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <p className="text-gray-300 text-sm mb-4">Connect your social profiles (all optional)</p>
                                    <FormInput label="GitHub" type="url" name="github" value={formData.github}
                                        onChange={handleChange} placeholder="https://github.com/username" darkMode={true} />
                                    <FormInput label="LinkedIn" type="url" name="linkedin" value={formData.linkedin}
                                        onChange={handleChange} placeholder="https://linkedin.com/in/username" darkMode={true} />
                                    <FormInput label="Portfolio" type="url" name="portfolio" value={formData.portfolio}
                                        onChange={handleChange} placeholder="https://yourwebsite.com" darkMode={true} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-4 mt-8">
                            {currentStep > 1 && (
                                <motion.button type="button" onClick={() => setCurrentStep(currentStep - 1)}
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 px-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                    <IconChevronLeft className="w-5 h-5 inline mr-2" />Back
                                </motion.button>
                            )}
                            <motion.button type="submit"
                                disabled={loading || (currentStep === 1 && !usernameAvailable)}
                                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Saving...' : currentStep === totalSteps ? 'Complete Profile' : (
                                    <>Next<IconChevronRight className="w-5 h-5 inline ml-2" /></>
                                )}
                            </motion.button>
                        </div>

                        {errors.submit && (
                            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                                <p className="text-sm text-red-400">{errors.submit}</p>
                            </div>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
