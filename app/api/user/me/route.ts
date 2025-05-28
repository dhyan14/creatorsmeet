import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface ProjectRequirements {
  description: string;
  technologies: string[];
  complexity: string;
  expertise: string;
  preferredStack?: string;
  lastAnalyzed?: Date;
}

interface UserDocument {
  _id: string;
  name: string;
  email: string;
  role: 'innovator' | 'coder';
  projectRequirements?: ProjectRequirements;
  matchedWith?: UserDocument;
}

export async function GET() {
  console.log('GET /api/user/me - Start');
  
  try {
    // 1. Get and validate token
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
      console.log('No token found in cookies');
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    // 2. Verify token
    let userId: string;
    try {
      const decoded = verify(token.value, JWT_SECRET) as { userId: string };
      userId = decoded.userId;
      console.log('Token verified for user:', userId);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // 3. Connect to database
    await dbConnect();
    console.log('Database connected');

    // 4. Fetch user data
    const user = await User.findById(userId)
      .select('-password')
      .populate('matchedWith', '-password')
      .lean() as UserDocument | null;

    if (!user) {
      console.log('User not found:', userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // 5. Check if project requirements need analysis
    if (
      user.role === 'innovator' &&
      user.projectRequirements?.description &&
      (!user.projectRequirements.technologies || user.projectRequirements.technologies.length === 0)
    ) {
      console.log('Project requirements need analysis');
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const analysisResponse = await fetch(`${baseUrl}/api/project/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token.value}`
          },
          body: JSON.stringify({
            projectIdea: user.projectRequirements.description
          })
        });

        if (!analysisResponse.ok) {
          throw new Error(`Analysis failed with status ${analysisResponse.status}`);
        }

        const analysis = await analysisResponse.json();
        console.log('Project analysis completed:', analysis);

        // Update user with analysis results
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              'projectRequirements.technologies': analysis.technologies.map((tech: any) => 
                typeof tech === 'string' ? tech : tech.name
              ),
              'projectRequirements.complexity': analysis.complexity,
              'projectRequirements.expertise': analysis.expertise,
              'projectRequirements.lastAnalyzed': new Date()
            }
          },
          { new: true, select: '-password' }
        ).populate('matchedWith', '-password')
        .lean() as UserDocument | null;

        if (updatedUser) {
          console.log('User updated with analysis results');
          return NextResponse.json(updatedUser);
        }
      } catch (error) {
        console.error('Project analysis failed:', error);
        // Continue with original user data if analysis fails
      }
    }

    // 6. Return user data
    console.log('Returning user data:', {
      id: user._id,
      role: user.role,
      hasProjectRequirements: !!user.projectRequirements,
      technologies: user.projectRequirements?.technologies?.length || 0
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /api/user/me:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 