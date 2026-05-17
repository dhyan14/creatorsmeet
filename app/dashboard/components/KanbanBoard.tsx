'use client';

import { motion } from 'framer-motion';
import { IconPlus } from '@tabler/icons-react';

interface Task {
    id: string;
    title: string;
    assignee: string;
    priority: 'high' | 'medium' | 'low';
}

export default function KanbanBoard() {
    const columns = [
        {
            id: 'todo',
            title: 'To Do',
            color: 'gray',
            tasks: [
                { id: '1', title: 'Design landing page', assignee: 'SC', priority: 'high' as const },
                { id: '2', title: 'Setup CI/CD pipeline', assignee: 'MR', priority: 'medium' as const },
            ],
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            color: 'blue',
            tasks: [
                { id: '3', title: 'Implement authentication', assignee: 'EW', priority: 'high' as const },
            ],
        },
        {
            id: 'review',
            title: 'Review',
            color: 'yellow',
            tasks: [
                { id: '4', title: 'API documentation', assignee: 'DK', priority: 'low' as const },
            ],
        },
        {
            id: 'done',
            title: 'Done',
            color: 'green',
            tasks: [
                { id: '5', title: 'Database schema design', assignee: 'SC', priority: 'high' as const },
            ],
        },
    ];

    const priorityColors = {
        high: 'red',
        medium: 'yellow',
        low: 'green',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Task Board</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                >
                    <IconPlus className="w-5 h-5" />
                    Add Task
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((column) => (
                    <div key={column.id} className="bg-black/60 backdrop-blur-2xl rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold">{column.title}</h3>
                            <span className={`px-2 py-1 bg-${column.color}-500/20 text-${column.color}-400 text-xs rounded-full`}>
                                {column.tasks.length}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {column.tasks.map((task, idx) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-white text-sm font-medium">{task.title}</h4>
                                        <span
                                            className={`px-2 py-0.5 bg-${priorityColors[task.priority]}-500/20 text-${priorityColors[task.priority]}-400 text-xs rounded`}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                                            {task.assignee}
                                        </div>
                                        <span className="text-gray-400 text-xs">{task.assignee}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
