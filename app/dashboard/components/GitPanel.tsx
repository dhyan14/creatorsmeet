'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconGitBranch,
    IconGitCommit,
    IconGitPullRequest,
    IconRefresh,
    IconUpload,
    IconDownload,
    IconCirclePlus,
    IconCircleMinus,
    IconCheck,
    IconClock
} from '@tabler/icons-react';

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
    const [view, setView] = useState<'changes' | 'history'>('changes');
    const [stagedFiles, setStagedFiles] = useState<Set<string>>(new Set());

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
                        <button
                            onClick={onRefresh}
                            className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            title="Refresh"
                        >
                            <IconRefresh size={16} />
                        </button>
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
                    </div>
                </div>

                {/* Branch Info */}
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <IconGitBranch size={14} className="text-purple-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentBranch}
                    </span>
                </div>

                {/* View Toggle */}
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
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {view === 'changes' ? (
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
                ) : (
                    <div className="p-3 space-y-2">
                        <h4 className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            COMMIT HISTORY
                        </h4>
                        {commits.map(commit => (
                            <motion.div
                                key={commit.hash}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-3 rounded-lg border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    <IconGitCommit size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {commit.message}
                                        </p>
                                        <div className={`flex items-center gap-3 mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            <span>{commit.author}</span>
                                            <span className="flex items-center gap-1">
                                                <IconClock size={10} />
                                                {new Date(commit.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <code className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {commit.hash.substring(0, 7)}
                                </code>
                            </motion.div>
                        ))}

                        {commits.length === 0 && (
                            <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <IconGitCommit size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No commits yet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitPanel;
export type { GitFile, GitCommit };
