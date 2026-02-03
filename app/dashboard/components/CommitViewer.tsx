'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IconGitCommit,
    IconUser,
    IconClock,
    IconLoader2,
    IconRefresh,
    IconExternalLink
} from '@tabler/icons-react';

interface Commit {
    sha: string;
    message: string;
    author: {
        name: string;
        email: string;
        avatar?: string;
    };
    date: string;
    url: string;
}

interface CommitViewerProps {
    owner: string;
    repo: string;
}

const CommitViewer: React.FC<CommitViewerProps> = ({ owner, repo }) => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (owner && repo) {
            fetchCommits();
        }
    }, [owner, repo]);

    const fetchCommits = async () => {
        setLoading(true);
        setError(null);

        try {
            // Get GitHub token from sessionStorage
            const githubToken = sessionStorage.getItem('github_token');

            if (!githubToken) {
                setError('GitHub not connected. Please connect your account first.');
                setLoading(false);
                return;
            }

            const response = await fetch(
                `/api/codespace/git/commits?owner=${owner}&repo=${repo}`,
                {
                    headers: {
                        'x-github-token': githubToken
                    }
                }
            );
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setCommits(data.commits || []);
            }
        } catch (err) {
            setError('Failed to load commits');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        if (days < 365) return `${Math.floor(days / 30)} months ago`;
        return `${Math.floor(days / 365)} years ago`;
    };

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <IconGitCommit className="w-5 h-5" />
                        Commit History
                    </h3>
                    <button
                        onClick={fetchCommits}
                        disabled={loading}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <IconRefresh className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    {owner}/{repo}
                </p>
            </div>

            {/* Commits List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <IconLoader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Loading commits...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center">
                        <p className="text-sm text-red-400">{error}</p>
                        <button
                            onClick={fetchCommits}
                            className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                        >
                            Try again
                        </button>
                    </div>
                ) : commits.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        <p className="text-sm">No commits found</p>
                    </div>
                ) : (
                    <div className="p-2">
                        {commits.map((commit, index) => (
                            <motion.div
                                key={commit.sha}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="mb-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        {commit.author.avatar ? (
                                            <img
                                                src={commit.author.avatar}
                                                alt={commit.author.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <IconUser className="w-4 h-4 text-purple-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Commit  Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white font-medium mb-1 line-clamp-2">
                                            {commit.message.split('\n')[0]}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <IconUser className="w-3 h-3" />
                                                {commit.author.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IconClock className="w-3 h-3" />
                                                {formatDate(commit.date)}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <code className="text-xs bg-white/5 px-2 py-0.5 rounded font-mono text-gray-400">
                                                {commit.sha.substring(0, 7)}
                                            </code>
                                            <a
                                                href={commit.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400 hover:text-purple-300"
                                            >
                                                <IconExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommitViewer;
