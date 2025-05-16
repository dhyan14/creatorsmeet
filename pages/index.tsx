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
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Where Ideas Meet Implementation</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Connect with creative thinkers and skilled developers to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/about" className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-full shadow-lg transition-colors">
              Learn More
            </Link>
            <Link href="/contact" className="bg-primary-800 text-white hover:bg-primary-900 font-bold py-3 px-8 rounded-full shadow-lg transition-colors">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How CreatorsMeet Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Idea</h3>
              <p className="text-gray-600">
                Post your creative concept or project idea with details about what you're looking to build.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Developers</h3>
              <p className="text-gray-600">
                Match with developers who have the skills to bring your vision to reality.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborate & Create</h3>
              <p className="text-gray-600">
                Work together to develop your project, with tools for efficient communication and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose CreatorsMeet</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Skill Matching Algorithm</h3>
                </div>
                <p className="text-gray-600 pl-16">
                  Our platform intelligently matches creative ideas with developers who have the specific skills needed.
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Collaboration Tools</h3>
                </div>
                <p className="text-gray-600 pl-16">
                  Built-in messaging, file sharing, and project management tools to facilitate seamless teamwork.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Community Support</h3>
                </div>
                <p className="text-gray-600 pl-16">
                  Access to forums, resources, and a supportive community to help bring your projects to life.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">Platform Features Illustration</p>
              {/* You would replace this with an actual image in production */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Creative Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I had a great app idea but no technical skills to build it. Through CreatorsMeet, I found an amazing developer who helped make my vision a reality. Now our app has over 10,000 downloads!"
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a developer, I was looking for interesting projects to work on. CreatorsMeet connected me with innovative ideas and passionate creators. It's been the perfect platform to showcase my skills."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">David Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-600">
                "CreatorsMeet enabled me to form a team with the perfect mix of creative and technical talents. Together we launched a successful startup that recently secured seed funding."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Ideas to Life?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join our community of creators and developers today and start collaborating on amazing projects.
          </p>
          <Link href="/contact" className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-3 px-10 rounded-full shadow-lg inline-block transition-colors">
            Sign Up For Free
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 