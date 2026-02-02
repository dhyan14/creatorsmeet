'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconMail, IconPhone, IconRocket } from '@tabler/icons-react';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';
import SocialButton from '../components/auth/SocialButton';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '', // Can be email or phone
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [darkMode] = useState(true); // Can be connected to theme context later

  // Detect if identifier is email or phone
  const getIdentifierType = (value: string): 'email' | 'phone' | 'unknown' => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
    if (/^\+?[\d\s-()]+$/.test(value) && value.replace(/\D/g, '').length >= 10) return 'phone';
    return 'unknown';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or phone number is required';
    } else {
      const type = getIdentifierType(formData.identifier);
      if (type === 'unknown') {
        newErrors.identifier = 'Please enter a valid email or phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // Trigger Google OAuth
    window.location.href = '/api/auth/google';
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    // Trigger GitHub OAuth
    window.location.href = '/api/auth/github';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

      <div className="max-w-md mx-auto">
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
            Welcome Back
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Sign in to continue your journey
          </p>
        </motion.div>

        {/* Sign In Card */}
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
            {/* Email or Phone */}
            <FormInput
              label="Email or Phone Number"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="your@email.com or +1234567890"
              error={errors.identifier}
              darkMode={darkMode}
              icon={getIdentifierType(formData.identifier) === 'email' ? <IconMail size={20} /> : <IconPhone size={20} />}
            />

            {/* Password */}
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              darkMode={darkMode}
              placeholder="Enter your password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${darkMode
                  ? 'bg-red-500/10 border-red-500/50'
                  : 'bg-red-50 border-red-200'
                  }`}
              >
                <p className="text-sm text-red-400">{errors.submit}</p>
              </motion.div>
            )}

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${darkMode ? 'text-gray-600' : 'text-gray-400'
                }`}>
                <div className={`w-full border-t ${darkMode ? 'border-white/10' : 'border-gray-300'
                  }`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-white text-gray-600'
                  }`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <SocialButton
                provider="google"
                onClick={handleGoogleSignIn}
                disabled={loading}
                darkMode={darkMode}
              />
              <SocialButton
                provider="github"
                onClick={handleGitHubSignIn}
                disabled={loading}
                darkMode={darkMode}
              />
            </div>
          </form>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
        >
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign up now
          </Link>
        </motion.p>
      </div>
    </div>
  );
}