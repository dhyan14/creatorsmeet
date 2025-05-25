import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import User from '@/models/User';
import clientPromise from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
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

    // Get request body
    const body = await req.json();
    const { description, technologies, complexity, expertise, preferredStack } = body;

    // Update user's project requirements
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      {
        $set: {
          'projectRequirements.description': description,
          'projectRequirements.technologies': technologies,
          'projectRequirements.complexity': complexity,
          'projectRequirements.expertise': expertise,
          'projectRequirements.preferredStack': preferredStack,
        }
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating project requirements:', error);
    return NextResponse.json(
      { message: 'Error updating project requirements' },
      { status: 500 }
    );
  }
} 