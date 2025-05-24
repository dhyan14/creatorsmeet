import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
    await dbConnect();

    // Find the current user
    const currentUser = await User.findById(decoded.userId);
    
    if (!currentUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Find the matched team member
    const teamMember = await User.findById(currentUser.matchedWith)
      .select('-password')
      .lean();

    if (!teamMember) {
      return NextResponse.json(
        { message: 'No team member found' },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { message: 'Error fetching team data' },
      { status: 500 }
    );
  }
} 