'use client';

import { motion } from 'framer-motion';
import { IconMicrophone, IconNote, IconPhoto, IconLink, IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function QuickCapture() {
    const [notes, setNotes] = useState([
        { id: 1, type: 'text', content: 'Remember to update API documentation', time: '2h ago', color: 'purple' },
        { id: 2, type: 'voice', content: 'Voice note about design feedback', time: '5h ago', color: 'pink' },
        { id: 3, type: 'link', content: 'https://github.com/project/issues/42', time: '1d ago', color: 'blue' },
    ]);

    const captureTypes = [
        { icon: IconNote, label: 'Text Note', color: 'purple' },
        { icon: IconMicrophone, label: 'Voice Note', color: 'pink' },
        { icon: IconPhoto, label: 'Screenshot', color: 'blue' },
        { icon: IconLink, label: 'Save Link', color: 'green' },
    ];

    return (
        <div className="space-y-6">
            {/* Quick Capture Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {captureTypes.map((type, idx) => (
                    <motion.button
                        key={type.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-gradient-to-br from-${type.color}-500/20 to-${type.color}-600/10 border border-${type.color}-500/30 rounded-2xl p-6 flex flex-col items-center gap-3`}
                    >
                        <type.icon className={`w-8 h-8 text-${type.color}-400`} />
                        <span className="text-white font-medium text-sm">{type.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Quick Text Input */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20"
            >
                <textarea
                    placeholder="Quick note... (Ctrl+Enter to save)"
                    className="w-full bg-white/5 text-white placeholder-gray-500 rounded-xl p-4 border border-white/10 focus:border-purple-500 focus:outline-none resize-none"
                    rows={3}
                />
                <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 flex items-center gap-2">
                        <IconX className="w-4 h-4" />
                        Clear
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                        <IconCheck className="w-4 h-4" />
                        Save Note
                    </button>
                </div>
            </motion.div>

            {/* Recent Captures */}
            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Captures</h3>
                <div className="space-y-3">
                    {notes.map((note, idx) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.01, x: 5 }}
                            className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer group"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 bg-${note.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    {note.type === 'text' && <IconNote className={`w-5 h-5 text-${note.color}-400`} />}
                                    {note.type === 'voice' && <IconMicrophone className={`w-5 h-5 text-${note.color}-400`} />}
                                    {note.type === 'link' && <IconLink className={`w-5 h-5 text-${note.color}-400`} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white mb-1">{note.content}</p>
                                    <span className="text-xs text-gray-400">{note.time}</span>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300">
                                    <IconX className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
