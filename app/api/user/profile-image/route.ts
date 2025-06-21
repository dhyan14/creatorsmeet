import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
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

    // 4. Get form data
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { message: 'No image provided' },
        { status: 400 }
      );
    }

    // 5. For now, we'll store the image in public directory
    // In production, you should use a proper storage service like AWS S3
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${userId}-${Date.now()}-${image.name}`;
    const path = `/images/profiles/${filename}`;
    
    // Save file
    const fs = require('fs');
    const fullPath = `./public${path}`;
    
    // Ensure directory exists
    const dir = './public/images/profiles';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, buffer);

    // 6. Update user profile with image path
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { profileImage: path } },
      { new: true, select: '-password' }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile image updated successfully',
      imageUrl: path
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 