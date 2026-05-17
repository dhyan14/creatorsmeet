'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IconTerminal,
    IconX,
    IconChevronRight,
    IconTrash
} from '@tabler/icons-react';

interface TerminalLine {
    id: string;
    type: 'command' | 'output' | 'error';
    content: string;
    timestamp: Date;
}

interface TerminalProps {
    onCommand: (command: string) => Promise<string>;
    darkMode?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
    onCommand,
    darkMode = true
}) => {
    const [lines, setLines] = useState<TerminalLine[]>([
        {
            id: '1',
            type: 'output',
            content: 'Welcome to CreatorsMeet Codespace Terminal',
            timestamp: new Date()
        },
        {
            id: '2',
            type: 'output',
            content: 'Type "help" for available commands',
            timestamp: new Date()
        }
    ]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isExecuting, setIsExecuting] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-scroll to bottom when new lines are added
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const handleCommand = async () => {
        if (!currentCommand.trim() || isExecuting) return;

        const command = currentCommand.trim();

        // Add command to lines
        const commandLine: TerminalLine = {
            id: Date.now().toString(),
            type: 'command',
            content: command,
            timestamp: new Date()
        };
        setLines(prev => [...prev, commandLine]);

        // Add to history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
        setCurrentCommand('');
        setIsExecuting(true);

        try {
            // Handle built-in commands
            if (command === 'clear') {
                setLines([]);
                setIsExecuting(false);
                return;
            }

            if (command === 'help') {
                const helpText = `Available commands:
  clear    - Clear terminal
  help     - Show this help message
  git      - Git operations
  npm      - NPM commands
  node     - Node.js commands`;

                setLines(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    type: 'output',
                    content: helpText,
                    timestamp: new Date()
                }]);
                setIsExecuting(false);
                return;
            }

            // Execute command via backend
            const output = await onCommand(command);

            setLines(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: output.startsWith('Error:') ? 'error' : 'output',
                content: output,
                timestamp: new Date()
            }]);
        } catch (error) {
            setLines(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'error',
                content: `Error: ${error instanceof Error ? error.message : 'Command execution failed'}`,
                timestamp: new Date()
            }]);
        } finally {
            setIsExecuting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentCommand('');
            }
        }
    };

    const clearTerminal = () => {
        setLines([]);
    };

    return (
        <div className={`h-full flex flex-col ${darkMode ? 'bg-black' : 'bg-white'}`}>
            {/* Header */}
            <div className={`px-3 py-2 border-b flex items-center justify-between ${darkMode ? 'border-white/10 bg-black/60' : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="flex items-center gap-2">
                    <IconTerminal size={16} className="text-green-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Terminal
                    </span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={clearTerminal}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        title="Clear Terminal"
                    >
                        <IconTrash size={14} />
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
            >
                {lines.map(line => (
                    <motion.div
                        key={line.id}
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-1"
                    >
                        {line.type === 'command' ? (
                            <div className="flex items-start gap-2">
                                <IconChevronRight size={14} className="text-green-500 mt-1 flex-shrink-0" />
                                <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                                    {line.content}
                                </span>
                            </div>
                        ) : (
                            <div className={`pl-6 whitespace-pre-wrap ${line.type === 'error'
                                    ? 'text-red-400'
                                    : darkMode
                                        ? 'text-gray-300'
                                        : 'text-gray-700'
                                }`}>
                                {line.content}
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-start gap-2">
                    <IconChevronRight size={14} className="text-green-500 mt-1 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isExecuting}
                        className={`flex-1 bg-transparent border-none outline-none font-mono ${darkMode ? 'text-green-400' : 'text-green-600'
                            }`}
                        placeholder={isExecuting ? 'Executing...' : 'Enter command...'}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
