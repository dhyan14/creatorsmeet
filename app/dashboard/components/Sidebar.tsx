'use client';

import { motion } from 'framer-motion';
import {
    IconLayoutDashboard,
    IconRocket,
    IconChartBar,
    IconUsers,
    IconCalendar,
    IconCurrencyDollar,
    IconUsersGroup,
    IconChecklist,
    IconVideo,
    IconBook,
    IconNote,
    IconMenu2,
    IconX,
    IconSettings,
    IconLogout,
} from '@tabler/icons-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: IconLayoutDashboard, color: 'purple' },
        { id: 'profile', label: 'Profile', icon: IconUsers, color: 'blue' },
        { id: 'projects', label: 'Projects', icon: IconRocket, color: 'cyan' },
        { id: 'problems', label: 'Problems', icon: IconChecklist, color: 'green' },
        { id: 'calendar', label: 'Calendar', icon: IconCalendar, color: 'pink' },
        { id: 'meetings', label: 'Meetings', icon: IconVideo, color: 'orange' },
        { id: 'learning', label: 'Learning', icon: IconBook, color: 'indigo' },
        { id: 'capture', label: 'Quick Capture', icon: IconNote, color: 'cyan' },
        { id: 'network', label: 'Network', icon: IconUsers, color: 'teal' },
        { id: 'team', label: 'Team', icon: IconUsersGroup, color: 'violet' },
        { id: 'analytics', label: 'Analytics', icon: IconChartBar, color: 'rose' },
        { id: 'settings', label: 'Settings', icon: IconSettings, color: 'gray' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-20 left-4 z-50 lg:hidden w-10 h-10 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400"
            >
                {sidebarOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
            </motion.button>

            {/* Sidebar */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-black/60 backdrop-blur-2xl border-r border-white/10 z-40 overflow-y-auto ${sidebarOpen ? 'block' : 'hidden lg:block'
                    }`}
            >
                <div className="p-4 space-y-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">
                        Navigation
                    </h3>
                    {menuItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 1024) {
                                    setSidebarOpen(false);
                                }
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === item.id
                                ? `bg-${item.color}-500/20 border border-${item.color}-500/30 text-${item.color}-400`
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-sm">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`ml-auto w-2 h-2 rounded-full bg-${item.color}-400`}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="p-4 mt-auto border-t border-white/10">
                    <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            // Add logout logic here
                            console.log('Logout clicked');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/30 transition-all"
                    >
                        <IconLogout className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">Logout</span>
                    </motion.button>
                </div>

            </motion.div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}
        </>
    );
}
