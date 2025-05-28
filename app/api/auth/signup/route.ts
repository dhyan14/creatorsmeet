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

    // Map expertise to allowed enum values
    const expertiseMap: { [key: string]: string } = {
      'Full Stack Development': 'Web Development',
      'Frontend Development': 'Web Development',
      'Backend Development': 'Web Development',
      'DevOps Engineering': 'Technical Architecture',
      'System Architecture': 'Technical Architecture',
      'Product Management': 'Product Development',
      'Machine Learning': 'AI/ML Development',
      'App Development': 'Mobile Development',
    };

    const mappedExpertise = expertiseMap[analysis.expertise] || analysis.expertise;

    // Validate that the expertise is one of the allowed values
    const allowedExpertise = [
      'Technical Architecture',
      'Product Development',
      'AI/ML Development',
      'Mobile Development',
      'Web Development'
    ];

    return {
      technologies: analysis.technologies.map((tech: any) => tech.name),
      complexity: analysis.complexity,
      expertise: allowedExpertise.includes(mappedExpertise) ? mappedExpertise : 'Web Development', // Default to Web Development if not in allowed list
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
      { 
        message: 'User created successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          projectRequirements: user.projectRequirements
        }
      },
      { status: 201 }
    );

    // Set cookie with more permissive settings for development
    const isProduction = process.env.NODE_ENV === 'production';
    console.log('Setting cookie with environment:', {
      isProduction,
      domain: req.headers.get('host')
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      path: '/',
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