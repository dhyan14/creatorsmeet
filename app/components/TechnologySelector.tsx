import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TechnologySelectorProps {
  onTechnologySelect: (technologies: string[]) => void;
}

const technologyCategories = {
  frontend: {
    name: 'Frontend Development',
    technologies: [
      'React',
      'Vue',
      'Angular',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'HTML',
      'CSS',
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'Material UI',
      'Svelte'
    ]
  },
  backend: {
    name: 'Backend Development',
    technologies: [
      'Node.js',
      'Python',
      'Java',
      'Go',
      'Ruby',
      'PHP',
      'Django',
      'Express',
      'Flask',
      'Spring Boot',
      'Laravel',
      'ASP.NET',
      'FastAPI'
    ]
  },
  database: {
    name: 'Database Technologies',
    technologies: [
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Firebase',
      'DynamoDB',
      'SQLite',
      'Cassandra',
      'Neo4j'
    ]
  },
  mobile: {
    name: 'Mobile Development',
    technologies: [
      'React Native',
      'Flutter',
      'iOS',
      'Android',
      'Swift',
      'Kotlin',
      'Xamarin',
      'Ionic'
    ]
  },
  ai: {
    name: 'AI & Machine Learning',
    technologies: [
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'OpenAI',
      'Hugging Face',
      'NLTK',
      'Pandas',
      'NumPy',
      'Keras'
    ]
  },
  cloud: {
    name: 'Cloud & DevOps',
    technologies: [
      'AWS',
      'Google Cloud',
      'Azure',
      'Vercel',
      'Heroku',
      'DigitalOcean',
      'Netlify',
      'Docker',
      'Kubernetes'
    ]
  },
  testing: {
    name: 'Testing',
    technologies: [
      'Jest',
      'Mocha',
      'Cypress',
      'Selenium',
      'PyTest',
      'JUnit'
    ]
  },
  tools: {
    name: 'Development Tools',
    technologies: [
      'Git',
      'Webpack',
      'Babel',
      'ESLint',
      'Prettier',
      'npm',
      'Yarn'
    ]
  }
};

export default function TechnologySelector({ onTechnologySelect }: TechnologySelectorProps) {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [customTechnology, setCustomTechnology] = useState('');

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(technology)) {
        return prev.filter(t => t !== technology);
      } else {
        return [...prev, technology];
      }
    });
  };

  const handleCustomTechnologyAdd = () => {
    if (customTechnology.trim() && !selectedTechnologies.includes(customTechnology.trim())) {
      setSelectedTechnologies(prev => [...prev, customTechnology.trim()]);
      setCustomTechnology('');
    }
  };

  const handleSubmit = () => {
    onTechnologySelect(selectedTechnologies);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {selectedTechnologies.length > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-medium text-white mb-3">Selected Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTechnologies.map(tech => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-full text-sm cursor-pointer hover:bg-purple-500/30 transition-colors"
                  onClick={() => handleTechnologyToggle(tech)}
                >
                  {tech} ×
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Technology Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={customTechnology}
          onChange={(e) => setCustomTechnology(e.target.value)}
          placeholder="Add custom technology..."
          className="flex-1 px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCustomTechnologyAdd();
            }
          }}
        />
        <button
          onClick={handleCustomTechnologyAdd}
          className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Technology Categories */}
      <div className="space-y-8">
        {Object.entries(technologyCategories).map(([key, category]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-medium text-white">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.technologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => handleTechnologyToggle(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      {selectedTechnologies.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
        >
          Continue with {selectedTechnologies.length} Technologies
        </motion.button>
      )}
    </div>
  );
} 