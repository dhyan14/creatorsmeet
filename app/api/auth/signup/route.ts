import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, username, password, role } = body;

    // Validate required fields
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'Name, email, username, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate username format
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(username.toLowerCase())) {
      return NextResponse.json(
        { message: 'Username can only contain letters, numbers, underscores, and hyphens' },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { message: 'Username must be between 3 and 20 characters' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Check if username already exists (case-insensitive)
    const existingUsername = await User.findOne({
      username: username.toLowerCase()
    }).collation({ locale: 'en', strength: 2 });

    if (existingUsername) {
      return NextResponse.json(
        { message: 'Username already taken' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      role: role || null,
      setupStep: role ? 5 : 4, // If role provided, ready for profile, else needs role selection
      profileCompleted: false,
      needsPassword: false,
      emailVerified: null,
      otp,
      otpExpires
    });

    // In development, log OTP (in production, send email)
    console.log(`Development Mode OTP for ${email}: ${otp}`);

    // TODO: Send email with OTP using Resend or SendGrid

    return NextResponse.json(
      {
        message: 'Account created successfully. Please verify your email.',
        otpSent: true,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
          setupStep: user.setupStep
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Error creating account' },
      { status: 500 }
    );
  }
} 