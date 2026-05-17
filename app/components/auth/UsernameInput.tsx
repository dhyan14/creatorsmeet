'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCheck, IconX, IconLoader2 } from '@tabler/icons-react';
import { useUsernameAvailability } from '@/hooks/useUsernameAvailability';

interface UsernameInputProps {
    value: string;
    onChange: (value: string) => void;
    darkMode?: boolean;
    className?: string;
    disabled?: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
    value,
    onChange,
    darkMode = false,
    className = '',
    disabled = false
}) => {
    const [focused, setFocused] = useState(false);
    const { checking, available, message } = useUsernameAvailability(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow lowercase letters, numbers, underscores, and hyphens
        const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
        onChange(cleaned);
    };

    const showStatus = value.length >= 3 && !checking;
    const isAvailable = available === true;
    const isTaken = available === false;

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    disabled={disabled}
                    placeholder="username"
                    maxLength={20}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all ${darkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        } ${focused ? 'ring-2 ring-purple-500/50' : ''} ${isAvailable ? 'border-green-500' : ''
                        } ${isTaken ? 'border-red-500' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                />

                {/* Status Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AnimatePresence mode="wait">
                        {checking && (
                            <motion.div
                                key="checking"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <IconLoader2 className="w-5 h-5 text-gray-400 animate-spin" />
                            </motion.div>
                        )}

                        {showStatus && isAvailable && (
                            <motion.div
                                key="available"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <IconCheck className="w-5 h-5 text-green-500" />
                            </motion.div>
                        )}

                        {showStatus && isTaken && (
                            <motion.div
                                key="taken"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <IconX className="w-5 h-5 text-red-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Message */}
            <AnimatePresence>
                {message && value.length >= 3 && !checking && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-2 text-sm ${isAvailable ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Character count */}
            <p className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {value.length}/20 characters
            </p>
        </div>
    );
};

export default UsernameInput;
