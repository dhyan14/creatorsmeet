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

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Hugging Face API Error:', errorText);
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  if (!result || typeof result !== 'object' || !result.sequence || !Array.isArray(result.labels) || !Array.isArray(result.scores)) {
    console.error('Unexpected response format:', result);
    throw new Error('Invalid response format from Hugging Face API');
  }

  return result as ZeroShotClassificationOutput;
}

export async function POST(req: Request) {
  try {
    const { projectIdea } = await req.json();

    // Use Hugging Face's zero-shot classification to analyze project requirements
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
    const complexityAnalysis = await makeHuggingFaceRequest(
      projectIdea,
      ['Simple', 'Moderate', 'Complex', 'Very Complex']
    );
    const projectComplexity = complexityAnalysis.labels[0];

    // Find suitable mentor based on project requirements
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

    return NextResponse.json({
      technologies: recommendedTech,
      complexity: projectComplexity,
      expertise: requiredExpertise,
    });
  } catch (error) {
    console.error('Project analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze project requirements' },
      { status: 500 }
    );
  }
} 