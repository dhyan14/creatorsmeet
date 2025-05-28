import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect, { getConnectionStatus } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Technology stack categories
const techCategories = {
  frontend: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind CSS', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'Material UI', 'Svelte'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'Ruby', 'PHP', 'Django', 'Express', 'Flask', 'Spring Boot', 'Laravel', 'ASP.NET', 'FastAPI'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'DynamoDB', 'SQLite', 'Cassandra', 'Neo4j'],
  mobile: ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin', 'Xamarin', 'Ionic'],
  ai: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI', 'Hugging Face', 'NLTK', 'Pandas', 'NumPy', 'Keras'],
  cloud: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Heroku', 'DigitalOcean', 'Netlify', 'Docker', 'Kubernetes'],
  testing: ['Jest', 'Mocha', 'Cypress', 'Selenium', 'PyTest', 'JUnit'],
  tools: ['Git', 'Webpack', 'Babel', 'ESLint', 'Prettier', 'npm', 'Yarn']
};

interface ZeroShotClassificationOutput {
  sequence: string;
  labels: string[];
  scores: number[];
}

async function makeHuggingFaceRequest(inputs: string, candidateLabels: string[]) {
  try {
    console.log('Making Hugging Face request with:', {
      inputs: inputs.substring(0, 100) + '...',
      candidateLabels,
      apiKeyPresent: !!process.env.HUGGINGFACE_API_KEY,
      environment: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL
    });

    // Add timeout to prevent Vercel serverless function timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs,
        parameters: {
          candidate_labels: candidateLabels,
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Hugging Face API error:', {
        status: response.status,
        statusText: response.statusText,
        environment: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL
      });
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Hugging Face API response:', {
      sequence: result.sequence?.substring(0, 100) + '...',
      labels: result.labels,
      scores: result.scores
    });

    if (!result || typeof result !== 'object' || !result.sequence || !Array.isArray(result.labels) || !Array.isArray(result.scores)) {
      console.error('Invalid response format:', result);
      throw new Error('Invalid response format from Hugging Face API');
    }

    return result as ZeroShotClassificationOutput;
  } catch (error) {
    console.error('Hugging Face API error:', error);
    // Return a mock response for development/testing
    console.log('Using fallback mock response');
    return {
      sequence: inputs,
      labels: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express'],
      scores: [0.95, 0.9, 0.85, 0.8, 0.75],
    };
  }
}

async function analyzeProject(projectIdea: string) {
  console.log('Starting project analysis for:', projectIdea);

  if (!projectIdea) {
    throw new Error('Project idea is required');
  }

  try {
    // First, analyze for general tech categories
    console.log('Analyzing tech categories...');
    const categoryAnalysis = await makeHuggingFaceRequest(
      projectIdea,
      Object.keys(techCategories)
    );

    console.log('Category analysis results:', categoryAnalysis);

    // Get top 3 most relevant categories
    const topCategories = categoryAnalysis.labels
      .map((category, index) => ({
        category,
        score: categoryAnalysis.scores[index]
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    console.log('Top categories:', topCategories);

    // Collect all technologies from top categories
    const relevantTechnologies = topCategories.reduce((techs: string[], cat) => {
      return [...techs, ...techCategories[cat.category as keyof typeof techCategories]];
    }, []);

    console.log('Analyzing specific technologies from categories:', relevantTechnologies);

    // Use Hugging Face to analyze specific technologies
    const techStackAnalysis = await makeHuggingFaceRequest(
      projectIdea,
      relevantTechnologies
    );

    // Get top 5 most relevant technologies with scores above 0.1
    const recommendedTech = techStackAnalysis.labels
      .map((tech, index) => ({
        name: tech,
        confidence: techStackAnalysis.scores[index],
      }))
      .filter(tech => tech.confidence > 0.1)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);

    console.log('Recommended technologies:', recommendedTech);

    // If no technologies were found with high confidence, try a direct analysis
    if (recommendedTech.length === 0) {
      console.log('No high-confidence technologies found, trying direct analysis...');
      const allTechsList = Object.values(techCategories).flat();
      const directAnalysis = await makeHuggingFaceRequest(
        projectIdea,
        allTechsList
      );

      recommendedTech.push(...directAnalysis.labels
        .map((tech, index) => ({
          name: tech,
          confidence: directAnalysis.scores[index],
        }))
        .filter(tech => tech.confidence > 0.05)
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5));

      console.log('Direct analysis results:', recommendedTech);
    }

    // Determine project complexity
    console.log('Analyzing complexity...');
    const complexityAnalysis = await makeHuggingFaceRequest(
      projectIdea,
      ['Simple', 'Moderate', 'Complex', 'Very Complex']
    );
    const projectComplexity = complexityAnalysis.labels[0];

    // Analyze expertise requirements
    console.log('Analyzing expertise requirements...');
    const expertiseAnalysis = await makeHuggingFaceRequest(
      projectIdea,
      [
        'Technical Architecture',
        'Product Development',
        'AI/ML Development',
        'Mobile Development',
        'Web Development'
      ]
    );
    const requiredExpertise = expertiseAnalysis.labels[0];

    const result = {
      technologies: recommendedTech.length > 0 ? recommendedTech : [{ name: 'JavaScript', confidence: 0.8 }], // Fallback
      complexity: projectComplexity,
      expertise: requiredExpertise,
      categories: topCategories
    };

    console.log('Final analysis result:', result);
    return result;
  } catch (error) {
    console.error('Project analysis error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    console.log('Starting project analysis API...');
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      console.log('No auth token found');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verify(token.value, JWT_SECRET) as { userId: string };
    console.log('User ID from token:', decoded.userId);

    // Connect to MongoDB
    await dbConnect();
    const dbStatus = getConnectionStatus();
    console.log('MongoDB connection status:', dbStatus);

    const body = await request.json();
    console.log('Request body:', body);

    if (!body.projectIdea) {
      console.log('Missing project idea in request');
      return NextResponse.json(
        { error: 'Project idea is required' },
        { status: 400 }
      );
    }

    // Validate that project idea is not just an email or very short text
    if (
      body.projectIdea.includes('@') || 
      body.projectIdea.length < 20
    ) {
      console.log('Invalid project idea format:', body.projectIdea);
      return NextResponse.json(
        { error: 'Please provide a detailed project description, not just an email or short text' },
        { status: 400 }
      );
    }

    console.log('Analyzing project idea:', body.projectIdea);
    const result = await analyzeProject(body.projectIdea);
    console.log('Analysis result:', result);

    // Update user's project requirements in the database
    try {
      console.log('Updating user project requirements...');
      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        {
          $set: {
            'projectRequirements.description': body.projectIdea,
            'projectRequirements.technologies': result.technologies.map(tech => tech.name),
            'projectRequirements.complexity': result.complexity,
            'projectRequirements.expertise': result.expertise,
          }
        },
        { 
          new: true,
          runValidators: true,
          select: '-password'
        }
      );

      if (!updatedUser) {
        console.error('User not found for update:', decoded.userId);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Transform the result to match the expected format
      const transformedResult = {
        ...result,
        technologies: result.technologies.map(tech => tech.name)
      };

      console.log('Successfully updated user project requirements:', {
        userId: decoded.userId,
        technologies: transformedResult.technologies,
        complexity: result.complexity,
        expertise: result.expertise
      });

      return NextResponse.json(transformedResult);
    } catch (updateError) {
      console.error('Failed to update user project requirements:', updateError);
      throw updateError;
    }
  } catch (error) {
    console.error('Project analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze project requirements' },
      { status: 500 }
    );
  }
} 