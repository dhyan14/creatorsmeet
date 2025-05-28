import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function analyzeProjectRequirements(description: string) {
  try {
    const response = await fetch(new URL('/api/project/analyze', 'https://creatorsmeet-njfrz26nf-dhyan14s-projects.vercel.app').toString(), {
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
    console.log('Starting login process...');
    const body = await req.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // If user is an innovator and has project requirements, analyze them
    if (user.role === 'innovator' && user.projectRequirements?.description) {
      console.log('Analyzing project requirements for innovator...');
      const analysis = await analyzeProjectRequirements(user.projectRequirements.description);
      
      if (analysis) {
        // Update user's project requirements with analyzed technologies
        await User.findByIdAndUpdate(user._id, {
          $set: {
            'projectRequirements.technologies': analysis.technologies,
            'projectRequirements.complexity': analysis.complexity,
            'projectRequirements.expertise': analysis.expertise,
          }
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Generated token for user:', {
      userId: user._id,
      tokenLength: token.length
    });

    // Create response with user data
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          projectRequirements: user.projectRequirements
        }
      },
      { status: 200 }
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
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error during login' },
      { status: 500 }
    );
  }
} 