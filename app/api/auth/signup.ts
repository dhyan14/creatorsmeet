import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

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

interface ZeroShotClassificationOutput {
  sequence: string;
  labels: string[];
  scores: number[];
}

interface DeveloperStack {
  name: string;
  technologies: string[];
  experience?: string;
}

interface ProjectRequirements {
  description: string;
  technologies?: string[];
  analyzedAt?: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  country: string;
  role: 'innovator' | 'coder';
  createdAt: Date;
  projectRequirements?: ProjectRequirements;
  developerStack?: DeveloperStack;
  potentialMatches?: any[];
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

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    let userData: UserData = {
      name,
      email,
      password: hashedPassword,
      country,
      role,
      createdAt: new Date(),
    };

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
      const availableCoders = await db.collection('users')
        .find({ 
          role: 'coder',
          'developerStack.technologies': {
            $in: recommendedTech.map(tech => tech.name)
          }
        })
        .project({
          name: 1,
          developerStack: 1,
          country: 1
        })
        .toArray();

      userData = {
        ...userData,
        projectRequirements: {
          ...projectRequirements,
          technologies: recommendedTech.map(tech => tech.name),
          analyzedAt: new Date().toISOString(),
        },
        potentialMatches: availableCoders,
      };
    }

    if (role === 'coder') {
      if (!developerStack?.name || !developerStack?.technologies) {
        return NextResponse.json(
          { error: 'Developer stack information is required' },
          { status: 400 }
        );
      }

      userData = {
        ...userData,
        developerStack,
      };
    }

    // Save user to database
    const result = await db.collection('users').insertOne(userData);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userData;

    return NextResponse.json({
      user: userWithoutPassword,
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