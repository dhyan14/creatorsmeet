'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IconUser, IconMail, IconPhone, IconRocket, IconCheck
} from '@tabler/icons-react';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';
import RoleSelector from '../components/auth/RoleSelector';
import CountrySelect from '../components/auth/CountrySelect';
import SocialButton from '../components/auth/SocialButton';
import TechnologySelector from '../components/auth/TechnologySelector';
import IdeaInput from '../components/auth/IdeaInput';
import OTPInput from '../components/auth/OTPInput';

interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'creator' | 'innovator' | '';
  country: string;
  bio: string;
  technologies: string[]; // For creators
  idea: string; // For innovators
  extractedTechnologies: string[]; // AI-extracted from innovator's idea
  agreedToTerms: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    country: '',
    bio: '',
    technologies: [],
    idea: '',
    extractedTechnologies: [],
    agreedToTerms: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData | 'submit', string>>>({});

  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username must be lowercase letters, numbers, and underscores only';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (!formData.role) {
        newErrors.role = 'Please select your role';
      }

      if (!formData.country) {
        newErrors.country = 'Country is required';
      }
    }

    if (step === 4) {
      // Validate based on role
      if (formData.role === 'creator') {
        if (formData.technologies.length < 3) {
          newErrors.technologies = 'Please select at least 3 technologies';
        }
      } else if (formData.role === 'innovator') {
        if (!formData.idea.trim()) {
          newErrors.idea = 'Please describe your idea';
        } else if (formData.idea.trim().length < 50) {
          newErrors.idea = 'Please provide more details (at least 50 characters)';
        }
      }

      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone || undefined,
          password: formData.password,
          role: formData.role,
          country: formData.country,
          bio: formData.bio || undefined,
          technologies: formData.role === 'creator' ? formData.technologies : undefined,
          idea: formData.role === 'innovator' ? formData.idea : undefined,
          extractedTechnologies: formData.role === 'innovator' ? formData.extractedTechnologies : undefined
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Check if OTP was sent
      if (data.otpSent) {
        setCurrentStep(5); // Move to verification step
        return;
      }

      // Success (fallback if no OTP required) - redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      router.push('/dashboard');
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role: 'creator' | 'innovator') => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData(prev => ({ ...prev, technologies }));
    if (errors.technologies) {
      setErrors(prev => ({ ...prev, technologies: '' }));
    }
  };

  const handleIdeaChange = (idea: string) => {
    setFormData(prev => ({ ...prev, idea }));
    if (errors.idea) {
      setErrors(prev => ({ ...prev, idea: '' }));
    }
  };

  const handleAnalyzeIdea = async (idea: string) => {
    try {
      const response = await fetch('/api/analyze-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });

      const data = await response.json();

      if (response.ok && data.technologies) {
        setFormData(prev => ({ ...prev, extractedTechnologies: data.technologies }));
        return data.technologies;
      }

      return [];
    } catch (error) {
      console.error('Error analyzing idea:', error);
      return [];
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 relative overflow-hidden transition-colors ${darkMode
      ? 'bg-black'
      : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'
      }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <IconRocket className="w-7 h-7 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              CreatorsMeet
            </h1>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Create Your Account
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Join the community of creators and innovators
          </p>
        </motion.div>

        {/* Progress Indicator */}
        {currentStep < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all ${currentStep > step
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : currentStep === step
                      ? 'border-purple-600 text-purple-600'
                      : darkMode
                        ? 'border-white/20 text-gray-500'
                        : 'border-gray-300 text-gray-400'
                    }`}>
                    {currentStep > step ? <IconCheck size={20} /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 md:w-24 h-0.5 ${currentStep > step
                      ? 'bg-purple-600'
                      : darkMode
                        ? 'bg-white/20'
                        : 'bg-gray-300'
                      }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 px-2">
              <span className={`text-xs ${currentStep === 1 ? 'text-purple-500 font-medium' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Basic Info
              </span>
              <span className={`text-xs ${currentStep === 2 ? 'text-purple-500 font-medium' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Security
              </span>
              <span className={`text-xs ${currentStep === 3 ? 'text-purple-500 font-medium' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Profile
              </span>
              <span className={`text-xs ${currentStep === 4 ? 'text-purple-500 font-medium' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formData.role === 'creator' ? 'Tech Skills' : formData.role === 'innovator' ? 'Your Idea' : 'Details'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl ${darkMode
            ? 'bg-white/5 border-white/10'
            : 'bg-white border-gray-200'
            }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <FormInput
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.name}
                    darkMode={darkMode}
                    icon={<IconUser size={20} />}
                  />

                  <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    error={errors.username}
                    darkMode={darkMode}
                    icon={<span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>@</span>}
                  />

                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    error={errors.email}
                    darkMode={darkMode}
                    icon={<IconMail size={20} />}
                  />

                  <FormInput
                    label="Phone Number (Optional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    error={errors.phone}
                    darkMode={darkMode}
                    icon={<IconPhone size={20} />}
                  />
                </motion.div>
              )}

              {/* Step 2: Security */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <PasswordInput
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    showStrength
                    darkMode={darkMode}
                    placeholder="Create a strong password"
                  />

                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    darkMode={darkMode}
                    placeholder="Re-enter your password"
                  />

                  <div className={`p-4 rounded-xl border ${darkMode
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-blue-50 border-blue-200'
                    }`}>
                    <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      <strong>Password Requirements:</strong> At least 8 characters with uppercase, lowercase, and a number.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Profile */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <RoleSelector
                    value={formData.role}
                    onChange={handleRoleChange}
                    error={errors.role}
                    darkMode={darkMode}
                  />

                  <CountrySelect
                    value={formData.country}
                    onChange={handleCountryChange}
                    error={errors.country}
                    darkMode={darkMode}
                  />

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Bio (Optional)
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      placeholder="Tell us a bit about yourself and your interests..."
                      className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                        } focus:outline-none`}
                    />
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formData.bio.length}/500 characters
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Technology Skills or Idea Description */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {formData.role === 'creator' ? (
                    <TechnologySelector
                      selectedTechnologies={formData.technologies}
                      onChange={handleTechnologiesChange}
                      error={errors.technologies}
                      darkMode={darkMode}
                    />
                  ) : formData.role === 'innovator' ? (
                    <IdeaInput
                      value={formData.idea}
                      onChange={handleIdeaChange}
                      onAnalyze={handleAnalyzeIdea}
                      error={errors.idea}
                      darkMode={darkMode}
                      extractedTechnologies={formData.extractedTechnologies}
                    />
                  ) : (
                    <div className={`p-8 text-center rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Please go back and select your role
                      </p>
                    </div>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      I agree to the{' '}
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="text-sm text-red-400 -mt-2">{errors.agreedToTerms}</p>
                  )}
                </motion.div>
              )}

              {/* Step 5: OTP Verification */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center"
                >
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Verify Your Email
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      We sent a code to <span className="font-semibold text-purple-400">{formData.email}</span>
                    </p>
                  </div>

                  <OTPInput
                    onComplete={handleVerifyOtp}
                    error={errors.submit}
                    darkMode={darkMode}
                  />

                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Didn't receive code? Check your spam folder or try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Error */}
            {errors.submit && currentStep < 5 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center"
              >
                <p className="text-sm text-red-400">{errors.submit}</p>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all ${darkMode
                      ? 'border-white/20 text-white hover:bg-white/5'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    Back
                  </motion.button>
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        Processing...
                      </span>
                    ) : 'Create Account'}
                  </motion.button>
                )}
              </div>
            )}

            {/* Social Sign Up (only on step 1) */}
            {currentStep === 1 && (
              <>
                <div className="relative">
                  <div className={`absolute inset-0 flex items-center`}>
                    <div className={`w-full border-t ${darkMode ? 'border-white/10' : 'border-gray-300'
                      }`} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-4 ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-white text-gray-600'
                      }`}>
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SocialButton
                    provider="google"
                    onClick={() => window.location.href = '/api/auth/google'}
                    disabled={loading}
                    darkMode={darkMode}
                  />
                  <SocialButton
                    provider="github"
                    onClick={() => window.location.href = '/api/auth/github'}
                    disabled={loading}
                    darkMode={darkMode}
                  />
                </div>
              </>
            )}
          </form>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
        >
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </div>
  );
}