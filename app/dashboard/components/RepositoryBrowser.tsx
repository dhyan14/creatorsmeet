'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IconSearch,
    IconGitBranch,
    IconStar,
    IconLock,
    IconWorld,
    IconLoader2,
    IconRefresh
} from '@tabler/icons-react';

interface Repository {
    id: number;
    name: string;
    fullName: string;
    owner: string;
    private: boolean;
    description: string | null;
    url: string;
    defaultBranch: string;
    updatedAt: string;
}

interface RepositoryBrowserProps {
    onSelectRepo: (owner: string, repo: string, branch: string) => void;
    selectedRepo?: { owner: string; repo: string };
}

const RepositoryBrowser: React.FC<RepositoryBrowserProps> = ({
    onSelectRepo,
    selectedRepo
}) => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRepositories();
    }, []);

    const fetchRepositories = async () => {
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

            const response = await fetch('/api/codespace/git/repositories', {
                headers: {
                    'x-github-token': githubToken
                }
            });
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setRepositories(data.repositories || []);
            }
        } catch (err) {
            setError('Failed to load repositories');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectRepo = (repo: Repository) => {
        onSelectRepo(repo.owner, repo.name, repo.defaultBranch);
    };

    const filteredRepos = repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-gray-900">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-white flex-1">
                        Your Repositories
                    </h3>
                    <button
                        onClick={fetchRepositories}
                        disabled={loading}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <IconRefresh className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search repositories..."
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                </div>
            </div>

            {/* Repository List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <IconLoader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Loading repositories...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center">
                        <p className="text-sm text-red-400">{error}</p>
                        <button
                            onClick={fetchRepositories}
                            className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredRepos.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        <p className="text-sm">No repositories found</p>
                    </div>
                ) : (
                    <div className="p-2 space-y-2">
                        {filteredRepos.map((repo) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => handleSelectRepo(repo)}
                                className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRepo?.owner === repo.owner && selectedRepo?.repo === repo.name
                                    ? 'bg-purple-500/20 border-2 border-purple-500/50'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                            {repo.name}
                                            {repo.private ? (
                                                <IconLock className="w-3 h-3 text-yellow-400" />
                                            ) : (
                                                <IconWorld className="w-3 h-3 text-gray-400" />
                                            )}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {repo.owner}
                                        </p>
                                    </div>
                                </div>

                                {repo.description && (
                                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                        {repo.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <IconGitBranch className="w-3 h-3" />
                                        {repo.defaultBranch}
                                    </span>
                                    <span>
                                        Updated {new Date(repo.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepositoryBrowser;
