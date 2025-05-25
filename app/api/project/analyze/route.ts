import { NextResponse } from 'next/server';

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

async function makeHuggingFaceRequest(inputs: string, candidateLabels: string[]) {
  console.log('Making Hugging Face request with:', {
    inputs,
    candidateLabels,
    apiKeyPresent: !!process.env.HUGGINGFACE_API_KEY,
    apiKeyFirstChars: process.env.HUGGINGFACE_API_KEY?.substring(0, 5),
  });

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
    })
  });

  const responseText = await response.text();
  console.log('Raw API Response:', {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body: responseText,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}: ${responseText}`);
  }

  let result;
  try {
    result = JSON.parse(responseText);
  } catch (e) {
    console.error('Failed to parse JSON response:', e);
    throw new Error('Invalid JSON response from API');
  }

  if (!result || typeof result !== 'object' || !result.sequence || !Array.isArray(result.labels) || !Array.isArray(result.scores)) {
    console.error('Unexpected response format:', result);
    throw new Error('Invalid response format from Hugging Face API');
  }

  return result as ZeroShotClassificationOutput;
}

async function analyzeProject(projectIdea: string) {
  console.log('Starting project analysis...');

  if (!projectIdea) {
    throw new Error('Project idea is required');
  }

  // Use Hugging Face's zero-shot classification to analyze project requirements
  console.log('Analyzing tech stack...');
  const techStackAnalysis = await makeHuggingFaceRequest(
    projectIdea,
    Object.values(techCategories).flat()
  );

  // Get top 5 most relevant technologies
  const recommendedTech = techStackAnalysis.labels
    .map((tech, index) => ({
      name: tech,
      confidence: techStackAnalysis.scores[index],
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  // Determine project complexity and required expertise
  console.log('Analyzing complexity...');
  const complexityAnalysis = await makeHuggingFaceRequest(
    projectIdea,
    ['Simple', 'Moderate', 'Complex', 'Very Complex']
  );
  const projectComplexity = complexityAnalysis.labels[0];

  // Find suitable mentor based on project requirements
  console.log('Analyzing expertise requirements...');
  const mentorAnalysis = await makeHuggingFaceRequest(
    projectIdea,
    [
      'Technical Architecture',
      'Product Development',
      'AI/ML Development',
      'Mobile Development',
      'Web Development',
    ]
  );
  const requiredExpertise = mentorAnalysis.labels[0];

  const result = {
    technologies: recommendedTech,
    complexity: projectComplexity,
    expertise: requiredExpertise,
  };
  console.log('Analysis complete:', result);

  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const result = await analyzeProject(body.projectIdea);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Project analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze project requirements';
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error;
    
    console.error('Error details:', errorDetails);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 