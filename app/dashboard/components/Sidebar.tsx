'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    IconLayoutDashboard,
    IconRocket,
    IconChartBar,
    IconUsers,
    IconCalendar,
    IconUsersGroup,
    IconCode,
    IconSettings,
    IconLogout,
    IconMenu2,
    IconX,
    IconVideo,
    IconMessages,
} from '@tabler/icons-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    darkMode: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, darkMode }: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: IconLayoutDashboard, color: 'purple' },
        { id: 'projects', label: 'Projects', icon: IconRocket, color: 'cyan' },
        { id: 'codespace', label: 'Codespace', icon: IconCode, color: 'green' },
        { id: 'meetings', label: 'Meetings', icon: IconVideo, color: 'orange' },
        { id: 'community', label: 'Community', icon: IconMessages, color: 'indigo' },
        { id: 'calendar', label: 'Calendar', icon: IconCalendar, color: 'pink' },
        { id: 'team', label: 'Team', icon: IconUsersGroup, color: 'violet' },
        { id: 'network', label: 'Network', icon: IconUsers, color: 'teal' },
        { id: 'analytics', label: 'Analytics', icon: IconChartBar, color: 'rose' },
        { id: 'profile', label: 'Profile', icon: IconUsers, color: 'blue' },
        { id: 'settings', label: 'Settings', icon: IconSettings, color: 'gray' },
    ];

    const sidebarWidth = isHovered ? 'w-64' : 'w-16';

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

            {/* Sidebar - Auto-expand on hover (Desktop) */}
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{ width: isHovered ? 256 : 64 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] backdrop-blur-2xl border-r-[0.5px] z-40 overflow-hidden flex-shrink-0 transition-colors ${darkMode
                    ? 'bg-black/60 border-white/10'
                    : 'bg-white/90 border-gray-200'
                    }`}
            >
                <div className="p-3 space-y-2 h-full flex flex-col">
                    {/* Navigation Items */}
                    <div className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === item.id
                                    ? `bg-${item.color}-500/20 border border-${item.color}-500/30 text-${item.color}-400`
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                title={!isHovered ? item.label : ''}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        width: isHovered ? 'auto' : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="font-medium text-sm whitespace-nowrap overflow-hidden"
                                >
                                    {item.label}
                                </motion.span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-white/10 pt-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                console.log('Logout clicked');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                            title={!isHovered ? 'Logout' : ''}
                        >
                            <IconLogout className="w-5 h-5 flex-shrink-0" />
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    width: isHovered ? 'auto' : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="font-medium text-sm whitespace-nowrap overflow-hidden"
                            >
                                Logout
                            </motion.span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Sidebar - Mobile (Full width when open) */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: sidebarOpen ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 backdrop-blur-2xl border-r-[0.5px] z-40 overflow-y-auto transition-colors ${darkMode
                    ? 'bg-black/60 border-white/10'
                    : 'bg-white/90 border-gray-200'
                    }`}
            >
                <div className="p-4 space-y-2 h-full flex flex-col">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">
                        Navigation
                    </h3>

                    {/* Navigation Items */}
                    <div className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === item.id
                                    ? `bg-${item.color}-500/20 border border-${item.color}-500/30 text-${item.color}-400`
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-white/10 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                console.log('Logout clicked');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/30 transition-all"
                        >
                            <IconLogout className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-sm">Logout</span>
                        </motion.button>
                    </div>
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
