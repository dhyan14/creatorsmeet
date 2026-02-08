'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { IconRocket } from '@tabler/icons-react';
import FormInput from '../components/auth/FormInput';
import RoleSelector from '../components/auth/RoleSelector';
import TechnologySelector from '../components/auth/TechnologySelector';

export default function CompleteProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        username: '',
        role: '' as 'developer' | 'creator' | '',
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

    useEffect(() => {
        // Redirect if already authenticated with completed profile
        if (status === 'authenticated' && session?.user?.profileCompleted) {
            router.push('/dashboard');
        }
        // Redirect to signin if not authenticated
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.role) {
            setErrors({
                submit: 'Username and role are required'
            });
            return;
        }

        if (formData.skills.length === 0) {
            setErrors({
                submit: 'Please add at least one skill'
            });
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

            if (!response.ok) {
                throw new Error(data.message || 'Failed to complete profile');
            }

            // Success - redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            setErrors({
                submit: error instanceof Error ? error.message : 'Something went wrong'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleRoleChange = (role: 'developer' | 'creator') => {
        setFormData(prev => ({ ...prev, role }));
        if (errors.role) {
            setErrors(prev => ({ ...prev, role: '' }));
        }
    };

    const handleSkillsChange = (skills: string[]) => {
        setFormData(prev => ({ ...prev, skills }));
    };

    const handleTechnologiesChange = (technologies: string[]) => {
        setFormData(prev => ({ ...prev, technologies }));
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                            <IconRocket className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">CreatorsMeet</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Complete Your Profile</h2>
                    <p className="text-gray-400">
                        Welcome! Let's set up your profile to help you find the perfect collaborators
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-xl rounded-3xl p-8 border bg-white/5 border-white/10 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <FormInput
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe"
                            error={errors.username}
                            darkMode={true}
                            required
                        />

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                I am a <span className="text-red-400">*</span>
                            </label>
                            <RoleSelector
                                value={formData.role}
                                onChange={handleRoleChange}
                                error={errors.role}
                                darkMode={true}
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Skills <span className="text-red-400">*</span>
                            </label>
                            <TechnologySelector
                                selectedTechnologies={formData.skills}
                                onChange={handleSkillsChange}
                                error={errors.skills}
                                darkMode={true}
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Add your main technical skills (e.g., React, Python, UI/UX Design)
                            </p>
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Preferred Technologies (Optional)
                            </label>
                            <TechnologySelector
                                selectedTechnologies={formData.technologies}
                                onChange={handleTechnologiesChange}
                                error={errors.technologies}
                                darkMode={true}
                            />
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Experience Level
                            </label>
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border bg-white/10 border-white/20 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Bio (Optional)
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                maxLength={500}
                                placeholder="Tell us about yourself..."
                                className="w-full px-4 py-3 rounded-xl border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {formData.bio.length}/500 characters
                            </p>
                        </div>

                        {/* Looking For */}
                        <FormInput
                            label="What are you looking for?"
                            type="text"
                            name="lookingFor"
                            value={formData.lookingFor}
                            onChange={handleChange}
                            placeholder="e.g., Co-founder for SaaS project, Frontend developer..."
                            error={errors.lookingFor}
                            darkMode={true}
                        />

                        {/* Social Links */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <FormInput
                                label="GitHub"
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                darkMode={true}
                            />
                            <FormInput
                                label="LinkedIn"
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                darkMode={true}
                            />
                            <FormInput
                                label="Portfolio"
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://..."
                                darkMode={true}
                            />
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                                <p className="text-sm text-red-400">{errors.submit}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Complete Profile'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
