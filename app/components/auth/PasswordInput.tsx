'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    showStrength?: boolean;
    darkMode?: boolean;
    name?: string;
    placeholder?: string;
}

export default function PasswordInput({
    label,
    value,
    onChange,
    error,
    showStrength = false,
    darkMode = true,
    name = 'password',
    placeholder = 'Enter your password'
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    // Password strength calculation
    const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
        return { strength: 4, label: 'Strong', color: 'bg-green-500' };
    };

    const strength = showStrength ? getPasswordStrength(value) : null;

    return (
        <div className="w-full">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all ${error
                            ? 'border-red-500 focus:ring-red-500/50'
                            : darkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                        } focus:outline-none`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${darkMode
                            ? 'text-gray-400 hover:text-gray-300 hover:bg-white/10'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
            </div>

            {/* Password Strength Indicator */}
            {showStrength && value && strength && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                >
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-all ${level <= strength.strength ? strength.color : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Password strength: <span className={`font-medium ${strength.strength === 1 ? 'text-red-400' :
                                strength.strength === 2 ? 'text-yellow-400' :
                                    strength.strength === 3 ? 'text-blue-400' :
                                        'text-green-400'
                            }`}>{strength.label}</span>
                    </p>
                </motion.div>
            )}

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
