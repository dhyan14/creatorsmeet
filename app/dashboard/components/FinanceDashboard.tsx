'use client';

import { motion } from 'framer-motion';
import { IconCurrencyDollar, IconTrendingUp, IconWallet, IconReceipt } from '@tabler/icons-react';

export default function FinanceDashboard() {
    const budget = { total: 50000, spent: 32000, remaining: 18000 };
    const expenses = [
        { id: '1', category: 'Development', amount: 15000, date: 'Jan 25' },
        { id: '2', category: 'Design', amount: 8000, date: 'Jan 20' },
        { id: '3', category: 'Marketing', amount: 5000, date: 'Jan 15' },
        { id: '4', category: 'Infrastructure', amount: 4000, date: 'Jan 10' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Budget', value: `$${budget.total.toLocaleString()}`, icon: IconWallet, color: 'blue' },
                    { label: 'Spent', value: `$${budget.spent.toLocaleString()}`, icon: IconReceipt, color: 'red' },
                    { label: 'Remaining', value: `$${budget.remaining.toLocaleString()}`, icon: IconTrendingUp, color: 'green' },
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
                    </motion.div>
                ))}
            </div>

            <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Budget Progress</h3>
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">Spent</span>
                    <span className="text-white font-semibold">{((budget.spent / budget.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(budget.spent / budget.total) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                    />
                </div>
            </div>

            <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Expenses</h3>
                <div className="space-y-3">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div>
                                <h4 className="text-white font-medium">{expense.category}</h4>
                                <p className="text-gray-400 text-sm">{expense.date}</p>
                            </div>
                            <div className="text-red-400 font-semibold">-${expense.amount.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
