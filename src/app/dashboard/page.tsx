'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

  const handleChallengeComplete = (challengeId: string) => {
    setChallenges(prevChallenges =>
      prevChallenges.filter(challenge => challenge.id !== challengeId)
    );
    // Here you would typically make an API call to update the user's points
    console.log(`Completing challenge: ${challengeId}`);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="loading-spinner rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <nav className="bg-emerald-600 text-white p-4 shadow-lg" style={{ animation: 'slideIn 0.5s ease-out' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold hover:scale-105 transition-transform">Creators Meet</h1>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm hover:bg-emerald-800 transition-colors">
              Points: {session?.user?.points || 0}
            </span>
            <div className="relative hover:scale-110 transition-transform">
              <Image
                src={session?.user?.image || '/default-avatar.png'}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full ring-2 ring-white"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <h2 className="text-3xl font-bold text-emerald-800 mb-8 hover:text-emerald-700 transition-colors">
          Available Challenges
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="challenge-card bg-white rounded-xl shadow-md overflow-hidden"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s` }}
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
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                    onClick={() => handleChallengeComplete(challenge.id)}
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
