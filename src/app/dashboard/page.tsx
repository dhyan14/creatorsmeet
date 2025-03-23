'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Complete Your Profile',
      description: 'Add a profile picture and bio to your account',
      points: 50
    },
    {
      id: '2',
      title: 'First Contribution',
      description: 'Make your first contribution to the community',
      points: 100
    },
    {
      id: '3',
      title: 'Engagement Master',
      description: 'Interact with 5 different community posts',
      points: 150
    }
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <nav className="bg-emerald-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Creators Meet</h1>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm">
              Points: {session?.user?.points || 0}
            </span>
            <img
              src={session?.user?.image || '/default-avatar.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-emerald-800 mb-8">Available Challenges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-medium">
                    {challenge.points} points
                  </span>
                  <button
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                    onClick={() => {
                      // Handle challenge completion
                      console.log(`Completing challenge: ${challenge.id}`);
                    }}
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}