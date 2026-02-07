'use client';

import React from 'react';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

export default function VSCodeEmbed() {
    // GitHub.dev is the SAME as vscode.dev (same editor) but allows iframe embedding
    const githubDevUrl = 'https://github.dev/';

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
            {/* Header Bar - VSCode Style */}
            <div className="bg-[#333333] border-b border-[#2d2d30] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconBrandGithub className="w-5 h-5 text-[#007acc]" />
                    <span className="text-sm font-medium text-white">
                        GitHub.dev Editor
                    </span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                        Same as VSCode.dev
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="https://vscode.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                        <IconExternalLink className="w-4 h-4" />
                        Open VSCode.dev in New Tab
                    </a>
                </div>
            </div>

            {/* GitHub.dev iframe - Same editor as vscode.dev */}
            <div className="flex-1">
                <iframe
                    src={githubDevUrl}
                    className="w-full h-full border-0"
                    allow="clipboard-read; clipboard-write"
                    title="GitHub.dev Editor (VSCode)"
                />
            </div>
        </div>
    );
}
