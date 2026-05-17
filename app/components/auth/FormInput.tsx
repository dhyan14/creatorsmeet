'use client';

import React, { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
    darkMode?: boolean;
}

export default function FormInput({
    label,
    error,
    icon,
    darkMode = true,
    className = '',
    ...props
}: FormInputProps) {
    return (
        <div className="w-full">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {icon}
                    </div>
                )}
                <input
                    {...props}
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${icon ? 'pl-11' : ''
                        } ${error
                            ? 'border-red-500 focus:ring-red-500/50'
                            : darkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                        } focus:outline-none ${className}`}
                />
            </div>
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
