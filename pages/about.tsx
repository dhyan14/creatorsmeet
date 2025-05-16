import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Us - CreatorsMeet</title>
        <meta name="description" content="Learn about CreatorsMeet's mission to connect creative minds with technical expertise." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About CreatorsMeet</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Our mission is to bridge the gap between creative ideas and technical implementation.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-primary-700">Our Story</h2>
            <p className="text-lg mb-6 text-gray-700">
              CreatorsMeet was born from a simple observation: many brilliant creative ideas never materialize because their creators lack the technical skills to bring them to life. Simultaneously, talented developers are often looking for meaningful and challenging projects to apply their expertise.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Founded in 2023, our platform aims to solve this problem by creating a collaborative ecosystem where creative thinkers and skilled developers can find each other, connect, and work together to transform concepts into reality.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              What started as a small community has rapidly grown into a thriving platform with thousands of users from across the globe. We've facilitated hundreds of successful collaborations, resulting in launched websites, mobile apps, games, and innovative software solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center text-primary-700">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We believe in the power of innovative ideas to change the world. Our platform is designed to nurture creativity and technical excellence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We're committed to fostering meaningful connections and facilitating effective collaboration between different skill sets and perspectives.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-600">
                We're dedicated to creating a safe, respectful, and ethical environment for all users, prioritizing transparency and fair practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center text-primary-700">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Team member examples - in a real implementation, you would use actual team photos */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Alex Morgan</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jamie Taylor</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sam Wilson</h3>
              <p className="text-gray-600">Head of Design</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jordan Lee</h3>
              <p className="text-gray-600">Community Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            "To empower creativity and innovation by connecting visionary minds with technical expertise, enabling ideas to transform into reality."
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 