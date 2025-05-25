import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    // Verify user session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, projectDescription } = await req.json();

    // Verify input
    if (!projectDescription) {
      return NextResponse.json({ error: 'Project description is required' }, { status: 400 });
    }

    // Call our analysis endpoint
    const analysisResponse = await fetch(new URL('/api/project/analyze', req.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectIdea: projectDescription }),
    });

    if (!analysisResponse.ok) {
      const error = await analysisResponse.text();
      console.error('Analysis failed:', error);
      throw new Error('Failed to analyze project requirements');
    }

    const analysis = await analysisResponse.json();

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Update or create project requirements
    const result = await db.collection('projects').updateOne(
      { userEmail: email },
      {
        $set: {
          description: projectDescription,
          technologies: analysis.technologies,
          complexity: analysis.complexity,
          expertise: analysis.expertise,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (!result.acknowledged) {
      throw new Error('Failed to save project requirements');
    }

    return NextResponse.json({
      message: 'Project requirements updated successfully',
      ...analysis,
    });

  } catch (error) {
    console.error('Project requirements update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update project requirements' },
      { status: 500 }
    );
  }
} 