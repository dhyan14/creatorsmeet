import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    console.log('Signin request received');
    const body = await req.json();
    const { identifier, email, password } = body;

    // Support both 'identifier' (from new login page) and 'email' (legacy)
    const loginIdentifier = identifier || email;

    // Validate required fields
    if (!loginIdentifier || !password) {
      console.log('Missing required fields:', { identifier: !!loginIdentifier, password: !!password });
      return NextResponse.json(
        { message: 'Email/Username and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected');

    // Find user by email, username, or phone
    console.log('Finding user by identifier:', loginIdentifier);
    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase() },
        { username: loginIdentifier.toLowerCase() }
      ]
    }).select('+password');

    if (!user) {
      console.log('User not found:', loginIdentifier);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password...');

    if (!user.password) {
      console.log('User has no password (OAuth user):', loginIdentifier);
      return NextResponse.json(
        { message: 'This account uses social login. Please sign in with Google or GitHub.' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', loginIdentifier);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Password verified successfully');

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create the response first
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          email: user.email,
          username: user.username,
          name: user.name,
          role: user.role
        }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
        }
      }
    );

    console.log('Login successful for user:', email);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 