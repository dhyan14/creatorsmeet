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

export async function POST(req: Request) {
  try {
    const { projectIdea } = await req.json();

    // Use Hugging Face's zero-shot classification to analyze project requirements
    const techStackAnalysis = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: projectIdea,
      parameters: {
        candidate_labels: Object.values(techCategories).flat(),
      },
    });

    // Get top 5 most relevant technologies
    const recommendedTech = techStackAnalysis.labels
      .slice(0, 5)
      .map((tech, index) => ({
        name: tech,
        confidence: techStackAnalysis.scores[index],
      }));

    // Determine project complexity and required expertise
    const complexityAnalysis = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: projectIdea,
      parameters: {
        candidate_labels: ['Simple', 'Moderate', 'Complex', 'Very Complex'],
      },
    });

    const projectComplexity = complexityAnalysis.labels[0];

    // Find suitable mentor based on project requirements
    const mentorAnalysis = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: projectIdea,
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