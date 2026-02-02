'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

interface CountrySelectProps {
    value: string;
    onChange: (country: string) => void;
    error?: string;
    darkMode?: boolean;
}

const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'China',
    'Japan', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Switzerland', 'Austria', 'Belgium', 'Poland', 'Portugal', 'Ireland', 'New Zealand',
    'Singapore', 'South Korea', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'Vietnam',
    'Argentina', 'Chile', 'Colombia', 'Peru', 'South Africa', 'Egypt', 'Nigeria', 'Kenya',
    'United Arab Emirates', 'Saudi Arabia', 'Israel', 'Turkey', 'Russia', 'Ukraine', 'Czech Republic'
].sort();

export default function CountrySelect({ value, onChange, error, darkMode = true }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full" ref={dropdownRef}>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Country
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-left flex items-center justify-between ${error
                        ? 'border-red-500 focus:ring-red-500/50'
                        : darkMode
                            ? 'bg-white/10 border-white/20 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                    } focus:outline-none`}
            >
                <span className={value ? '' : darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {value || 'Select your country'}
                </span>
                <IconChevronDown
                    size={20}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute z-50 mt-2 w-full rounded-xl border shadow-2xl overflow-hidden ${darkMode
                                ? 'bg-gray-900 border-white/20'
                                : 'bg-white border-gray-200'
                            }`}
                    >
                        {/* Search */}
                        <div className={`p-3 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                            <div className="relative">
                                <IconSearch
                                    size={18}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search countries..."
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${darkMode
                                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Country List */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                    <button
                                        key={country}
                                        type="button"
                                        onClick={() => {
                                            onChange(country);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={`w-full px-4 py-3 text-left transition-colors ${value === country
                                                ? darkMode
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-purple-100 text-purple-900'
                                                : darkMode
                                                    ? 'text-gray-300 hover:bg-white/5'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {country}
                                    </button>
                                ))
                            ) : (
                                <div className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    No countries found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
