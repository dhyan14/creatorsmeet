import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

const PortfolioPage: NextPage = () => {
  // Sample portfolio projects - in a real app, this would come from an API or database
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution with real-time inventory management and personalized recommendations.',
      image: '/placeholder.jpg',
      category: 'Web Development',
      client: 'Retail Solutions Inc.',
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      description: 'Mobile application that tracks workouts, nutrition, and provides personalized coaching.',
      image: '/placeholder.jpg',
      category: 'Mobile App',
      client: 'HealthFit Technologies',
    },
    {
      id: 3,
      title: 'Virtual Reality Game',
      description: 'Immersive VR experience set in a fantasy world with interactive storytelling.',
      image: '/placeholder.jpg',
      category: 'Game Development',
      client: 'Immerse Gaming',
    },
    {
      id: 4,
      title: 'Financial Dashboard',
      description: 'Real-time financial analytics dashboard with predictive modeling capabilities.',
      image: '/placeholder.jpg',
      category: 'Data Visualization',
      client: 'FinTech Solutions',
    },
    {
      id: 5,
      title: 'Smart Home System',
      description: 'IoT-based home automation system with voice control and energy efficiency optimization.',
      image: '/placeholder.jpg',
      category: 'IoT',
      client: 'Smart Living Inc.',
    },
    {
      id: 6,
      title: 'Educational Platform',
      description: 'Interactive learning platform with personalized curriculum and progress tracking.',
      image: '/placeholder.jpg',
      category: 'EdTech',
      client: 'Learn Forward',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Portfolio - CreatorsMeet</title>
        <meta name="description" content="Explore the amazing projects created through collaborations on CreatorsMeet." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <div className="text-4xl font-bold text-center header-glow">.dyn</div>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Showcase of innovative projects brought to life through creator-developer collaborations.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-dark-700/60 rounded-lg shadow-md border border-dark-600 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow-sm">
                <div className="h-48 bg-gray-300">
                  {/* Project image would go here */}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-primary-300">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Client: {project.client}</span>
                    <button className="text-primary-400 hover:text-primary-300 hover:glow-text font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-glow opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 header-glow">Have a Project Idea?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Join our community and connect with talented developers to bring your vision to life.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage; 