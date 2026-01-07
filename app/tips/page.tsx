import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { Header } from '@/components/ui/header';
import GridBackground from '@/components/ui/grid-background';
import { CreateTip } from '@/components/tips/create-tip';
import { TipFeed } from '@/components/tips/tip-feed';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { redirect } from 'next/navigation';

async function getTips() {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/tips`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch tips');
    }

    return res.json();
}

async function getUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) return null;

    try {
        const decoded = verify(token.value, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
        await dbConnect();
        const user = await User.findById(decoded.userId);
        return user;
    } catch (error) {
        return null;
    }
}

export default async function TipsPage() {
    const user = await getUser();

    // If not logged in, redirect to signin
    if (!user) {
        redirect('/signin');
    }

    const tips = await getTips();

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <Header />
            <GridBackground>
                <main className="relative w-full pt-32 pb-20 px-4">
                    <div className="container mx-auto max-w-2xl">
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                                Mentor Tips
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Daily wisdom and insights from our expert mentors.
                            </p>
                        </div>

                        {/* Create Tip Section (Mentors Only) */}
                        {user.role === 'mentor' && (
                            <CreateTip />
                        )}

                        {/* Tips Feed */}
                        <TipFeed tips={tips} />
                    </div>
                </main>
            </GridBackground>
        </div>
    );
}
