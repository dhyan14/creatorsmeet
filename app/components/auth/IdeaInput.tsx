'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconSparkles, IconLoader2 } from '@tabler/icons-react';

interface IdeaInputProps {
    value: string;
    onChange: (value: string) => void;
    onAnalyze?: (idea: string) => Promise<string[]>;
    error?: string;
    darkMode?: boolean;
    extractedTechnologies?: string[];
}

export default function IdeaInput({
    value,
    onChange,
    onAnalyze,
    error,
    darkMode = true,
    extractedTechnologies = []
}: IdeaInputProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!value.trim() || !onAnalyze) return;

        setIsAnalyzing(true);
        try {
            await onAnalyze(value);
        } catch (error) {
            console.error('Failed to analyze idea:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="w-full">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Describe Your Idea
                <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    (Be specific about features and functionality)
                </span>
            </label>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={8}
                maxLength={2000}
                placeholder="Example: I want to build a mobile app that helps people find local farmers markets. Users should be able to browse markets by location, see vendor lists, save favorites, and get notifications for special events. The app should have a clean map interface and allow vendors to update their product availability in real-time..."
                className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : darkMode
                            ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                    } focus:outline-none`}
            />

            <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {wordCount} words | {value.length}/2000 characters
                </p>

                {onAnalyze && value.trim().length > 50 && (
                    <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <>
                                <IconLoader2 size={16} className="animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <IconSparkles size={16} />
                                Analyze with AI
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Extracted Technologies */}
            {extractedTechnologies.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl border ${darkMode
                            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30'
                            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                        }`}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <IconSparkles size={18} className="text-purple-400" />
                        <h4 className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'
                            }`}>
                            AI-Detected Technologies
                        </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {extractedTechnologies.map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                    <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        We'll match you with creators who have these skills
                    </p>
                </motion.div>
            )}

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}

            <div className={`mt-4 p-4 rounded-xl border ${darkMode
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    <strong>Tips:</strong> Describe the problem you're solving, key features, target users, and any technical requirements. The more details you provide, the better we can match you with the right creators!
                </p>
            </div>
        </div>
    );
}
