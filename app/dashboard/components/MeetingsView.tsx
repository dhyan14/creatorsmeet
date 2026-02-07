'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconVideo,
    IconCalendar,
    IconClock,
    IconUser,
    IconPlus,
    IconDots,
    IconCheck,
    IconX,
} from '@tabler/icons-react';

interface Meeting {
    id: string;
    title: string;
    with: string;
    avatar: string;
    date: string;
    time: string;
    duration: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    type: 'creator' | 'developer';
    meetingLink?: string;
}

export default function MeetingsView() {
    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: '1',
            title: 'Project Kickoff Meeting',
            with: 'Sarah Chen',
            avatar: 'SC',
            date: '2026-02-10',
            time: '10:00 AM',
            duration: '1 hour',
            status: 'upcoming',
            type: 'developer',
            meetingLink: 'https://meet.google.com/xyz'
        },
        {
            id: '2',
            title: 'Code Review Session',
            with: 'Mike Rodriguez',
            avatar: 'MR',
            date: '2026-02-12',
            time: '2:00 PM',
            duration: '45 mins',
            status: 'upcoming',
            type: 'developer',
            meetingLink: 'https://zoom.us/j/123456'
        },
        {
            id: '3',
            title: 'Feature Discussion',
            with: 'Emily Watson',
            avatar: 'EW',
            date: '2026-02-05',
            time: '11:00 AM',
            duration: '30 mins',
            status: 'completed',
            type: 'creator'
        }
    ]);

    const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
    const pastMeetings = meetings.filter(m => m.status === 'completed');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meetings</h1>
                    <p className="text-gray-400">Schedule and manage your meetings</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                    <IconPlus className="w-5 h-5" />
                    Schedule Meeting
                </motion.button>
            </div>

            {/* Upcoming Meetings */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <IconCalendar className="w-5 h-5 text-orange-400" />
                    Upcoming Meetings ({upcomingMeetings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingMeetings.map((meeting) => (
                        <motion.div
                            key={meeting.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                        {meeting.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{meeting.title}</h3>
                                        <p className="text-sm text-gray-400">with {meeting.with}</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <IconDots className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <IconCalendar className="w-4 h-4 text-orange-400" />
                                    {new Date(meeting.date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <IconClock className="w-4 h-4 text-orange-400" />
                                    {meeting.time} • {meeting.duration}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {meeting.meetingLink && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 font-medium hover:bg-orange-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        <IconVideo className="w-4 h-4" />
                                        Join Meeting
                                    </motion.button>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all"
                                >
                                    Reschedule
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Past Meetings */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <IconCheck className="w-5 h-5 text-green-400" />
                    Past Meetings ({pastMeetings.length})
                </h2>
                <div className="space-y-3">
                    {pastMeetings.map((meeting) => (
                        <motion.div
                            key={meeting.id}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-sm">
                                        {meeting.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{meeting.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            {meeting.with} • {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                                    Completed
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
