'use client';

import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import {
    IconX,
    IconDeviceFloppy,
    IconCode,
    IconBrandJavascript,
    IconBrandTypescript,
    IconBrandPython,
    IconFile
} from '@tabler/icons-react';

interface EditorTab {
    id: string;
    name: string;
    content: string;
    language: string;
    isDirty: boolean;
}

interface CodeEditorProps {
    tabs: EditorTab[];
    activeTabId: string | null;
    onTabChange: (tabId: string) => void;
    onTabClose: (tabId: string) => void;
    onContentChange: (tabId: string, content: string) => void;
    onSave: (tabId: string) => void;
    darkMode?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    tabs,
    activeTabId,
    onTabChange,
    onTabClose,
    onContentChange,
    onSave,
    darkMode = true
}) => {
    const editorRef = useRef<any>(null);
    const activeTab = tabs.find(tab => tab.id === activeTabId);

    const getLanguageIcon = (language: string) => {
        const icons: Record<string, JSX.Element> = {
            javascript: <IconBrandJavascript size={14} className="text-yellow-400" />,
            typescript: <IconBrandTypescript size={14} className="text-blue-400" />,
            python: <IconBrandPython size={14} className="text-green-400" />,
        };
        return icons[language] || <IconFile size={14} className="text-gray-400" />;
    };

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;

        // Add keyboard shortcuts using editor's addAction method
        editor.addAction({
            id: 'save-file',
            label: 'Save File',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
            run: () => {
                if (activeTabId) {
                    onSave(activeTabId);
                }
            }
        });
    };

    const handleEditorChange = (value: string | undefined) => {
        if (activeTabId && value !== undefined) {
            onContentChange(activeTabId, value);
        }
    };

    return (
        <div className={`h-full flex flex-col ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
            {/* Tab Bar */}
            <div className={`flex items-center border-b ${darkMode ? 'border-white/10 bg-[#252526]' : 'border-gray-200 bg-gray-100'} overflow-x-auto`}>
                {tabs.length === 0 ? (
                    <div className={`flex-1 flex items-center justify-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <div className="text-center">
                            <IconCode size={48} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No files open</p>
                            <p className="text-xs mt-1">Select a file from the explorer to start editing</p>
                        </div>
                    </div>
                ) : (
                    tabs.map(tab => (
                        <motion.div
                            key={tab.id}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-center gap-2 px-3 py-2 border-r cursor-pointer min-w-[120px] max-w-[200px] group ${tab.id === activeTabId
                                ? darkMode
                                    ? 'bg-[#1e1e1e] border-b-2 border-b-purple-500'
                                    : 'bg-white border-b-2 border-b-purple-500'
                                : darkMode
                                    ? 'bg-[#2d2d2d] hover:bg-[#1e1e1e] border-white/5'
                                    : 'bg-gray-50 hover:bg-white border-gray-200'
                                }`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            {getLanguageIcon(tab.language)}
                            <span className={`text-sm flex-1 truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'
                                }`}>
                                {tab.name}
                                {tab.isDirty && <span className="ml-1">•</span>}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTabClose(tab.id);
                                }}
                                className={`opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 transition-opacity ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                            >
                                <IconX size={14} />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Editor */}
            <div className="flex-1 relative">
                {activeTab ? (
                    <>
                        <Editor
                            height="100%"
                            language={activeTab.language}
                            value={activeTab.content}
                            theme={darkMode ? 'vs-dark' : 'light'}
                            onChange={handleEditorChange}
                            onMount={handleEditorDidMount}
                            options={{
                                fontSize: 14,
                                fontFamily: "'Fira Code', 'Courier New', monospace",
                                minimap: { enabled: true },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 2,
                                wordWrap: 'on',
                                lineNumbers: 'on',
                                renderLineHighlight: 'all',
                                cursorBlinking: 'smooth',
                                smoothScrolling: true,
                                padding: { top: 16, bottom: 16 },
                                suggestOnTriggerCharacters: true,
                                quickSuggestions: true,
                                formatOnPaste: true,
                                formatOnType: true,
                            }}
                        />

                        {/* Save Indicator */}
                        {activeTab.isDirty && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg ${darkMode
                                    ? 'bg-gray-800 text-gray-200 border border-white/10'
                                    : 'bg-white text-gray-800 border border-gray-200'
                                    }`}
                            >
                                <span className="text-xs">Unsaved changes</span>
                                <button
                                    onClick={() => onSave(activeTab.id)}
                                    className="flex items-center gap-1 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                                >
                                    <IconDeviceFloppy size={12} />
                                    Save
                                </button>
                            </motion.div>
                        )}
                    </>
                ) : (
                    tabs.length === 0 && (
                        <div className={`h-full flex items-center justify-center ${darkMode ? 'bg-[#1e1e1e] text-gray-500' : 'bg-white text-gray-400'}`}>
                            <div className="text-center">
                                <IconCode size={64} className="mx-auto mb-4 opacity-30" />
                                <p className="text-lg font-medium">Welcome to Codespace</p>
                                <p className="text-sm mt-2">Open a file from the explorer to start coding</p>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Status Bar */}
            {activeTab && (
                <div className={`px-3 py-1.5 text-xs flex items-center justify-between border-t ${darkMode
                    ? 'bg-[#007acc] text-white border-[#007acc]'
                    : 'bg-blue-600 text-white border-blue-600'
                    }`}>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">{activeTab.language.toUpperCase()}</span>
                        <span>UTF-8</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Ln 1, Col 1</span>
                        <span className="flex items-center gap-1">
                            {activeTab.isDirty ? 'Modified' : 'Saved'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeEditor;
export type { EditorTab };
