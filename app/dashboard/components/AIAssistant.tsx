'use client';

import { motion } from 'framer-motion';
import { IconBrain, IconAlertTriangle, IconLightbulb, IconRocket } from '@tabler/icons-react';

export default function AIAssistant() {
    const suggestions = [
        {
            type: 'warning',
            icon: IconAlertTriangle,
            title: 'Bottleneck Detected',
            message: '3 tasks are blocked waiting for API review',
            action: 'View Tasks',
            color: 'red',
        },
        {
            type: 'suggestion',
            icon: IconLightbulb,
            title: 'Optimize Workflow',
            message: 'Consider splitting the authentication task into smaller subtasks',
            action: 'Apply Suggestion',
            color: 'yellow',
        },
        {
            type: 'opportunity',
            icon: IconRocket,
            title: 'Quick Win Available',
            message: 'You can complete documentation tasks to reach 75% milestone',
            action: 'See Details',
            color: 'green',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <IconBrain className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
                    <p className="text-sm text-gray-400">Smart insights for your project</p>
                </div>
            </div>

            <div className="space-y-4">
                {suggestions.map((suggestion, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer"
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 bg-${suggestion.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <suggestion.icon className={`w-5 h-5 text-${suggestion.color}-400`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{suggestion.title}</h4>
                                <p className="text-gray-400 text-sm mb-2">{suggestion.message}</p>
                                <button className="text-purple-400 text-sm font-medium hover:text-purple-300">
                                    {suggestion.action} →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
