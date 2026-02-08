import React from 'react';
import { motion } from 'framer-motion';

interface AvailabilitySelectorProps {
    value: 'available' | 'busy' | 'not-available';
    onChange: (value: 'available' | 'busy' | 'not-available') => void;
    darkMode?: boolean;
}

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({ value, onChange, darkMode = false }) => {
    const options = [
        {
            value: 'available' as const,
            label: 'Available',
            description: 'Ready to collaborate',
            emoji: '✅',
            color: 'green'
        },
        {
            value: 'busy' as const,
            label: 'Busy',
            description: 'Limited availability',
            emoji: '⚠️',
            color: 'yellow'
        },
        {
            value: 'not-available' as const,
            label: 'Not Available',
            description: 'Not looking currently',
            emoji: '🚫',
            color: 'red'
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
                <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${value === option.value
                            ? darkMode
                                ? `border-${option.color}-500 bg-${option.color}-500/20`
                                : `border-${option.color}-600 bg-${option.color}-50`
                            : darkMode
                                ? 'border-white/20 bg-white/5 hover:bg-white/10'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {option.label}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {option.description}
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

export default AvailabilitySelector;
