'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconCode, IconBulb } from '@tabler/icons-react';

interface RoleSelectorProps {
    value: 'creator' | 'innovator' | '';
    onChange: (role: 'creator' | 'innovator') => void;
    error?: string;
    darkMode?: boolean;
}

export default function RoleSelector({ value, onChange, error, darkMode = true }: RoleSelectorProps) {
    const roles = [
        {
            id: 'creator' as const,
            title: 'Creator',
            description: 'Developer, Designer, or Maker',
            icon: IconCode,
            gradient: 'from-purple-600 to-blue-600'
        },
        {
            id: 'innovator' as const,
            title: 'Innovator',
            description: 'Idea Person or Entrepreneur',
            icon: IconBulb,
            gradient: 'from-pink-600 to-purple-600'
        }
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = value === role.id;

                    return (
                        <motion.button
                            key={role.id}
                            type="button"
                            onClick={() => onChange(role.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${isSelected
                                ? `border-transparent bg-gradient-to-br ${role.gradient} text-white shadow-lg`
                                : darkMode
                                    ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${isSelected
                                    ? 'bg-white/20'
                                    : darkMode
                                        ? 'bg-white/10'
                                        : 'bg-gray-100'
                                    }`}>
                                    <Icon size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1">{role.title}</h3>
                                    <p className={`text-sm ${isSelected
                                        ? 'text-white/80'
                                        : darkMode
                                            ? 'text-gray-400'
                                            : 'text-gray-600'
                                        }`}>
                                        {role.description}
                                    </p>
                                </div>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
