'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconBrandGithub,
    IconX,
    IconCheck,
    IconAlertCircle,
    IconLoader2
} from '@tabler/icons-react';

interface GitConnectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (username: string) => void;
    isConnected: boolean;
    githubUsername?: string;
}

const GitConnectionDialog: React.FC<GitConnectionDialogProps> = ({
    isOpen,
    onClose,
    onConnect,
    isConnected,
    githubUsername
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConnect = async () => {
        setLoading(true);
        setError(null);

        try {
            // Get auth URL from API
            const response = await fetch('/api/codespace/git/connect');
            const data = await response.json();

            if (data.authUrl) {
                // Open OAuth popup
                const width = 600;
                const height = 700;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;

                const popup = window.open(
                    data.authUrl,
                    'GitHub OAuth',
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                // Listen for OAuth completion via postMessage
                const handleMessage = (event: MessageEvent) => {
                    if (event.data.type === 'github_oauth_success') {
                        // Store token in sessionStorage
                        sessionStorage.setItem('github_token', event.data.token);
                        sessionStorage.setItem('github_username', event.data.username);

                        // Update UI
                        onConnect(event.data.username);
                        setLoading(false);
                        onClose();

                        // Clean up
                        window.removeEventListener('message', handleMessage);
                    } else if (event.data.type === 'github_oauth_error') {
                        setError(event.data.error || 'Failed to connect to GitHub');
                        setLoading(false);
                        window.removeEventListener('message', handleMessage);
                    }
                };

                window.addEventListener('message', handleMessage);

                // Also check if popup was closed manually
                const checkPopup = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(checkPopup);
                        window.removeEventListener('message', handleMessage);
                        setLoading(false);
                    }
                }, 500);
            }
        } catch (err) {
            setError('Failed to connect to GitHub');
            setLoading(false);
        }
    };

    const checkConnection = async () => {
        try {
            const response = await fetch('/api/user/me');
            const data = await response.json();

            if (data.githubUsername) {
                onConnect(data.githubUsername);
                onClose();
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to verify connection');
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setLoading(true);
        try {
            await fetch('/api/codespace/git/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'disconnect' })
            });
            onConnect('');
            setLoading(false);
        } catch (err) {
            setError('Failed to disconnect');
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-white/10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <IconBrandGithub className="w-6 h-6" />
                                    GitHub Connection
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <IconX className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
                                    >
                                        <IconAlertCircle className="w-5 h-5 text-red-400" />
                                        <span className="text-sm text-red-400">{error}</span>
                                    </motion.div>
                                )}

                                {isConnected ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <IconCheck className="w-5 h-5 text-green-400" />
                                                <span className="text-sm font-medium text-green-400">
                                                    Connected to GitHub
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                @{githubUsername}
                                            </p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleDisconnect}
                                            disabled={loading}
                                            className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <IconLoader2 className="w-5 h-5 animate-spin" />
                                                    Disconnecting...
                                                </>
                                            ) : (
                                                'Disconnect GitHub'
                                            )}
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-400">
                                            Connect your GitHub account to access repositories, view commits, and push changes directly from Codespace.
                                        </p>

                                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                            <h3 className="text-sm font-medium text-purple-400 mb-2">
                                                Permissions Required:
                                            </h3>
                                            <ul className="text-xs text-gray-400 space-y-1">
                                                <li>• Read and write repository access</li>
                                                <li>• View profile information</li>
                                            </ul>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConnect}
                                            disabled={loading}
                                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <IconLoader2 className="w-5 h-5 animate-spin" />
                                                    Connecting...
                                                </>
                                            ) : (
                                                <>
                                                    <IconBrandGithub className="w-5 h-5" />
                                                    Connect with GitHub
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GitConnectionDialog;
