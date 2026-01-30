'use client';

import { motion } from 'framer-motion';
import { IconChartBar, IconTrendingUp, IconUsers, IconClock } from '@tabler/icons-react';

export default function TeamAnalytics() {
    const teamMembers = [
        { name: 'Sarah Chen', tasks: 12, commits: 45, hours: 38, productivity: 92 },
        { name: 'Mike Rodriguez', tasks: 10, commits: 38, hours: 35, productivity: 88 },
        { name: 'Emily Watson', tasks: 8, commits: 29, hours: 32, productivity: 85 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Team Velocity', value: '24', unit: 'tasks/week', icon: IconTrendingUp, color: 'purple' },
                    { label: 'Active Members', value: '3', unit: 'online now', icon: IconUsers, color: 'green' },
                    { label: 'Avg Response Time', value: '2.4', unit: 'hours', icon: IconClock, color: 'blue' },
                    { label: 'Sprint Progress', value: '68%', unit: 'completed', icon: IconChartBar, color: 'pink' },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
                    >
                        <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-gray-500 text-xs">{stat.unit}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Team Performance</h3>
                <div className="space-y-4">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 bg-white/5 rounded-xl"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">{member.name}</h4>
                                        <p className="text-gray-400 text-sm">{member.tasks} tasks • {member.commits}  commits • {member.hours}h</p>
                                    </div>
                                </div>
                                <span className="text-green-400 font-semibold">{member.productivity}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${member.productivity}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
