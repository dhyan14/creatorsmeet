'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

interface TechnologySelectorProps {
    selectedTechnologies: string[];
    onChange: (technologies: string[]) => void;
    error?: string;
    darkMode?: boolean;
}

const popularTechnologies = [
    // Frontend
    'React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'TypeScript', 'JavaScript',
    'HTML/CSS', 'Tailwind CSS', 'Redux', 'React Native',

    // Backend
    'Node.js', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET',

    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase',

    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD',

    // Mobile
    'iOS', 'Android', 'Flutter', 'Swift', 'Kotlin',

    // Other
    'GraphQL', 'REST API', 'WebSocket', 'Machine Learning', 'AI', 'Blockchain',
    'Three.js', 'Unity', 'Unreal Engine', 'Game Development'
];

export default function TechnologySelector({
    selectedTechnologies,
    onChange,
    error,
    darkMode = true
}: TechnologySelectorProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [customTech, setCustomTech] = useState('');

    const filteredTechnologies = popularTechnologies.filter(tech =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedTechnologies.includes(tech)
    );

    const toggleTechnology = (tech: string) => {
        if (selectedTechnologies.includes(tech)) {
            onChange(selectedTechnologies.filter(t => t !== tech));
        } else {
            onChange([...selectedTechnologies, tech]);
        }
    };

    const addCustomTech = () => {
        if (customTech.trim() && !selectedTechnologies.includes(customTech.trim())) {
            onChange([...selectedTechnologies, customTech.trim()]);
            setCustomTech('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomTech();
        }
    };

    return (
        <div className="w-full">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Select Your Technologies
                <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    (Choose at least 3)
                </span>
            </label>

            {/* Selected Technologies */}
            {selectedTechnologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTechnologies.map((tech) => (
                        <motion.div
                            key={tech}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium"
                        >
                            {tech}
                            <button
                                type="button"
                                onClick={() => toggleTechnology(tech)}
                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                                <IconX size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Search */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies..."
                className={`w-full px-4 py-3 rounded-xl border mb-4 transition-all ${darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
            />

            {/* Technology Grid */}
            <div className={`max-h-60 overflow-y-auto p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredTechnologies.map((tech) => (
                        <button
                            key={tech}
                            type="button"
                            onClick={() => toggleTechnology(tech)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${darkMode
                                    ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                {filteredTechnologies.length === 0 && searchQuery && (
                    <p className={`text-center py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        No technologies found. Add a custom one below.
                    </p>
                )}
            </div>

            {/* Add Custom Technology */}
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={customTech}
                    onChange={(e) => setCustomTech(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add custom technology..."
                    className={`flex-1 px-4 py-2 rounded-xl border transition-all ${darkMode
                            ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                />
                <button
                    type="button"
                    onClick={addCustomTech}
                    disabled={!customTech.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add
                </button>
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
