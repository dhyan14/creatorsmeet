import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

const DevelopersPage: NextPage = () => {
  // Sample developer data - in a real app, this would come from an API or database
  const developers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '/placeholder.jpg',
      projects: 12,
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Frontend Developer',
      skills: ['React', 'Vue.js', 'CSS/SCSS', 'TypeScript'],
      image: '/placeholder.jpg',
      projects: 9,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Backend Developer',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      image: '/placeholder.jpg',
      projects: 15,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'UI/UX Designer & Developer',
      skills: ['Figma', 'Adobe XD', 'HTML/CSS', 'JavaScript'],
      image: '/placeholder.jpg',
      projects: 7,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'David Rodriguez',
      role: 'Mobile Developer',
      skills: ['React Native', 'Flutter', 'Firebase', 'Swift'],
      image: '/placeholder.jpg',
      projects: 10,
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Lisa Wang',
      role: 'Game Developer',
      skills: ['Unity', 'C#', 'Blender', 'JavaScript'],
      image: '/placeholder.jpg',
      projects: 5,
      rating: 4.8,
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Developers - CreatorsMeet</title>
        <meta name="description" content="Connect with skilled developers at CreatorsMeet. Find the perfect technical partner to bring your ideas to life." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Developers</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Connect with skilled professionals ready to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Find the Perfect Developer</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Skills</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Skills</option>
                  <option>React</option>
                  <option>Node.js</option>
                  <option>Python</option>
                  <option>UI/UX Design</option>
                  <option>Mobile Development</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Experience Level</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Any Experience</option>
                  <option>Beginner (0-2 years)</option>
                  <option>Intermediate (3-5 years)</option>
                  <option>Expert (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Project Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Projects</option>
                  <option>Web Development</option>
                  <option>Mobile Apps</option>
                  <option>UI/UX Design</option>
                  <option>Game Development</option>
                  <option>Data Science</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Availability</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Any Availability</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Weekends Only</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Listing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((developer) => (
              <div key={developer.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-lg">
                    {developer.name.charAt(0)}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{developer.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{developer.role}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="font-semibold">{developer.rating}</span>
                      <span className="text-gray-500 ml-1">rating</span>
                    </div>
                    <div className="text-gray-600">
                      {developer.projects} projects completed
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {developer.skills.map((skill, index) => (
                        <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Developer CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Are You a Developer?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600">
            Join our community of skilled developers and connect with creative minds looking for your expertise.
          </p>
          <Link href="/contact" className="bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 transition-colors inline-block">
            Join as a Developer
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default DevelopersPage; 