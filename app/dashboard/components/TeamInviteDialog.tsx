'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconX,
    IconPlus,
    IconUsers,
    IconMail,
    IconCopy,
    IconCheck,
    IconUser
} from '@tabler/icons-react';

interface TeamInviteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    projectTitle: string;
}

export default function TeamInviteDialog({ isOpen, onClose, projectTitle }: TeamInviteDialogProps) {
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [invitedMembers, setInvitedMembers] = useState<Array<{ email: string; role: string; status: string }>>([]);
    const [copiedLink, setCopiedLink] = useState(false);

    const inviteLink = `https://creatorsmeet.vercel.app/join/${Math.random().toString(36).substr(2, 9)}`;

    const handleInvite = () => {
        if (inviteEmail.trim()) {
            setInvitedMembers([...invitedMembers, {
                email: inviteEmail,
                role: inviteRole,
                status: 'pending'
            }]);
            setInviteEmail('');
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-black/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Invite Team Members</h2>
                                <p className="text-sm text-gray-400 mt-1">to {projectTitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <IconX className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Invite by Email */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <IconMail className="w-4 h-4 text-purple-400" />
                                    Invite by Email
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleInvite()}
                                        placeholder="colleague@example.com"
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                    <select
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                        <option value="member">Member</option>
                                        <option value="admin">Admin</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleInvite}
                                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium flex items-center gap-2"
                                    >
                                        <IconPlus className="w-4 h-4" />
                                        Invite
                                    </motion.button>
                                </div>
                            </div>

                            {/* Invited Members List */}
                            {invitedMembers.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-3">Pending Invites</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {invitedMembers.map((member, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                        <IconUser className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-white font-medium">{member.email}</p>
                                                        <p className="text-xs text-gray-400 capitalize">{member.role}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-yellow-400 px-2 py-1 bg-yellow-500/10 rounded border border-yellow-500/30">
                                                    Pending
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share Link */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <IconUsers className="w-4 h-4 text-blue-400" />
                                    Or Share Invite Link
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm focus:outline-none"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCopyLink}
                                        className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-500/30 transition-colors"
                                    >
                                        {copiedLink ? (
                                            <>
                                                <IconCheck className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Anyone with this link can join the project as a member</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                            >
                                Done
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
