import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceSelectorProps {
    value: 'beginner' | 'intermediate' | 'expert';
    onChange: (value: 'beginner' | 'intermediate' | 'expert') => void;
    darkMode?: boolean;
}

const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({ value, onChange, darkMode = false }) => {
    const levels = [
        {
            value: 'beginner' as const,
            label: 'Beginner',
            description: '0-2 years',
            icon: '🌱'
        },
        {
            value: 'intermediate' as const,
            label: 'Intermediate',
            description: '2-5 years',
            icon: '🚀'
        },
        {
            value: 'expert' as const,
            label: 'Expert',
            description: '5+ years',
            icon: '⭐'
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {levels.map((level) => (
                <motion.button
                    key={level.value}
                    type="button"
                    onClick={() => onChange(level.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${value === level.value
                            ? darkMode
                                ? 'border-purple-500 bg-purple-500/20'
                                : 'border-purple-600 bg-purple-50'
                            : darkMode
                                ? 'border-white/20 bg-white/5 hover:bg-white/10'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                >
                    <div className="text-3xl mb-2">{level.icon}</div>
                    <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {level.label}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {level.description}
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

export default ExperienceSelector;
