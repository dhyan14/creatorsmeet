import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dhyan Jain - Creative Developer</title>
        <meta name="description" content="Personal portfolio of Dhyan Jain, a B.Tech student and creative developer specializing in web and mobile applications." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-left relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow-text text-left">
              Hey..It's Dhyan Jain
            </h1>
            <p className="mb-4 text-xl text-gray-300 text-left">
              Hi, I'm Dhyan Jain— a B.Tech student at UCP Institute of Technology who writes code that (usually) works.
            </p>
            <div className="text-xl mb-8 text-gray-300 space-y-4">
              <p>
                I specialize in crafting modern web and mobile applications using JavaScript, React, Node.js, and MongoDB. From backend logic to user-friendly interfaces, I enjoy turning ideas into functional, full-stack solutions. Let's build something cool together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio" className="btn-primary">
                View Portfolio
              </Link>
              <Link href="/contact" className="btn-outlined">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 header-glow">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Front-End</h3>
              <p className="text-gray-300">
                React, JavaScript, HTML/CSS, Tailwind
              </p>
            </div>
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Back-End</h3>
              <p className="text-gray-300">
                Node.js, Express, MongoDB, REST APIs
              </p>
            </div>
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Mobile</h3>
              <p className="text-gray-300">
                React Native, Mobile UI/UX
              </p>
            </div>
            <div className="text-center p-6 bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm">
              <div className="bg-dark-800 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-300">Tools</h3>
              <p className="text-gray-300">
                Git, VS Code, Figma, Postman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold header-glow">Featured Projects</h2>
            <Link href="/portfolio" className="text-primary-400 hover:text-primary-300 hover:glow-text font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow-sm">
              <div className="h-48 bg-gray-300">
                {/* Project image would go here */}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Web App</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-primary-300">E-commerce Platform</h3>
                <p className="text-gray-300 mb-4">
                  A modern e-commerce solution with real-time inventory management and personalized recommendations.
                </p>
                <button className="text-primary-400 hover:text-primary-300 hover:glow-text font-semibold">
                  View Project
                </button>
              </div>
            </div>
            <div className="bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow-sm">
              <div className="h-48 bg-gray-300">
                {/* Project image would go here */}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Mobile App</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-primary-300">Fitness Tracking App</h3>
                <p className="text-gray-300 mb-4">
                  Mobile application that tracks workouts, nutrition, and provides personalized coaching.
                </p>
                <button className="text-primary-400 hover:text-primary-300 hover:glow-text font-semibold">
                  View Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-glow opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 header-glow">Let's Work Together</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Have a project in mind? I'm currently available for freelance work and collaborations.
          </p>
          <Link href="/contact" className="btn-primary">
            Get In Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 