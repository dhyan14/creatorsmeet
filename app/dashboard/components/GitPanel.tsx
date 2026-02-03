'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconGitBranch,
    IconGitCommit,
    IconRefresh,
    IconUpload,
    IconDownload,
    IconCirclePlus,
    IconCircleMinus,
    IconCheck,
    IconClock,
    IconBrandGithub,
    IconPlugConnected,
    IconFolderCode
} from '@tabler/icons-react';
import GitConnectionDialog from './GitConnectionDialog';
import RepositoryBrowser from './RepositoryBrowser';
import CommitViewer from './CommitViewer';

interface GitFile {
    path: string;
    status: 'modified' | 'added' | 'deleted' | 'untracked';
}

interface GitCommit {
    hash: string;
    message: string;
    author: string;
    date: Date;
}

interface GitPanelProps {
    files: GitFile[];
    commits: GitCommit[];
    currentBranch: string;
    onStage: (filePath: string) => void;
    onUnstage: (filePath: string) => void;
    onCommit: (message: string) => void;
    onPush: () => void;
    onPull: () => void;
    onRefresh: () => void;
    onFileTreeLoad?: (tree: any[], repoInfo: { owner: string; repo: string; branch: string }) => void;
    darkMode?: boolean;
}

const GitPanel: React.FC<GitPanelProps> = ({
    files,
    commits,
    currentBranch,
    onStage,
    onUnstage,
    onCommit,
    onPush,
    onPull,
    onRefresh,
    darkMode = true
}) => {
    const [commitMessage, setCommitMessage] = useState('');
    const [view, setView] = useState<'connect' | 'repositories' | 'changes' | 'history'>('connect');
    const [stagedFiles, setStagedFiles] = useState<Set<string>>(new Set());

    // Git connection state
    const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
    const [isGitConnected, setIsGitConnected] = useState(false);
    const [githubUsername, setGithubUsername] = useState<string | undefined>();
    const [connectedRepo, setConnectedRepo] = useState<{ owner: string, name: string } | null>(null);

    // Check connection status on mount
    useEffect(() => {
        checkGitConnection();
    }, []);

    const checkGitConnection = async () => {
        try {
            const response = await fetch('/api/codespace/git/connect');
            const data = await response.json();
            if (data.connected && data.username) {
                setIsGitConnected(true);
                setGithubUsername(data.username);
                setView('repositories');
            }
        } catch (error) {
            console.error('Failed to check Git connection:', error);
        }
    };

    const handleGitConnect = async (username: string) => {
        setIsGitConnected(true);
        setGithubUsername(username);
        setView('repositories');
        setIsConnectDialogOpen(false);
    };

    const handleGitDisconnect = async () => {
        try {
            await fetch('/api/codespace/git/connect', { method: 'POST' });
            setIsGitConnected(false);
            setGithubUsername(undefined);
            setConnectedRepo(null);
            setView('connect');
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    const handleRepositorySelect = async (owner: string, repo: string, branch: string) => {
        setConnectedRepo({ owner, name: repo });

        // Fetch repository file tree
        try {
            const githubToken = sessionStorage.getItem('github_token');
            if (githubToken) {
                const response = await fetch(
                    `/api/codespace/git/tree?owner=${owner}&repo=${repo}&branch=${branch}`,
                    {
                        headers: {
                            'x-github-token': githubToken
                        }
                    }
                );
                const data = await response.json();

                if (data.tree && onFileTreeLoad) {
                    // Notify parent component (CodespaceLayout) to load files
                    onFileTreeLoad(data.tree, { owner, repo, branch });
                }
            }
        } catch (error) {
            console.error('Failed to load repository tree:', error);
        }

        setView('changes');
    };

    const handleStage = (filePath: string) => {
        setStagedFiles(prev => new Set(prev).add(filePath));
        onStage(filePath);
    };

    const handleUnstage = (filePath: string) => {
        setStagedFiles(prev => {
            const next = new Set(prev);
            next.delete(filePath);
            return next;
        });
        onUnstage(filePath);
    };

    const handleCommit = () => {
        if (commitMessage.trim() && stagedFiles.size > 0) {
            onCommit(commitMessage);
            setCommitMessage('');
            setStagedFiles(new Set());
        }
    };

    const getStatusIcon = (status: GitFile['status']) => {
        const icons = {
            modified: <IconCirclePlus size={14} className="text-yellow-500" />,
            added: <IconCirclePlus size={14} className="text-green-500" />,
            deleted: <IconCircleMinus size={14} className="text-red-500" />,
            untracked: <IconCirclePlus size={14} className="text-blue-500" />
        };
        return icons[status];
    };

    const getStatusText = (status: GitFile['status']) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className={`h-full flex flex-col ${darkMode ? 'bg-black/40' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`p-3 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-semibold flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <IconGitBranch size={16} />
                        Source Control
                    </h3>
                    <div className="flex gap-1">
                        {isGitConnected ? (
                            <>
                                <button
                                    onClick={onRefresh}
                                    className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                    title="Refresh"
                                >
                                    <IconRefresh size={16} />
                                </button>
                                {connectedRepo && (
                                    <>
                                        <button
                                            onClick={onPull}
                                            className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                            title="Pull"
                                        >
                                            <IconDownload size={16} />
                                        </button>
                                        <button
                                            onClick={onPush}
                                            className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                            title="Push"
                                        >
                                            <IconUpload size={16} />
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() => setIsConnectDialogOpen(true)}
                                className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-1 transition-colors"
                            >
                                <IconPlugConnected size={14} />
                                Connect Git
                            </button>
                        )}
                    </div>
                </div>

                {/* Connection Status */}
                {isGitConnected && githubUsername && (
                    <div className={`flex items-center gap-2 px-2 py-1.5 rounded mb-2 ${darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                        <IconBrandGithub size={14} className="text-green-500" />
                        <span className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                            Connected as {githubUsername}
                        </span>
                    </div>
                )}

                {/* Repository Info */}
                {connectedRepo && (
                    <div className={`flex items-center gap-2 px-2 py-1.5 rounded mb-2 ${darkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}>
                        <IconFolderCode size={14} className="text-purple-500" />
                        <span className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                            {connectedRepo.owner}/{connectedRepo.name}
                        </span>
                    </div>
                )}

                {/* Branch Info */}
                {connectedRepo && (
                    <div className={`flex items-center gap-2 px-2 py-1.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <IconGitBranch size={14} className="text-purple-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {currentBranch}
                        </span>
                    </div>
                )}

                {/* View Toggle (only show if connected to repo) */}
                {connectedRepo && (
                    <div className={`flex gap-2 mt-3 p-1 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <button
                            onClick={() => setView('changes')}
                            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${view === 'changes'
                                ? 'bg-purple-600 text-white'
                                : darkMode
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Changes
                        </button>
                        <button
                            onClick={() => setView('history')}
                            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${view === 'history'
                                ? 'bg-purple-600 text-white'
                                : darkMode
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            History
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    {!isGitConnected ? (
                        <motion.div
                            key="connect"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center p-6 text-center"
                        >
                            <IconBrandGithub className={`w-16 h-16 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                            <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Connect to GitHub
                            </h4>
                            <p className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                Link your GitHub account to clone repositories and commit changes
                            </p>
                            <button
                                onClick={() => setIsConnectDialogOpen(true)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <IconPlugConnected size={16} />
                                Connect GitHub Account
                            </button>
                        </motion.div>
                    ) : view === 'repositories' ? (
                        <motion.div
                            key="repositories"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <RepositoryBrowser
                                onSelectRepo={handleRepositorySelect}
                            />
                        </motion.div>
                    ) : view === 'changes' ? (
                        <motion.div
                            key="changes"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full overflow-y-auto"
                        >
                            <div className="p-3 space-y-4">
                                {/* Commit Section */}
                                <div>
                                    <textarea
                                        value={commitMessage}
                                        onChange={(e) => setCommitMessage(e.target.value)}
                                        placeholder="Commit message..."
                                        className={`w-full px-3 py-2 rounded-lg text-sm resize-none ${darkMode
                                            ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500'
                                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        rows={3}
                                    />
                                    <button
                                        onClick={handleCommit}
                                        disabled={!commitMessage.trim() || stagedFiles.size === 0}
                                        className={`w-full mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${commitMessage.trim() && stagedFiles.size > 0
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : darkMode
                                                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <IconGitCommit size={16} className="inline mr-2" />
                                        Commit ({stagedFiles.size})
                                    </button>
                                </div>

                                {/* Staged Changes */}
                                {stagedFiles.size > 0 && (
                                    <div>
                                        <h4 className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            STAGED CHANGES ({stagedFiles.size})
                                        </h4>
                                        <div className="space-y-1">
                                            {files.filter(f => stagedFiles.has(f.path)).map(file => (
                                                <motion.div
                                                    key={file.path}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 group ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        {getStatusIcon(file.status)}
                                                        <span className="text-xs truncate">{file.path}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnstage(file.path)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-opacity"
                                                        title="Unstage"
                                                    >
                                                        <IconCircleMinus size={12} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Unstaged Changes */}
                                {files.filter(f => !stagedFiles.has(f.path)).length > 0 && (
                                    <div>
                                        <h4 className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            CHANGES ({files.filter(f => !stagedFiles.has(f.path)).length})
                                        </h4>
                                        <div className="space-y-1">
                                            {files.filter(f => !stagedFiles.has(f.path)).map(file => (
                                                <motion.div
                                                    key={file.path}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 group ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        {getStatusIcon(file.status)}
                                                        <span className="text-xs truncate">{file.path}</span>
                                                        <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            {getStatusText(file.status)}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleStage(file.path)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-opacity"
                                                        title="Stage"
                                                    >
                                                        <IconCirclePlus size={12} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {files.length === 0 && (
                                    <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <IconCheck size={32} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No changes</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : view === 'history' && connectedRepo ? (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <CommitViewer
                                owner={connectedRepo.owner}
                                repo={connectedRepo.name}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Git Connection Dialog */}
            <GitConnectionDialog
                isOpen={isConnectDialogOpen}
                onClose={() => setIsConnectDialogOpen(false)}
                onConnect={handleGitConnect}
                isConnected={isGitConnected}
                githubUsername={githubUsername}
            />
        </div>
    );
};

export default GitPanel;
export type { GitFile, GitCommit };
