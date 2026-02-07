'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconHeart,
    IconMessage,
    IconBookmark,
    IconShare,
    IconTrendingUp,
    IconSparkles,
    IconAward,
    IconUsers,
    IconBulb,
    IconPlus,
} from '@tabler/icons-react';

interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
        role: 'mentor' | 'creator' | 'developer';
        verified: boolean;
    };
    content: string;
    category: 'motivation' | 'tip' | 'announcement' | 'success';
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked: boolean;
    isBookmarked: boolean;
}

export default function CommunityView() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            author: {
                name: 'Alex Morgan',
                avatar: 'AM',
                role: 'mentor',
                verified: true
            },
            content: "🚀 Remember: Every expert was once a beginner. Don't let imposter syndrome hold you back. Your unique perspective is valuable, and the tech world needs diverse voices. Keep building, keep learning! #MondayMotivation",
            category: 'motivation',
            likes: 127,
            comments: 23,
            timeAgo: '2 hours ago',
            isLiked: false,
            isBookmarked: false
        },
        {
            id: '2',
            author: {
                name: 'Sarah Chen',
                avatar: 'SC',
                role: 'mentor',
                verified: true
            },
            content: "💡 Pro Tip: When working with clients, always under-promise and over-deliver. Set realistic deadlines and exceed expectations. This builds trust and leads to better reviews and repeat business. #DeveloperTips",
            category: 'tip',
            likes: 89,
            comments: 15,
            timeAgo: '5 hours ago',
            isLiked: true,
            isBookmarked: true
        },
        {
            id: '3',
            author: {
                name: 'David Kim',
                avatar: 'DK',
                role: 'creator',
                verified: false
            },
            content: "🎉 Big milestone! Just hit 100K subscribers and launched my first app with an amazing developer from this platform. Collaboration is the key to success! Thank you CreatorsMeet community! 🙌",
            category: 'success',
            likes: 234,
            comments: 45,
            timeAgo: '1 day ago',
            isLiked: true,
            isBookmarked: false
        }
    ]);

    const toggleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const toggleBookmark = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ));
    };

    const getCategoryColor = (category: Post['category']) => {
        switch (category) {
            case 'motivation': return 'from-purple-500 to-pink-500';
            case 'tip': return 'from-blue-500 to-cyan-500';
            case 'announcement': return 'from-orange-500 to-red-500';
            case 'success': return 'from-green-500 to-emerald-500';
        }
    };

    const getCategoryIcon = (category: Post['category']) => {
        switch (category) {
            case 'motivation': return <IconSparkles className="w-4 h-4" />;
            case 'tip': return <IconBulb className="w-4 h-4" />;
            case 'announcement': return <IconTrendingUp className="w-4 h-4" />;
            case 'success': return <IconAward className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
                    <p className="text-gray-400">Get inspired and share your thoughts</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
                >
                    <IconPlus className="w-5 h-5" />
                    Create Post
                </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <IconUsers className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">1,234</p>
                            <p className="text-sm text-gray-400">Community Members</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <IconMessage className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">567</p>
                            <p className="text-sm text-gray-400">Posts This Week</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <IconAward className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">89</p>
                            <p className="text-sm text-gray-400">Success Stories</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                    >
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(post.category)} flex items-center justify-center text-white font-bold`}>
                                    {post.author.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-semibold">{post.author.name}</h3>
                                        {post.author.verified && (
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                                </svg>
                                            </div>
                                        )}
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.author.role === 'mentor' ? 'bg-purple-500/20 text-purple-400' :
                                                post.author.role === 'creator' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-green-500/20 text-green-400'
                                            }`}>
                                            {post.author.role}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">{post.timeAgo}</p>
                                </div>
                            </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                        {/* Post Actions */}
                        <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleLike(post.id)}
                                className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                                    }`}
                            >
                                <IconHeart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                <span className="text-sm font-medium">{post.likes}</span>
                            </motion.button>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                                <IconMessage className="w-5 h-5" />
                                <span className="text-sm font-medium">{post.comments}</span>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleBookmark(post.id)}
                                className={`flex items-center gap-2 transition-colors ${post.isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                                    }`}
                            >
                                <IconBookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                            </motion.button>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors ml-auto">
                                <IconShare className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
