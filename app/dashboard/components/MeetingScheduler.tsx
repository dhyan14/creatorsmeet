'use client';

import { motion } from 'framer-motion';
import { IconCalendar, IconClock, IconUsers, IconVideo, IconPlus } from '@tabler/icons-react';

export default function MeetingScheduler() {
    const upcomingMeetings = [
        { id: 1, title: 'Sprint Planning', time: '10:00 AM', date: 'Today', attendees: 5, type: 'video', color: 'purple' },
        { id: 2, title: 'Design Review', time: '02:30 PM', date: 'Today', attendees: 3, type: 'video', color: 'blue' },
        { id: 3, title: 'Client Presentation', time: '11:00 AM', date: 'Tomorrow', attendees: 8, type: 'video', color: 'green' },
        { id: 4, title: 'Team Standup', time: '09:00 AM', date: 'Feb 1', attendees: 6, type: 'video', color: 'pink' },
    ];

    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    return (
        <div className="space-y-6">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                >
                    <IconPlus className="w-5 h-5" />
                    Schedule New Meeting
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                >
                    <IconVideo className="w-5 h-5" />
                    Start Instant Meeting
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Meetings */}
                <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <IconCalendar className="w-6 h-6 text-purple-400" />
                        Upcoming Meetings
                    </h3>
                    <div className="space-y-3">
                        {upcomingMeetings.map((meeting, idx) => (
                            <motion.div
                                key={meeting.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium mb-1">{meeting.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <IconClock className="w-4 h-4" />
                                                {meeting.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IconUsers className="w-4 h-4" />
                                                {meeting.attendees}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-purple-400 font-medium">{meeting.date}</span>
                                        <IconVideo className={`w-5 h-5 text-${meeting.color}-400`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Available Time Slots */}
                <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <IconClock className="w-6 h-6 text-pink-400" />
                        Available Today
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time, idx) => (
                            <motion.button
                                key={time}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-3 rounded-xl font-medium text-sm ${idx % 3 === 0
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-white/5 text-gray-400 border border-white/10'
                                    }`}
                            >
                                {time}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
