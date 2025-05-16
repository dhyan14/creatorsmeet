import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>CreatorsMeet - Connecting Creative Minds with Technical Expertise</title>
        <meta name="description" content="CreatorsMeet is a platform connecting people with creative ideas to developers with technical skills, enabling collaboration and innovation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 header-glow">
            Where Ideas Meet Implementation
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Connect with creative thinkers and skilled developers to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/about" className="btn-outlined">
              Learn More
            </Link>
            <Link href="/contact" className="btn-primary">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 header-glow">How CreatorsMeet Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Share Your Idea</h3>
              <p className="text-gray-300">
                Post your creative concept or project idea with details about what you're looking to build.
              </p>
            </div>
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Connect with Developers</h3>
              <p className="text-gray-300">
                Match with developers who have the skills to bring your vision to reality.
              </p>
            </div>
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Collaborate & Create</h3>
              <p className="text-gray-300">
                Work together to develop your project, with tools for efficient communication and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 header-glow">Why Choose CreatorsMeet</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-dark-700 p-2 rounded-full mr-4 text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-300">Skill Matching Algorithm</h3>
                </div>
                <p className="text-gray-300 pl-16">
                  Our platform intelligently matches creative ideas with developers who have the specific skills needed.
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-dark-700 p-2 rounded-full mr-4 text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-300">Collaboration Tools</h3>
                </div>
                <p className="text-gray-300 pl-16">
                  Built-in messaging, file sharing, and project management tools to facilitate seamless teamwork.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-dark-700 p-2 rounded-full mr-4 text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-300">Community Support</h3>
                </div>
                <p className="text-gray-300 pl-16">
                  Access to forums, resources, and a supportive community to help bring your projects to life.
                </p>
              </div>
            </div>
            <div className="bg-dark-700 h-96 rounded-lg flex items-center justify-center border border-dark-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-dark-glow opacity-80"></div>
              <div className="relative z-10 text-center">
                <div className="text-primary-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">Platform Features Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 header-glow">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-700/60 p-8 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-900 rounded-full mr-4 flex items-center justify-center text-white font-bold">SJ</div>
                <div>
                  <h4 className="font-semibold text-primary-300">Sarah Johnson</h4>
                  <p className="text-gray-400 text-sm">Creative Director</p>
                </div>
              </div>
              <p className="text-gray-300">
                "I had a great app idea but no technical skills to build it. Through CreatorsMeet, I found an amazing developer who helped make my vision a reality. Now our app has over 10,000 downloads!"
              </p>
            </div>
            <div className="bg-dark-700/60 p-8 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-900 rounded-full mr-4 flex items-center justify-center text-white font-bold">MC</div>
                <div>
                  <h4 className="font-semibold text-primary-300">Michael Chen</h4>
                  <p className="text-gray-400 text-sm">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As a developer, I was looking for interesting projects to work on. CreatorsMeet connected me with innovative ideas and passionate creators. It's been the perfect platform to showcase my skills."
              </p>
            </div>
            <div className="bg-dark-700/60 p-8 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-900 rounded-full mr-4 flex items-center justify-center text-white font-bold">DR</div>
                <div>
                  <h4 className="font-semibold text-primary-300">David Rodriguez</h4>
                  <p className="text-gray-400 text-sm">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-300">
                "CreatorsMeet enabled me to form a team with the perfect mix of creative and technical talents. Together we launched a successful startup that recently secured seed funding."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-glow opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 header-glow">Ready to Bring Your Ideas to Life?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Join our community of creators and developers today and start collaborating on amazing projects.
          </p>
          <Link href="/contact" className="btn-primary">
            Sign Up For Free
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 