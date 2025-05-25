import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Technology stack categories
const techCategories = {
  frontend: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'Ruby', 'PHP', 'Django', 'Express'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  mobile: ['React Native', 'Flutter', 'iOS', 'Android'],
  ai: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI', 'Hugging Face'],
  cloud: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Heroku'],
};

interface ZeroShotResponse {
  sequence: string;
  labels: string[];
  scores: number[];
}

interface ZeroShotClassificationOutput {
  sequence: string;
  labels: string[];
  scores: number[];
}

export async function POST(req: Request) {
  try {
    const { name, email, password, country, role, projectRequirements, developerStack } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !country || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (role === 'innovator' && projectRequirements?.description) {
      // Analyze project idea using Hugging Face
      const response = await hf.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: projectRequirements.description,
        parameters: {
          candidate_labels: Object.values(techCategories).flat(),
          multi_label: true
        },
      });

      const techStackAnalysis = response as unknown as ZeroShotClassificationOutput;

      // Get top 5 most relevant technologies
      const recommendedTech = techStackAnalysis.labels
        .map((tech, index) => ({
          name: tech,
          confidence: techStackAnalysis.scores[index],
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);

      // Find suitable developers
      // This is a placeholder - replace with your actual database query
      const availableCoders = [
        {
          id: '1',
          name: 'John Doe',
          technologies: ['React', 'Node.js', 'MongoDB'],
        },
        // Add more coders from your database
      ];

      // Match with developers who have the required skills
      const matchedCoders = availableCoders.filter(coder => 
        coder.technologies.some(tech => 
          recommendedTech.map(t => t.name).includes(tech)
        )
      );

      // For initial analysis, return just the technologies and matches
      if (!password) {
        return NextResponse.json({
          technologies: recommendedTech,
          potentialMatches: matchedCoders,
        });
      }

      // Create user with analyzed requirements
      const newUser = {
        name,
        email,
        country,
        role,
        projectRequirements: {
          ...projectRequirements,
          technologies: recommendedTech.map(tech => tech.name),
          analyzedAt: new Date().toISOString(),
        },
        potentialMatches: matchedCoders,
      };

      // Save user to database
      // This is a placeholder - replace with your actual database call
      
      return NextResponse.json({
        user: newUser,
        message: 'Account created successfully',
      });
    }

    if (role === 'coder' && (!developerStack?.name || !developerStack?.technologies)) {
      return NextResponse.json(
        { error: 'Developer stack information is required' },
        { status: 400 }
      );
    }

    // Create coder account
    const newUser = {
      name,
      email,
      country,
      role,
      developerStack,
    };

    // Save user to database
    // This is a placeholder - replace with your actual database call

    return NextResponse.json({
      user: newUser,
      message: 'Account created successfully',
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 