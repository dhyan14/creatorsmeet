import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            username,
            role,
            skills,
            interests,
            technologies,
            bio,
            availability,
            lookingFor,
            experienceLevel,
            github,
            linkedin,
            portfolio
        } = body;

        // Validation
        if (!username || !role || !skills || !interests) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find user by email
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if username is already taken (if changing)
        if (user.username !== username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: 'Username already taken' },
                    { status: 400 }
                );
            }
        }

        // Update user profile
        user.username = username;
        user.role = role;
        user.skills = skills;
        user.interests = interests;
        user.technologies = technologies || [];
        user.bio = bio || '';
        user.availability = availability || 'available';
        user.lookingFor = lookingFor || '';
        user.experienceLevel = experienceLevel || 'beginner';
        user.github = github || '';
        user.linkedin = linkedin || '';
        user.portfolio = portfolio || '';
        user.profileCompleted = true;

        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Profile completed successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (error: any) {
        console.error('Profile completion error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email }).select('-password -otp -otpExpires');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user
        });
    } catch (error: any) {
        console.error('Get profile error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
