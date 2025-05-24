import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import clientPromise from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, country, role, developerStack, projectRequirements } = body;

    // Connect to MongoDB
    await clientPromise;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user based on role
    const userData = {
      name,
      email,
      password: hashedPassword,
      country,
      role,
      ...(role === 'coder' ? { developerStack } : { projectRequirements }),
    };

    // Save user to database
    const user = await User.create(userData);

    // If user is an innovator, try to match with a coder
    if (role === 'innovator' && projectRequirements) {
      // Find coders with matching technologies
      const matchingCoders = await User.find({
        role: 'coder',
        'developerStack.technologies': {
          $in: projectRequirements.technologies
        },
        matchedWith: { $exists: false }
      }).limit(5);

      if (matchingCoders.length > 0) {
        // For now, just match with the first available coder
        // In a real application, you might want to implement a more sophisticated matching algorithm
        const matchedCoder = matchingCoders[0];
        
        // Update both users with the match
        await User.updateOne(
          { _id: user._id },
          { $set: { matchedWith: matchedCoder._id } }
        );
        
        await User.updateOne(
          { _id: matchedCoder._id },
          { $set: { matchedWith: user._id } }
        );
      }
    }

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 