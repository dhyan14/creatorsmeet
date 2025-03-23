import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <nav className="bg-emerald-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Creators Meet</h1>
          <Link
            href="/auth/signin"
            className="bg-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-emerald-900 sm:text-5xl md:text-6xl">
            Welcome to Creators Meet
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-emerald-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our community of creators, complete challenges, and earn points!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-emerald-600 text-2xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-emerald-900">Complete Challenges</h3>
            <p className="mt-2 text-emerald-600">Engage with exciting challenges designed to boost your creativity and skills.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-emerald-600 text-2xl mb-4">⭐</div>
            <h3 className="text-lg font-medium text-emerald-900">Earn Points</h3>
            <p className="mt-2 text-emerald-600">Get rewarded with points for every challenge you complete.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-emerald-600 text-2xl mb-4">🤝</div>
            <h3 className="text-lg font-medium text-emerald-900">Join Community</h3>
            <p className="mt-2 text-emerald-600">Connect with fellow creators and share your achievements.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
    </div>
  );
}
    </div>
  );
}
