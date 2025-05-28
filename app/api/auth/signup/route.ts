import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function analyzeProjectRequirements(description: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/project/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectIdea: description }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze project requirements');
    }

    const analysis = await response.json();
    return {
      technologies: analysis.technologies.map((tech: any) => tech.name),
      complexity: analysis.complexity,
      expertise: analysis.expertise,
    };
  } catch (error) {
    console.error('Project analysis error:', error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, country, projectRequirements, developerStack } = body;

    // Validate required fields
    if (!name || !email || !password || !role || !country) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If user is an innovator and has project requirements, analyze them
    let analyzedRequirements = null;
    if (role === 'innovator' && projectRequirements?.description) {
      analyzedRequirements = await analyzeProjectRequirements(projectRequirements.description);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      country,
      ...(role === 'coder' ? {
        developerStack
      } : {
        projectRequirements: analyzedRequirements ? {
          ...projectRequirements,
          technologies: analyzedRequirements.technologies,
          complexity: analyzedRequirements.complexity,
          expertise: analyzedRequirements.expertise,
        } : projectRequirements
      })
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 