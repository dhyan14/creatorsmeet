'use client';

import React, { useState } from 'react';
import { IconBrandVscode, IconMaximize, IconMinimize } from '@tabler/icons-react';

export default function VSCodeEmbed() {
    // Custom domain for code-server
    const codeServerUrl = 'https://codespace.creatorsmeet.in';
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} w-full bg-[#1e1e1e] flex flex-col`}>
            {/* Header Bar - VSCode Style */}
            <div className="bg-[#333333] border-b border-[#2d2d30] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconBrandVscode className="w-5 h-5 text-[#007acc]" />
                    <span className="text-sm font-medium text-white">
                        CreatorsMeet Workspace
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                        {isFullscreen ? (
                            <>
                                <IconMinimize className="w-4 h-4" />
                                Exit Fullscreen
                            </>
                        ) : (
                            <>
                                <IconMaximize className="w-4 h-4" />
                                Fullscreen
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code-Server iframe */}
            <div className="flex-1">
                <iframe
                    src={codeServerUrl}
                    className="w-full h-full border-0"
                    allow="clipboard-read; clipboard-write"
                    title="CreatorsMeet Workspace"
                />
            </div>
        </div>
    );
}
