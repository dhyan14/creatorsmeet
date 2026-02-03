'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconFolder,
    IconFolderOpen,
    IconFile,
    IconFileCode,
    IconPlus,
    IconDots,
    IconTrash,
    IconEdit,
    IconChevronRight,
    IconChevronDown
} from '@tabler/icons-react';

interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    content?: string;
    language?: string;
}

interface FileExplorerProps {
    files: FileNode[];
    onFileSelect: (file: FileNode) => void;
    onFileCreate: (parentId: string | null, type: 'file' | 'folder', name: string) => void;
    onFileDelete: (fileId: string) => void;
    onFileRename: (fileId: string, newName: string) => void;
    selectedFileId?: string;
    darkMode?: boolean;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
    files,
    onFileSelect,
    onFileCreate,
    onFileDelete,
    onFileRename,
    selectedFileId,
    darkMode = true
}) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: string } | null>(null);
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');

    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(folderId)) {
                next.delete(folderId);
            } else {
                next.add(folderId);
            }
            return next;
        });
    };

    const getFileIcon = (file: FileNode) => {
        if (file.type === 'folder') {
            return expandedFolders.has(file.id) ?
                <IconFolderOpen size={16} className="text-yellow-500" /> :
                <IconFolder size={16} className="text-yellow-500" />;
        }

        const extension = file.name.split('.').pop();
        const iconClass = {
            'ts': 'text-blue-400',
            'tsx': 'text-blue-400',
            'js': 'text-yellow-400',
            'jsx': 'text-yellow-400',
            'py': 'text-green-400',
            'json': 'text-orange-400',
            'md': 'text-gray-400',
            'css': 'text-purple-400',
            'html': 'text-red-400'
        }[extension || ''] || 'text-gray-400';

        return <IconFileCode size={16} className={iconClass} />;
    };

    const renderFileTree = (nodes: FileNode[], level = 0) => {
        return nodes.map(node => (
            <div key={node.id}>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-white/5 rounded-lg transition-colors ${selectedFileId === node.id ? 'bg-purple-500/20' : ''
                        }`}
                    style={{ paddingLeft: `${level * 16 + 8}px` }}
                    onClick={() => {
                        if (node.type === 'folder') {
                            toggleFolder(node.id);
                        } else {
                            onFileSelect(node);
                        }
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ x: e.clientX, y: e.clientY, fileId: node.id });
                    }}
                >
                    {node.type === 'folder' && (
                        <span className="text-gray-400">
                            {expandedFolders.has(node.id) ?
                                <IconChevronDown size={14} /> :
                                <IconChevronRight size={14} />
                            }
                        </span>
                    )}

                    {getFileIcon(node)}

                    {renamingId === node.id ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={() => {
                                if (newName.trim()) {
                                    onFileRename(node.id, newName);
                                }
                                setRenamingId(null);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (newName.trim()) {
                                        onFileRename(node.id, newName);
                                    }
                                    setRenamingId(null);
                                } else if (e.key === 'Escape') {
                                    setRenamingId(null);
                                }
                            }}
                            className={`flex-1 px-2 py-0.5 rounded text-sm ${darkMode
                                    ? 'bg-white/10 text-white border border-white/20'
                                    : 'bg-gray-100 text-gray-900 border border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            autoFocus
                        />
                    ) : (
                        <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {node.name}
                        </span>
                    )}
                </motion.div>

                {node.type === 'folder' && expandedFolders.has(node.id) && node.children && (
                    <div>
                        {renderFileTree(node.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className={`h-full flex flex-col ${darkMode ? 'bg-black/40' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`p-3 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Explorer
                </h3>
                <div className="flex gap-1">
                    <button
                        onClick={() => {
                            const name = prompt('File name:');
                            if (name) onFileCreate(null, 'file', name);
                        }}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        title="New File"
                    >
                        <IconFile size={16} />
                    </button>
                    <button
                        onClick={() => {
                            const name = prompt('Folder name:');
                            if (name) onFileCreate(null, 'folder', name);
                        }}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        title="New Folder"
                    >
                        <IconFolder size={16} />
                    </button>
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto p-2">
                {renderFileTree(files)}
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setContextMenu(null)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`fixed z-50 ${darkMode
                                ? 'bg-gray-900 border-white/20'
                                : 'bg-white border-gray-200'
                            } border rounded-lg shadow-xl py-1 min-w-[160px]`}
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                    >
                        <button
                            onClick={() => {
                                const file = findFileById(files, contextMenu.fileId);
                                if (file) {
                                    setNewName(file.name);
                                    setRenamingId(file.id);
                                }
                                setContextMenu(null);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 ${darkMode
                                    ? 'text-gray-200 hover:bg-white/10'
                                    : 'text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            <IconEdit size={14} />
                            Rename
                        </button>
                        <button
                            onClick={() => {
                                onFileDelete(contextMenu.fileId);
                                setContextMenu(null);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 ${darkMode
                                    ? 'text-red-400 hover:bg-red-500/10'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            <IconTrash size={14} />
                            Delete
                        </button>
                    </motion.div>
                </>
            )}
        </div>
    );
};

// Helper function to find a file by ID
const findFileById = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findFileById(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

export default FileExplorer;
export type { FileNode };
