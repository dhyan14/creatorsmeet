'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconBrandVscode, IconExternalLink, IconCode } from '@tabler/icons-react';

export default function VSCodeEmbed() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // VSCode.dev URL with your GitHub repo
    // You can customize this to open a specific repo
    const vscodeUrl = 'https://vscode.dev/';

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
            {/* Header Bar - VSCode Style */}
            <div className="bg-[#333333] border-b border-[#2d2d30] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconBrandVscode className="w-5 h-5 text-[#007acc]" />
                    <span className="text-sm font-medium text-white">
                        Visual Studio Code
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={vscodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                        <IconExternalLink className="w-4 h-4" />
                        Open in New Tab
                    </a>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="mb-4"
                        >
                            <IconCode className="w-16 h-16 text-[#007acc] mx-auto" />
                        </motion.div>
                        <p className="text-white text-lg font-medium mb-2">
                            Loading VS Code
                        </p>
                        <p className="text-gray-400 text-sm">
                            Preparing your development environment...
                        </p>
                    </motion.div>
                </div>
            )}

            {/* VSCode iframe */}
            <div className={`flex-1 ${loading ? 'hidden' : 'block'}`}>
                <iframe
                    src={vscodeUrl}
                    className="w-full h-full border-0"
                    allow="clipboard-read; clipboard-write; cross-origin-isolated"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-presentation allow-top-navigation-by-user-activation"
                    title="Visual Studio Code"
                />
            </div>

            {/* Instructions Overlay (shown on first load) */}
            {!loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-[#252526] border border-[#007acc] rounded-lg p-6 max-w-md text-center">
                        <IconBrandVscode className="w-12 h-12 text-[#007acc] mx-auto mb-4" />
                        <h3 className="text-white text-lg font-semibold mb-2">
                            Welcome to VS Code
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Click "Open Folder" or "Clone Repository" to get started with your project.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                            <span>✓</span>
                            <span>Full GitHub integration</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
