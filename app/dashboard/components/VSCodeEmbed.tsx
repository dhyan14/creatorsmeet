'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrandVscode, IconBrandGithub, IconExternalLink, IconCode, IconFolderCode } from '@tabler/icons-react';

export default function VSCodeEmbed() {
    const [useGitHubDev, setUseGitHubDev] = useState(false);

    // github.dev allows iframe embedding, vscode.dev does not
    const githubDevUrl = 'https://github.dev/';
    const vscodeUrl = 'https://vscode.dev/';

    const handleOpenVSCode = () => {
        window.open(vscodeUrl, '_blank', 'noopener,noreferrer');
    };

    const handleOpenGitHubDev = () => {
        setUseGitHubDev(true);
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
            {/* Header Bar - VSCode Style */}
            <div className="bg-[#333333] border-b border-[#2d2d30] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconBrandVscode className="w-5 h-5 text-[#007acc]" />
                    <span className="text-sm font-medium text-white">
                        {useGitHubDev ? 'GitHub.dev' : 'Visual Studio Code'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {!useGitHubDev && (
                        <button
                            onClick={handleOpenGitHubDev}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#007acc] text-white hover:bg-[#005a9e] rounded transition-colors"
                        >
                            <IconBrandGithub className="w-4 h-4" />
                            Use GitHub.dev (Embedded)
                        </button>
                    )}
                    <button
                        onClick={handleOpenVSCode}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                        <IconExternalLink className="w-4 h-4" />
                        Open VSCode in New Tab
                    </button>
                </div>
            </div>

            {/* Main Content */}
            {useGitHubDev ? (
                // GitHub.dev iframe (works!)
                <div className="flex-1">
                    <iframe
                        src={githubDevUrl}
                        className="w-full h-full border-0"
                        allow="clipboard-read; clipboard-write"
                        title="GitHub.dev"
                    />
                </div>
            ) : (
                // VSCode launcher UI (since iframe doesn't work)
                <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] p-8">
                    <div className="max-w-2xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <IconBrandVscode className="w-24 h-24 text-[#007acc] mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">
                                Launch VS Code
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Choose how you want to code
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* VSCode.dev Option */}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                onClick={handleOpenVSCode}
                                className="group bg-[#252526] hover:bg-[#2d2d30] border border-[#007acc]/30 hover:border-[#007acc] rounded-xl p-6 text-left transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#007acc]/20 p-3 rounded-lg group-hover:bg-[#007acc]/30 transition-colors">
                                        <IconBrandVscode className="w-8 h-8 text-[#007acc]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                            VSCode.dev
                                            <IconExternalLink className="w-4 h-4 text-gray-400" />
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3">
                                            Full VS Code experience with extensions marketplace
                                        </p>
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <span>✓ Extensions support</span>
                                            <span>✓ Settings sync</span>
                                            <span>✓ GitHub integration</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            {/* GitHub.dev Option */}
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={handleOpenGitHubDev}
                                className="group bg-[#252526] hover:bg-[#2d2d30] border border-purple-500/30 hover:border-purple-500 rounded-xl p-6 text-left transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                        <IconBrandGithub className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                            GitHub.dev
                                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Embedded</span>
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3">
                                            Lightweight editor, works directly in this window
                                        </p>
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <span>✓ Fast & embedded</span>
                                            <span>✓ GitHub repos</span>
                                            <span>✓ No new tab needed</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 bg-[#252526] border border-[#3c3c3c] rounded-lg p-4"
                        >
                            <div className="flex items-start gap-3">
                                <IconFolderCode className="w-5 h-5 text-[#007acc] mt-0.5" />
                                <div>
                                    <h4 className="text-white text-sm font-medium mb-1">Quick Tip</h4>
                                    <p className="text-gray-400 text-xs">
                                        Both editors support GitHub repositories. Use <span className="text-white font-mono">Cmd/Ctrl + Shift + P</span> to access the command palette.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
}
