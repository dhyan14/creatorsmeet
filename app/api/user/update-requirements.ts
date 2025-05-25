import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

interface ZeroShotClassificationOutput {
  sequence: string;
  labels: string[];
  scores: number[];
}

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { description, technologies, preferredStack } = await req.json();

    // Save project requirements to database
    // This is a placeholder - replace with your actual database call
    const updatedUser = {
      // ... user data
      projectRequirements: {
        description,
        technologies,
        preferredStack,
      },
    };

    // Find matching developers using Hugging Face
    const developerProfiles = [
      // This would come from your database
      {
        id: '1',
        name: 'John Doe',
        technologies: ['React', 'Node.js', 'MongoDB'],
        expertise: 'Web Development',
      },
      // ... more developers
    ];

    const matchingPrompt = `Project requirements:
    Description: ${description}
    Technologies: ${technologies.join(', ')}
    Preferred expertise: ${preferredStack}
    
    Find the best developer match based on skills and expertise.`;

    // Use Hugging Face for developer matching
    const matchingResults = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: matchingPrompt,
      parameters: {
        candidate_labels: developerProfiles.map(dev => 
          `${dev.name} - ${dev.technologies.join(', ')} - ${dev.expertise}`
        ),
        multi_label: true
      },
    }) as unknown as ZeroShotClassificationOutput;

    // Get the best match
    const bestMatchIndex = matchingResults.scores.indexOf(Math.max(...matchingResults.scores));
    const matchedDeveloper = developerProfiles[bestMatchIndex];

    // Update user with matched developer
    const finalUserUpdate = {
      ...updatedUser,
      matchedWith: matchedDeveloper,
    };

    // Save the match to database
    // This is a placeholder - replace with your actual database call

    return NextResponse.json(finalUserUpdate);
  } catch (error) {
    console.error('Update requirements error:', error);
    return NextResponse.json(
      { error: 'Failed to update project requirements' },
      { status: 500 }
    );
  }
} 