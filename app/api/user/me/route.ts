import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  skills: string[];
  country: string;
  github: string;
  linkedin: string;
  profileImage: string;
  joinedAt: Date;
  projectRequirements?: {
    description: string;
    technologies: string[];
    complexity: string;
    expertise: string;
    preferredStack?: string;
    lastAnalyzed?: Date;
  };
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
      .lean() as UserProfile | null;

    if (!user) {
      console.log('User not found:', userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // 5. Return user data with default values for missing fields
    // Get timestamp from ObjectId
    const objectId = new mongoose.Types.ObjectId(user._id);
    const timestamp = objectId.getTimestamp();

    const profileData = {
      ...user,
      bio: user.bio || '',
      skills: user.skills || [],
      country: user.country || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
      profileImage: user.profileImage || '/default-avatar.png',
      joinedAt: user.joinedAt || timestamp
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error in /api/user/me:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // 1. Get and validate token
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
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
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // 3. Connect to database
    await dbConnect();

    // 4. Get request body
    const updates = await request.json();

    // 5. Validate updates
    const allowedUpdates = [
      'name',
      'bio',
      'skills',
      'country',
      'github',
      'linkedin'
    ];

    const updateData = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {} as Partial<UserProfile>);

    // 6. Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password' }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 