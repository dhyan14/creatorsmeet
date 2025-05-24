import React, { useState } from 'react';

interface Language {
  id: string;
  name: string;
  stack?: string;
  technologies: string[];
}

const predefinedStacks: Language[] = [
  {
    id: 'mern',
    name: 'MERN Stack',
    stack: 'MERN Developer',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js']
  },
  {
    id: 'mean',
    name: 'MEAN Stack',
    stack: 'MEAN Developer',
    technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js']
  },
  {
    id: 'lamp',
    name: 'LAMP Stack',
    stack: 'LAMP Developer',
    technologies: ['Linux', 'Apache', 'MySQL', 'PHP']
  },
  {
    id: 'python',
    name: 'Python Full Stack',
    stack: 'Python Developer',
    technologies: ['Python', 'Django/Flask', 'PostgreSQL', 'React/Vue']
  },
  {
    id: 'java',
    name: 'Java Full Stack',
    stack: 'Java Developer',
    technologies: ['Java', 'Spring Boot', 'MySQL/PostgreSQL', 'Angular/React']
  },
  {
    id: 'other',
    name: 'Custom Stack',
    technologies: []
  }
];

interface LanguageSelectorProps {
  onStackSelect: (stack: { name: string; technologies: string[] }) => void;
}

export default function LanguageSelector({ onStackSelect }: LanguageSelectorProps) {
  const [selectedStack, setSelectedStack] = useState<string>('');
  const [customTechnologies, setCustomTechnologies] = useState<string>('');
  const [customStackName, setCustomStackName] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleStackSelect = (stackId: string) => {
    setSelectedStack(stackId);
    if (stackId === 'other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      const stack = predefinedStacks.find(s => s.id === stackId);
      if (stack) {
        onStackSelect({
          name: stack.stack || stack.name,
          technologies: stack.technologies
        });
      }
    }
  };

  const handleCustomSubmit = () => {
    const technologies = customTechnologies.split(',').map(tech => tech.trim());
    onStackSelect({
      name: customStackName || 'Custom Developer',
      technologies
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {predefinedStacks.map((stack) => (
          <div
            key={stack.id}
            onClick={() => handleStackSelect(stack.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedStack === stack.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <h3 className="font-medium text-white">{stack.name}</h3>
            {stack.technologies.length > 0 && (
              <p className="text-sm text-gray-400 mt-1">
                {stack.technologies.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>

      {showCustomInput && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Your Stack Name
            </label>
            <input
              type="text"
              value={customStackName}
              onChange={(e) => setCustomStackName(e.target.value)}
              placeholder="e.g., Full Stack Developer, Mobile Developer"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={customTechnologies}
              onChange={(e) => setCustomTechnologies(e.target.value)}
              placeholder="e.g., React Native, Firebase, TypeScript"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleCustomSubmit}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
          >
            Confirm Stack
          </button>
        </div>
      )}
    </div>
  );
} 