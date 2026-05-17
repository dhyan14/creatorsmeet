'use client';

import { motion } from 'framer-motion';
import { IconBook, IconVideo, IconCode, IconCertificate, IconTrendingUp, IconFlame, IconClock } from '@tabler/icons-react';

export default function LearningHub() {
    const courses = [
        { id: 1, title: 'Advanced React Patterns', progress: 65, type: 'video', duration: '4h 30m', level: 'Advanced', trending: true },
        { id: 2, title: 'System Design Fundamentals', progress: 30, type: 'book', duration: '8h', level: 'Intermediate', trending: false },
        { id: 3, title: 'TypeScript Deep Dive', progress: 90, type: 'code', duration: '3h', level: 'Advanced', trending: true },
        { id: 4, title: 'AWS Cloud Practitioner', progress: 45, type: 'video', duration: '6h', level: 'Beginner', trending: false },
    ];

    const achievements = [
        { name: 'Fast Learner', icon: IconFlame, count: 5, color: 'orange' },
        { name: 'Certified Expert', icon: IconCertificate, count: 3, color: 'blue' },
        { name: 'Code Master', icon: IconCode, count: 12, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Courses Enrolled', value: '12', icon: IconBook, color: 'purple' },
                    { label: 'Hours Learned', value: '48', icon: IconClock, color: 'blue' },
                    { label: 'Certificates', value: '3', icon: IconCertificate, color: 'green' },
                    { label: 'Streak Days', value: '15', icon: IconFlame, color: 'orange' },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-black/60 backdrop-blur-2xl rounded-2xl p-4 border border-white/20"
                    >
                        <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-2`} />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Current Courses */}
            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <IconTrendingUp className="w-6 h-6 text-purple-400" />
                    Continue Learning
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer relative overflow-hidden"
                        >
                            {course.trending && (
                                <div className="absolute top-2 right-2">
                                    <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <IconFlame className="w-3 h-3" />
                                        Trending
                                    </span>
                                </div>
                            )}
                            <div className="flex items-start gap-3 mb-3">
                                {course.type === 'video' && <IconVideo className="w-6 h-6 text-purple-400" />}
                                {course.type === 'book' && <IconBook className="w-6 h-6 text-blue-400" />}
                                {course.type === 'code' && <IconCode className="w-6 h-6 text-green-400" />}
                                <div className="flex-1">
                                    <h4 className="text-white font-medium mb-1">{course.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span>{course.duration}</span>
                                        <span className="text-purple-400">{course.level}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-purple-400 font-medium">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">Your Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement, idx) => (
                        <motion.div
                            key={achievement.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white/5 rounded-xl border border-white/10 text-center"
                        >
                            <achievement.icon className={`w-12 h-12 text-${achievement.color}-400 mx-auto mb-2`} />
                            <div className="text-2xl font-bold text-white mb-1">{achievement.count}</div>
                            <div className="text-sm text-gray-400">{achievement.name}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
