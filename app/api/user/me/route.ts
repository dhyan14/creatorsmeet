import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import User from '@/models/User';
import clientPromise from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface UserDocument {
  _id: string;
  role: 'innovator' | 'coder';
  projectRequirements?: {
    description: string;
    technologies: string[];
    complexity: string;
    expertise: string;
    preferredStack: string;
  };
}

export async function GET() {
  try {
    console.log('Fetching user data...');
    
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
    await clientPromise;

    // Find user and populate matched user data
    const user = await User.findById(decoded.userId)
      .populate('matchedWith', '-password')
      .select('-password')
      .exec() as unknown as UserDocument;

    if (!user) {
      console.log('User not found:', decoded.userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Found user:', {
      id: user._id,
      role: user.role,
      hasProjectRequirements: !!user.projectRequirements,
      projectRequirements: user.projectRequirements
    });

    // If user is an innovator and has description but no technologies, analyze them
    if (
      user.role === 'innovator' && 
      user.projectRequirements?.description && 
      (!user.projectRequirements.technologies || user.projectRequirements.technologies.length === 0)
    ) {
      console.log('Project requirements need analysis. Analyzing...');
      try {
        // Get the request headers to extract the host
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        console.log('Using API base URL:', baseUrl);
        
        const analysisResponse = await fetch(`${baseUrl}/api/project/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token.value}`
          },
          body: JSON.stringify({ 
            projectIdea: user.projectRequirements.description 
          }),
        });

        if (!analysisResponse.ok) {
          const errorText = await analysisResponse.text();
          console.error('Analysis failed:', {
            status: analysisResponse.status,
            error: errorText
          });
          throw new Error(`Failed to analyze project requirements: ${errorText}`);
        }

        const analysis = await analysisResponse.json();
        console.log('Analysis results:', analysis);
        
        // Ensure we have valid technologies
        if (!analysis.technologies || analysis.technologies.length === 0) {
          console.error('No technologies detected in analysis');
          throw new Error('Failed to detect technologies from project description');
        }

        // Update user's project requirements
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'projectRequirements.technologies': analysis.technologies.map((tech: any) => tech.name),
              'projectRequirements.complexity': analysis.complexity,
              'projectRequirements.expertise': analysis.expertise,
              'projectRequirements.categories': analysis.categories?.map((cat: any) => cat.category) || [],
              'projectRequirements.lastAnalyzed': new Date()
            }
          },
          { new: true, select: '-password' }
        ).populate('matchedWith', '-password');

        if (!updatedUser) {
          console.error('Failed to update user with analysis results');
          throw new Error('Failed to update user with analysis results');
        }

        console.log('Updated user project requirements:', {
          technologies: updatedUser.projectRequirements.technologies,
          complexity: updatedUser.projectRequirements.complexity,
          expertise: updatedUser.projectRequirements.expertise,
          categories: updatedUser.projectRequirements.categories
        });

        return NextResponse.json(updatedUser);
      } catch (error) {
        console.error('Failed to analyze project requirements:', error);
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Error fetching user data' },
      { status: 500 }
    );
  }
} 