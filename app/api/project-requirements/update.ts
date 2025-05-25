import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { connectToDatabase } from '@/lib/mongodb';

// Initialize Hugging Face with error handling
let hf: HfInference;
try {
  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }
  hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
} catch (error) {
  console.error('Error initializing Hugging Face:', error);
  // We'll handle this in the route handler
}

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

export async function POST(req: Request) {
  try {
    if (!hf) {
      throw new Error('Hugging Face client not initialized');
    }

    console.log('Starting project requirements update...');
    const { email, projectDescription } = await req.json();
    console.log('Received data:', { email, projectDescription });

    if (!email || !projectDescription) {
      return NextResponse.json(
        { error: 'Email and project description are required' },
        { status: 400 }
      );
    }

    // Connect to database
    console.log('Connecting to database...');
    const { db } = await connectToDatabase();

    // Analyze project idea using Hugging Face
    console.log('Starting Hugging Face analysis...');
    console.log('API Key present:', !!process.env.HUGGINGFACE_API_KEY);
    
    try {
      // First, try a simple classification to test the API
      console.log('Testing Hugging Face API connection...');
      const testResponse = await hf.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: 'Test input',
        parameters: {
          candidate_labels: ['test'],
        },
      });
      console.log('Test response successful:', testResponse);

      // Proceed with actual analysis
      console.log('Starting technology stack analysis...');
      const response = await hf.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: projectDescription,
        parameters: {
          candidate_labels: Object.values(techCategories).flat(),
          multi_label: true
        },
      });
      console.log('Technology stack analysis complete:', response);

      const techStackAnalysis = response as unknown as ZeroShotClassificationOutput;

      // Get top 5 most relevant technologies
      const recommendedTech = techStackAnalysis.labels
        .map((tech, index) => ({
          name: tech,
          confidence: techStackAnalysis.scores[index],
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);

      console.log('Recommended technologies:', recommendedTech);

      // Determine project complexity
      console.log('Starting complexity analysis...');
      const complexityResponse = await hf.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: projectDescription,
        parameters: {
          candidate_labels: ['Simple', 'Moderate', 'Complex', 'Very Complex'],
        },
      });
      console.log('Complexity analysis complete:', complexityResponse);

      const complexityAnalysis = complexityResponse as unknown as ZeroShotClassificationOutput;
      const projectComplexity = complexityAnalysis.labels[0];

      // Find suitable expertise
      console.log('Starting expertise analysis...');
      const expertiseResponse = await hf.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: projectDescription,
        parameters: {
          candidate_labels: [
            'Technical Architecture',
            'Product Development',
            'AI/ML Development',
            'Mobile Development',
            'Web Development',
          ],
        },
      });
      console.log('Expertise analysis complete:', expertiseResponse);

      const expertiseAnalysis = expertiseResponse as unknown as ZeroShotClassificationOutput;
      const requiredExpertise = expertiseAnalysis.labels[0];

      // Update user's project requirements
      console.log('Updating user project requirements...');
      const updateResult = await db.collection('users').updateOne(
        { email },
        {
          $set: {
            projectRequirements: {
              description: projectDescription,
              technologies: recommendedTech.map(tech => tech.name),
              complexity: projectComplexity,
              expertise: requiredExpertise,
              analyzedAt: new Date().toISOString(),
            },
          }
        }
      );

      if (!updateResult.matchedCount) {
        console.log('User not found:', email);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      console.log('Successfully updated project requirements');
      return NextResponse.json({
        technologies: recommendedTech,
        complexity: projectComplexity,
        expertise: requiredExpertise,
        message: 'Project requirements updated successfully',
      });

    } catch (hfError) {
      console.error('Hugging Face API error:', hfError);
      return NextResponse.json(
        { error: 'Failed to analyze project with Hugging Face API: ' + (hfError as Error).message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Update project requirements error:', error);
    return NextResponse.json(
      { error: 'Failed to update project requirements: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 