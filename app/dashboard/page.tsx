'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconBrain,
  IconCode,
  IconRefresh,
  IconPlus,
  IconBell,
  IconSearch,
  IconTrendingUp,
  IconUsers,
  IconRocket,
  IconTarget,
  IconClock,
  IconChartBar,
  IconBulb,
  IconX,
  IconCheck,
  IconStar,
  IconMessage,
  IconCalendar,
  IconFolder,
  IconSettings,
  IconLogout,
  IconChevronRight,
  IconActivity,
  IconAward,
  IconBookmark,
  IconFilter,
  IconCurrencyDollar,
  IconVideo,
  IconBook,
  IconNote,
  IconMenu2,
  IconLayoutSidebar
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import CalendarView from './components/CalendarView';
import FinanceDashboard from './components/FinanceDashboard';
import KanbanBoard from './components/KanbanBoard';
import TeamAnalytics from './components/TeamAnalytics';
import AIAssistant from './components/AIAssistant';
import MeetingScheduler from './components/MeetingScheduler';
import LearningHub from './components/LearningHub';
import QuickCapture from './components/QuickCapture';
import Sidebar from './components/Sidebar';

interface ProjectRequirements {
  description: string;
  technologies: string[];
  complexity: string;
  expertise: string;
  preferredStack?: string;
  lastAnalyzed?: Date;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  _id: string;
  title: string;
  status: 'active' | 'completed';
  progress: number;
  dueDate: Date;
  team: TeamMember[];
}

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'innovator' | 'coder';
  projectRequirements?: ProjectRequirements;
  points: number;
  level: number;
  teamMembers: TeamMember[];
  projects: Project[];
  achievements: Achievement[];
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface Activity {
  id: string;
  type: 'project' | 'team' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface DeveloperMatch {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  matchScore: number;
  projects: number;
  rating: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'problems' | 'analytics' | 'network' | 'calendar' | 'team' | 'meetings' | 'learning' | 'capture'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for enhanced features
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'success', title: 'New Match Found!', message: 'Sarah Chen is a perfect match for your AI project', time: '5m ago', read: false },
    { id: '2', type: 'info', title: 'Project Update', message: 'Your project "E-commerce Platform" reached 75% completion', time: '1h ago', read: false },
    { id: '3', type: 'warning', title: 'Milestone Due Soon', message: 'MVP deadline is in 3 days', time: '2h ago', read: true },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'achievement', title: 'Achievement Unlocked!', description: 'Completed your first project milestone', time: '10m ago', icon: '🏆' },
    { id: '2', type: 'team', title: 'New Team Member', description: 'Alex joined your E-commerce project', time: '1h ago', icon: '👥' },
    { id: '3', type: 'project', title: 'Project Analysis Complete', description: 'AI analyzed your Mobile App project', time: '3h ago', icon: '🤖' },
    { id: '4', type: 'achievement', title: 'Level Up!', description: 'You reached Level 5', time: '1d ago', icon: '⭐' },
  ]);

  const [developerMatches, setDeveloperMatches] = useState<DeveloperMatch[]>([
    { id: '1', name: 'Sarah Chen', avatar: 'SC', skills: ['React', 'Node.js', 'MongoDB'], matchScore: 95, projects: 12, rating: 4.9 },
    { id: '2', name: 'Mike Rodriguez', avatar: 'MR', skills: ['Python', 'Django', 'PostgreSQL'], matchScore: 88, projects: 8, rating: 4.7 },
    { id: '3', name: 'Emily Watson', avatar: 'EW', skills: ['Vue.js', 'Express', 'AWS'], matchScore: 82, projects: 15, rating: 4.8 },
    { id: '4', name: 'David Kim', avatar: 'DK', skills: ['React Native', 'Firebase', 'TypeScript'], matchScore: 79, projects: 10, rating: 4.6 },
  ]);

  const analyzeProject = async (description: string) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/project/analyze', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectIdea: description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze project');
      }

      await fetchUserData();
    } catch (err) {
      console.error('Error analyzing project:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze project');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const userData = await response.json();

      if (
        userData.role === 'innovator' &&
        userData.projectRequirements?.description &&
        (!userData.projectRequirements.technologies || userData.projectRequirements.technologies.length === 0)
      ) {
        setUser(userData);
        await analyzeProject(userData.projectRequirements.description);
      } else {
        setUser(userData);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading || isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950/20 to-black">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200/30 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-gray-300 text-lg font-medium"
        >
          {isAnalyzing ? 'Analyzing your project requirements...' : 'Loading your dashboard...'}
        </motion.p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950/20 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-300 mb-6">{error || 'Please try refreshing the page'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchUserData()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <IconRocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CreatorsMeet</h1>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, developers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  <IconBell className="w-5 h-5 text-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-white font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className="p-4 border-b border-white/5 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 mt-2 rounded-full ${notification.read ? 'bg-gray-500' : 'bg-purple-500'}`} />
                              <div className="flex-1">
                                <h4 className="text-white text-sm font-medium">{notification.title}</h4>
                                <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                                <span className="text-gray-500 text-xs mt-1 block">{notification.time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 bg-white/5 text-center">
                        <button className="text-purple-400 text-sm font-medium hover:text-purple-300">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{user.name[0]}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {[
            { id: 'overview', label: 'Overview', icon: IconChartBar },
            { id: 'projects', label: 'Projects', icon: IconFolder },
            { id: 'tasks', label: 'Tasks', icon: IconTarget },
            { id: 'calendar', label: 'Calendar', icon: IconCalendar },
            { id: 'finance', label: 'Finance', icon: IconCurrencyDollar },
            { id: 'team', label: 'Team', icon: IconUsers },
            { id: 'analytics', label: 'Analytics', icon: IconTrendingUp },
            { id: 'network', label: 'Network', icon: IconUsers },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Card with Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Welcome back, {user.name}!
                    </h2>
                    <p className="text-gray-300 mt-2">
                      {user.role === 'innovator'
                        ? "Let's bring your ideas to life"
                        : 'Ready to build amazing projects'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProjectModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <IconPlus className="w-5 h-5" />
                    New Project
                  </motion.button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Points', value: user.points || 0, icon: IconStar, color: 'purple' },
                    { label: 'Level', value: user.level || 1, icon: IconTrendingUp, color: 'pink' },
                    { label: 'Active Projects', value: user.projects?.filter(p => p.status === 'active').length || 0, icon: IconFolder, color: 'blue' },
                    { label: 'Team Members', value: user.teamMembers?.length || 0, icon: IconUsers, color: 'green' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/10 p-4 rounded-xl border border-${stat.color}-500/30 backdrop-blur-sm`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 bg-${stat.color}-500/30 rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                        </div>
                      </div>
                      <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                      <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Recommendations Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <IconBrain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
                    <p className="text-sm text-gray-400">Personalized insights for you</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: IconBulb,
                      title: 'Perfect Match Found',
                      description: 'Sarah Chen has 95% compatibility with your AI project',
                      action: 'View Profile',
                      color: 'yellow'
                    },
                    {
                      icon: IconTarget,
                      title: 'Skill Development',
                      description: 'Learning React Native could help you with mobile projects',
                      action: 'Explore Courses',
                      color: 'blue'
                    },
                    {
                      icon: IconTrendingUp,
                      title: 'Project Opportunity',
                      description: 'AI/ML projects are trending 45% higher this month',
                      action: 'Learn More',
                      color: 'green'
                    },
                  ].map((rec, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className={`w-10 h-10 bg-${rec.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <rec.icon className={`w-5 h-5 text-${rec.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{rec.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{rec.description}</p>
                        <button className="text-purple-400 text-sm font-medium hover:text-purple-300 flex items-center gap-1">
                          {rec.action}
                          <IconChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Project Requirements (if innovator) */}
              {user.role === 'innovator' && user.projectRequirements && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <IconCode className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-white">Project Requirements</h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => user.projectRequirements?.description && analyzeProject(user.projectRequirements.description)}
                      disabled={isAnalyzing}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/30"
                    >
                      <IconRefresh className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span className="font-medium">Reanalyze</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">Description</h3>
                      <p className="text-gray-200 text-sm">{user.projectRequirements.description}</p>
                    </div>

                    {user.projectRequirements.technologies && user.projectRequirements.technologies.length > 0 && (
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.projectRequirements.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.projectRequirements.complexity && (
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Complexity</h3>
                        <p className="text-gray-200 text-sm">{user.projectRequirements.complexity}</p>
                      </div>
                    )}

                    {user.projectRequirements.expertise && (
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Required Expertise</h3>
                        <p className="text-gray-200 text-sm">{user.projectRequirements.expertise}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <IconActivity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                </div>

                <div className="space-y-4">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{activity.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{activity.description}</p>
                        <span className="text-gray-500 text-xs mt-1 block">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2 text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
                  View All Activity
                </button>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: IconPlus, label: 'New Project', color: 'purple' },
                    { icon: IconUsers, label: 'Find Devs', color: 'blue' },
                    { icon: IconCalendar, label: 'Schedule', color: 'green' },
                    { icon: IconMessage, label: 'Messages', color: 'pink' },
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center gap-2 p-4 bg-${action.color}-500/10 rounded-xl border border-${action.color}-500/30 hover:bg-${action.color}-500/20 transition-all`}
                    >
                      <action.icon className={`w-6 h-6 text-${action.color}-400`} />
                      <span className="text-xs text-gray-300 font-medium">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* AI Assistant Widget */}
              <AIAssistant />

              {/* Achievements Preview */}
              {user.achievements && user.achievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <IconAward className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Achievements</h3>
                    </div>
                    <span className="text-sm text-yellow-400 font-medium">{user.achievements.length}</span>
                  </div>

                  <div className="space-y-3">
                    {user.achievements.slice(0, 3).map((achievement) => (
                      <motion.div
                        key={achievement._id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate">{achievement.title}</h4>
                          <p className="text-gray-400 text-xs truncate">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProjectModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
              >
                <IconPlus className="w-5 h-5" />
                Create Project
              </motion.button>
            </div>

            {user.projects && user.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400 font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    {project.team && project.team.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member) => (
                            <div
                              key={member._id}
                              className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-black flex items-center justify-center"
                            >
                              <span className="text-xs font-bold text-white">{member.name[0]}</span>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {project.team.length} team member{project.team.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconFolder className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
                <p className="text-gray-400 mb-6">Start your first project and bring your ideas to life!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProjectModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
                >
                  Create Your First Project
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Tasks/Kanban Tab */}
        {activeTab === 'tasks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KanbanBoard />
          </motion.div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CalendarView />
          </motion.div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FinanceDashboard />
          </motion.div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TeamAnalytics />
          </motion.div>
        )}

        {/* Meetings Tab */}
        {activeTab === 'meetings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MeetingScheduler />
          </motion.div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LearningHub />
          </motion.div>
        )}

        {/* Quick Capture Tab */}
        {activeTab === 'capture' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <QuickCapture />
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Projects Completed', value: user.projects?.filter(p => p.status === 'completed').length || 0, change: '+12%', icon: IconCheck, color: 'green' },
                { label: 'Active Collaborations', value: user.teamMembers?.length || 0, change: '+5%', icon: IconUsers, color: 'blue' },
                { label: 'Total Points Earned', value: user.points || 0, change: '+28%', icon: IconStar, color: 'yellow' },
                { label: 'Success Rate', value: '94%', change: '+3%', icon: IconTrendingUp, color: 'purple' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Placeholder for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Project Progress Over Time</h3>
                <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl">
                  <p className="text-gray-400">Chart visualization coming soon</p>
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Skills Distribution</h3>
                <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl">
                  <p className="text-gray-400">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Network Tab */}
        {activeTab === 'network' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Developer Network</h2>
              <div className="flex items-center gap-3">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
                  <IconFilter className="w-5 h-5 text-gray-300" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
                  <IconSearch className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developerMatches.map((dev, index) => (
                <motion.div
                  key={dev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{dev.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{dev.name}</h3>
                        <div className="flex items-center gap-1">
                          <IconStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-400">{dev.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                        {dev.matchScore}%
                      </div>
                      <p className="text-xs text-gray-400">Match</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{dev.projects} projects</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm"
                    >
                      Connect
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                    >
                      <IconBookmark className="w-5 h-5 text-gray-300" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Creation Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Project</h2>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <IconX className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your project idea..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select category...</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI/ML</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
                  >
                    Create Project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowProjectModal(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowProjectModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-purple-500/50 transition-all"
      >
        <IconPlus className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}