'use client';

import { motion } from 'framer-motion';
import { IconCalendar, IconClock, IconVideo, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface Event {
    id: string;
    title: string;
    time: string;
    type: 'meeting' | 'milestone' | 'deadline';
    color: string;
}

export default function CalendarView() {
    const events: Event[] = [
        { id: '1', title: 'Team Standup', time: '10:00 AM', type: 'meeting', color: 'blue' },
        { id: '2', title: 'MVP Milestone', time: '5:00 PM', type: 'milestone', color: 'green' },
        { id: '3', title: 'Design Review', time: '2:00 PM', type: 'meeting', color: 'purple' },
    ];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = Array.from({ length: 35 }, (_, i) => i + 1);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">January 2026</h2>
                <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <IconChevronLeft className="w-5 h-5 text-gray-300" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <IconChevronRight className="w-5 h-5 text-gray-300" />
                    </motion.button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {dates.map(date => (
                    <motion.div
                        key={date}
                        whileHover={{ scale: 1.05 }}
                        className={`aspect-square p-2 rounded-xl border cursor-pointer ${date === 30 ? 'bg-purple-500/20 border-purple-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                    >
                        <div className="text-white text-sm font-medium">{date}</div>
                        {date === 30 && <div className="w-1 h-1 bg-green-400 rounded-full mt-1" />}
                    </motion.div>
                ))}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                    {events.map(event => (
                        <motion.div
                            key={event.id}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className={`w-10 h-10 bg-${event.color}-500/20 rounded-lg flex items-center justify-center`}>
                                <IconCalendar className={`w-5 h-5 text-${event.color}-400`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium">{event.title}</h4>
                                <p className="text-gray-400 text-sm">{event.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
