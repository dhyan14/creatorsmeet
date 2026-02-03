'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FileExplorer, { type FileNode } from './FileExplorer';
import CodeEditor, { type EditorTab } from './CodeEditor';
import GitPanel, { type GitFile, type GitCommit } from './GitPanel';
import Terminal from './Terminal';
import {
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarRightCollapse,
    IconTerminal2,
    IconGitBranch,
    IconMaximize,
    IconMinimize
} from '@tabler/icons-react';

interface CodespaceLayoutProps {
    darkMode?: boolean;
    onFullscreenChange?: (isFullscreen: boolean) => void;
}

const CodespaceLayout: React.FC<CodespaceLayoutProps> = ({ darkMode = true }) => {
    // State for files and folders
    const [files, setFiles] = useState<FileNode[]>([
        {
            id: '1',
            name: 'src',
            type: 'folder',
            children: [
                {
                    id: '2',
                    name: 'index.tsx',
                    type: 'file',
                    content: '// Welcome to Codespace!\nconsole.log("Hello World");',
                    language: 'typescript'
                }
            ]
        },
        {
            id: '3',
            name: 'package.json',
            type: 'file',
            content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}',
            language: 'json'
        }
    ]);

    // State for open tabs
    const [tabs, setTabs] = useState<EditorTab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    // State for Git
    const [gitFiles, setGitFiles] = useState<GitFile[]>([]);
    const [gitCommits, setGitCommits] = useState<GitCommit[]>([]);
    const [currentBranch, setCurrentBranch] = useState('main');

    // Panel visibility
    const [showExplorer, setShowExplorer] = useState(true);
    const [showGit, setShowGit] = useState(true);
    const [showTerminal, setShowTerminal] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // State to track current GitHub repo
    const [currentGitRepo, setCurrentGitRepo] = useState<{ owner: string; repo: string; branch: string } | null>(null);

    // File operations
    const handleFileSelect = async (file: FileNode) => {
        if (file.type === 'file') {
            // Check if tab already exists
            const existingTab = tabs.find(tab => tab.id === file.id);

            if (existingTab) {
                setActiveTabId(file.id);
            } else {
                let fileContent = file.content || '';
                let language = file.language || 'plaintext';

                // If we have a current GitHub repo and the file doesn't have content yet, fetch it
                if (currentGitRepo && !file.content) {
                    try {
                        const githubToken = sessionStorage.getItem('github_token');
                        if (githubToken) {
                            // Use file id which contains the path information
                            const filePath = file.id.split('-').slice(1).join('-'); // Extract path from id

                            const response = await fetch(
                                `/api/codespace/git/file?owner=${currentGitRepo.owner}&repo=${currentGitRepo.repo}&path=${encodeURIComponent(filePath)}&branch=${currentGitRepo.branch}`,
                                {
                                    headers: {
                                        'x-github-token': githubToken
                                    }
                                }
                            );

                            if (response.ok) {
                                const data = await response.json();
                                fileContent = data.content || '';
                                language = getLanguageFromExtension(file.name);
                            }
                        }
                    } catch (error) {
                        console.error('Failed to fetch file from GitHub:', error);
                        fileContent = `// Failed to load file content from GitHub\n// Error: ${error}`;
                    }
                }

                const newTab: EditorTab = {
                    id: file.id,
                    name: file.name,
                    content: fileContent,
                    language: language,
                    isDirty: false
                };
                setTabs(prev => [...prev, newTab]);
                setActiveTabId(file.id);
            }
        }
    };

    const handleTabClose = (tabId: string) => {
        const tabIndex = tabs.findIndex(t => t.id === tabId);
        setTabs(prev => prev.filter(t => t.id !== tabId));

        if (activeTabId === tabId) {
            if (tabs.length > 1) {
                const newActiveTab = tabIndex > 0 ? tabs[tabIndex - 1] : tabs[tabIndex + 1];
                setActiveTabId(newActiveTab.id);
            } else {
                setActiveTabId(null);
            }
        }
    };

    const handleContentChange = (tabId: string, content: string) => {
        setTabs(prev => prev.map(tab =>
            tab.id === tabId ? { ...tab, content, isDirty: true } : tab
        ));
    };

    const handleSave = async (tabId: string) => {
        const tab = tabs.find(t => t.id === tabId);
        if (!tab) return;

        // Save to backend (implement API call)
        console.log('Saving file:', tab.name, tab.content);

        // Update file content in file tree
        const updateFileContent = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(node => {
                if (node.id === tabId) {
                    return { ...node, content: tab.content };
                }
                if (node.children) {
                    return { ...node, children: updateFileContent(node.children) };
                }
                return node;
            });
        };

        setFiles(updateFileContent(files));

        // Mark as not dirty
        setTabs(prev => prev.map(t =>
            t.id === tabId ? { ...t, isDirty: false } : t
        ));

        // Update Git status
        setGitFiles(prev => {
            const existing = prev.find(f => f.path === tab.name);
            if (existing) {
                return prev;
            }
            return [...prev, { path: tab.name, status: 'modified' }];
        });
    };

    const handleFileCreate = (parentId: string | null, type: 'file' | 'folder', name: string) => {
        const newFile: FileNode = {
            id: Date.now().toString(),
            name,
            type,
            content: type === 'file' ? '' : undefined,
            language: type === 'file' ? getLanguageFromExtension(name) : undefined,
            children: type === 'folder' ? [] : undefined
        };

        if (parentId === null) {
            setFiles(prev => [...prev, newFile]);
        } else {
            const addToParent = (nodes: FileNode[]): FileNode[] => {
                return nodes.map(node => {
                    if (node.id === parentId) {
                        return {
                            ...node,
                            children: [...(node.children || []), newFile]
                        };
                    }
                    if (node.children) {
                        return { ...node, children: addToParent(node.children) };
                    }
                    return node;
                });
            };
            setFiles(addToParent(files));
        }
    };

    const handleFileDelete = (fileId: string) => {
        const removeFile = (nodes: FileNode[]): FileNode[] => {
            return nodes.filter(node => {
                if (node.id === fileId) return false;
                if (node.children) {
                    node.children = removeFile(node.children);
                }
                return true;
            });
        };
        setFiles(removeFile(files));

        // Close tab if open
        if (tabs.some(t => t.id === fileId)) {
            handleTabClose(fileId);
        }
    };

    const handleFileRename = (fileId: string, newName: string) => {
        const renameFile = (nodes: FileNode[]): FileNode[] => {
            return nodes.map(node => {
                if (node.id === fileId) {
                    return { ...node, name: newName, language: getLanguageFromExtension(newName) };
                }
                if (node.children) {
                    return { ...node, children: renameFile(node.children) };
                }
                return node;
            });
        };
        setFiles(renameFile(files));

        // Update tab name if open
        setTabs(prev => prev.map(tab =>
            tab.id === fileId ? { ...tab, name: newName, language: getLanguageFromExtension(newName) } : tab
        ));
    };

    // Git operations
    const handleStage = (filePath: string) => {
        console.log('Staging:', filePath);
    };

    const handleUnstage = (filePath: string) => {
        console.log('Unstaging:', filePath);
    };

    const handleCommit = async (message: string) => {
        if (!currentGitRepo) {
            console.error('No repository connected');
            return;
        }

        // Get all modified (dirty) tabs
        const modifiedTabs = tabs.filter(tab => tab.isDirty);

        if (modifiedTabs.length === 0) {
            console.warn('No modified files to commit');
            return;
        }

        // Prepare files for commit
        const files = modifiedTabs.map(tab => ({
            path: tab.id.split('-').slice(1).join('/'), // Extract path from file id
            content: tab.content
        }));

        try {
            const githubToken = sessionStorage.getItem('github_token');
            if (!githubToken) {
                console.error('GitHub token not found');
                return;
            }

            const response = await fetch('/api/codespace/git/commits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-github-token': githubToken
                },
                body: JSON.stringify({
                    owner: currentGitRepo.owner,
                    repo: currentGitRepo.repo,
                    message,
                    files,
                    branch: currentGitRepo.branch || 'main'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Commit failed:', data.error);
                return;
            }

            console.log('Commit created successfully:', data.sha);

            // Mark tabs as no longer dirty
            setTabs(prev => prev.map(tab =>
                modifiedTabs.find(mt => mt.id === tab.id)
                    ? { ...tab, isDirty: false }
                    : tab
            ));

            // Clear git files (staged files)
            setGitFiles([]);
        } catch (error) {
            console.error('Failed to create commit:', error);
        }
    };

    const handlePush = async () => {
        console.log('Pushing to remote...');
    };

    const handlePull = async () => {
        console.log('Pulling from remote...');
    };

    const handleRefresh = () => {
        console.log('Refreshing Git status...');
    };

    const handleFileTreeLoad = (tree: any[], repoInfo: { owner: string; repo: string; branch: string }) => {
        const convertToFileNodes = (items: any[], parentPath: string = ''): FileNode[] => {
            return items.map((item, index) => {
                const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;
                const node: FileNode = {
                    id: `${repoInfo.repo}-${fullPath}`,
                    name: item.name,
                    type: item.type === 'tree' ? 'folder' : 'file'
                };
                if (item.type === 'tree' && item.children) {
                    node.children = convertToFileNodes(item.children, fullPath);
                }
                return node;
            });
        };
        setFiles(convertToFileNodes(tree));
        setCurrentGitRepo(repoInfo);
    };

    // Terminal operations
    const handleTerminalCommand = async (command: string): Promise<string> => {
        // Implement backend API call
        console.log('Executing command:', command);
        return `Executed: ${command}\nOutput would appear here...`;
    };

    const getLanguageFromExtension = (filename: string): string => {
        const ext = filename.split('.').pop()?.toLowerCase();
        const languageMap: Record<string, string> = {
            ts: 'typescript',
            tsx: 'typescript',
            js: 'javascript',
            jsx: 'javascript',
            py: 'python',
            json: 'json',
            md: 'markdown',
            css: 'css',
            html: 'html',
            yml: 'yaml',
            yaml: 'yaml'
        };
        return languageMap[ext || ''] || 'plaintext';
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // ESC key listener for fullscreen
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullscreen]);

    // File upload handler
    const handleFileUpload = async (uploadedFiles: File[]) => {
        console.log('Uploading files:', uploadedFiles);
        // TODO: Implement file upload API call

        // For now, add files to the tree
        const newFiles: FileNode[] = uploadedFiles.map(file => ({
            id: Date.now().toString() + Math.random(),
            name: file.name,
            type: 'file',
            content: '', // Will be loaded async
            language: getLanguageFromExtension(file.name)
        }));

        setFiles(prev => [...prev, ...newFiles]);
    };

    return (
        <div className={`h-screen flex flex-col ${darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
            {/* Top Bar - Hide in fullscreen */}
            {!isFullscreen && (
                <div className={`h-12 flex items-center justify-between px-4 border-b ${darkMode ? 'bg-[#252526] border-white/10' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center gap-4">
                        <h1 className={`text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                            Codespace
                        </h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowExplorer(!showExplorer)}
                                className={`p-2 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                title={showExplorer ? 'Hide Explorer' : 'Show Explorer'}
                            >
                                <IconLayoutSidebarLeftCollapse size={18} />
                            </button>
                            <button
                                onClick={() => setShowGit(!showGit)}
                                className={`p-2 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                title={showGit ? 'Hide Git Panel' : 'Show Git Panel'}
                            >
                                <IconGitBranch size={18} />
                            </button>
                            <button
                                onClick={() => setShowTerminal(!showTerminal)}
                                className={`p-2 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                title={showTerminal ? 'Hide Terminal' : 'Show Terminal'}
                            >
                                <IconTerminal2 size={18} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={toggleFullscreen}
                            className={`p-2 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                            {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* File Explorer - Hide in fullscreen */}
                {showExplorer && !isFullscreen && (
                    <div className="w-64 border-r border-white/10 flex-shrink-0">
                        <FileExplorer
                            files={files}
                            onFileSelect={handleFileSelect}
                            onFileCreate={handleFileCreate}
                            onFileDelete={handleFileDelete}
                            onFileRename={handleFileRename}
                            onFileUpload={handleFileUpload}
                            selectedFileId={activeTabId || undefined}
                            darkMode={darkMode}
                        />
                    </div>
                )}

                {/* Editor Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className={`flex-1 ${showTerminal ? '' : 'h-full'}`}>
                        <CodeEditor
                            tabs={tabs}
                            activeTabId={activeTabId}
                            onTabChange={setActiveTabId}
                            onTabClose={handleTabClose}
                            onContentChange={handleContentChange}
                            onSave={handleSave}
                            darkMode={darkMode}
                        />
                    </div>

                    {/* Terminal - Hide in fullscreen */}
                    {showTerminal && !isFullscreen && (
                        <div className="h-64 border-t border-white/10">
                            <Terminal
                                onCommand={handleTerminalCommand}
                                darkMode={darkMode}
                            />
                        </div>
                    )}
                </div>

                {/* Git Panel - Hide in fullscreen */}
                {showGit && !isFullscreen && (
                    <div className="w-80 border-l border-white/10 flex-shrink-0">
                        <GitPanel
                            files={gitFiles}
                            commits={gitCommits}
                            currentBranch={currentBranch}
                            onStage={handleStage}
                            onUnstage={handleUnstage}
                            onCommit={handleCommit}
                            onPush={handlePush}
                            onPull={handlePull}
                            onRefresh={handleRefresh}
                            onFileTreeLoad={handleFileTreeLoad}
                            darkMode={darkMode}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodespaceLayout;
