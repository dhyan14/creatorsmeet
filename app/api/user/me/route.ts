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
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verify(token.value, JWT_SECRET) as { userId: string };

    // Connect to MongoDB
    await clientPromise;

    // Find user and populate matched user data
    const user = await User.findById(decoded.userId)
      .populate('matchedWith', '-password')
      .select('-password')
      .exec() as unknown as UserDocument;

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // If user is an innovator and has no analyzed requirements, analyze them
    if (user.role === 'innovator' && user.projectRequirements?.description && !user.projectRequirements.technologies) {
      try {
        const response = await fetch(new URL('/api/project/analyze', 'https://creatorsmeet-njfrz26nf-dhyan14s-projects.vercel.app').toString(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectIdea: user.projectRequirements.description }),
        });

        if (response.ok) {
          const analysis = await response.json();
          
          // Update user's project requirements
          await User.findByIdAndUpdate(user._id, {
            $set: {
              'projectRequirements.technologies': analysis.technologies.map((tech: any) => tech.name),
              'projectRequirements.complexity': analysis.complexity,
              'projectRequirements.expertise': analysis.expertise,
            }
          });

          // Update the user object to be returned
          if (user.projectRequirements) {
            user.projectRequirements.technologies = analysis.technologies.map((tech: any) => tech.name);
            user.projectRequirements.complexity = analysis.complexity;
            user.projectRequirements.expertise = analysis.expertise;
          }
        }
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