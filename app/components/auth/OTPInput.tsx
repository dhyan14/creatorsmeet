'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OTPInputProps {
    length?: number;
    onComplete: (otp: string) => void;
    error?: string;
    darkMode?: boolean;
}

export default function OTPInput({
    length = 6,
    onComplete,
    error,
    darkMode = true
}: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        // Take the last character if user types in a filled field
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Trigger complete if all fields filled
        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) {
            onComplete(combinedOtp);
        }

        // Move to next input if value exists
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        if (/^\d+$/.test(pastedData)) {
            const pastedArray = pastedData.slice(0, length).split('');
            const newOtp = [...otp];

            pastedArray.forEach((digit, index) => {
                if (index < length) {
                    newOtp[index] = digit;
                }
            });

            setOtp(newOtp);

            const combinedOtp = newOtp.join('');
            if (combinedOtp.length === length) {
                onComplete(combinedOtp);
            }

            // Focus on the next empty or last input
            const nextIndex = Math.min(pastedArray.length, length - 1);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-2 sm:gap-4 justify-center">
                {otp.map((digit, index) => (
                    <motion.input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${error
                                ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500/50'
                                : darkMode
                                    ? 'bg-white/10 border-white/20 text-white focus:border-purple-500 focus:ring-purple-500/50'
                                    : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500/50'
                            }`}
                    />
                ))}
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-400 font-medium"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
