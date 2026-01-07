'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Author {
    _id: string;
    name: string;
    role: string;
    profileImage?: string;
}

interface Tip {
    _id: string;
    content: string;
    author: Author;
    likes: string[];
    createdAt: string;
}

interface TipFeedProps {
    tips: Tip[];
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(date);
}

export function TipFeed({ tips }: TipFeedProps) {
    if (!tips || tips.length === 0) {
        return (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">No tips yet</h3>
                <p className="text-gray-400">Be the first mentor to share some wisdom!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {tips.map((tip, index) => (
                <motion.div
                    key={tip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group"
                >
                    <div className="flex items-start gap-4">
                        {/* Author Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            {tip.author.profileImage && tip.author.profileImage !== '/default-avatar.png' ? (
                                <img
                                    src={tip.author.profileImage}
                                    alt={tip.author.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-xl font-bold text-white">
                                    {tip.author.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                        {tip.author.name}
                                        <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                            {tip.author.role}
                                        </span>
                                    </h4>
                                    <p className="text-xs text-gray-500">{formatDate(tip.createdAt)}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                {tip.content}
                            </p>

                            {/* Actions (Like - Visual Only for now) */}
                            {/* <div className="mt-4 flex items-center gap-4 text-gray-500">
                <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                  <span className="text-sm">❤️</span>
                  <span className="text-xs">{tip.likes.length}</span>
                </button>
              </div> */}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
