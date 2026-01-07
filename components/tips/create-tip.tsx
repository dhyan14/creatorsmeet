'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconSend, IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export function CreateTip() {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/tips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to post tip');
            }

            setContent('');
            router.refresh(); // Refresh to show the new tip in the feed

            // Optional: Show success toast/message here
        } catch (err) {
            console.error('Error posting tip:', err);
            setError(err instanceof Error ? err.message : 'Failed to post tip');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> Share a Mentor Tip
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your wisdom with the community... (max 280 chars)"
                        maxLength={280}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 min-h-[100px] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                        required
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {content.length}/280
                    </div>
                </div>

                {error && (
                    <div className="mt-3 text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || !content.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <IconLoader2 className="w-5 h-5 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <>
                                <IconSend className="w-5 h-5" />
                                <span>Post Tip</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
