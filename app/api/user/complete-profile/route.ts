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
            password, // Optional - for OAuth users to set backup password
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
        if (!username || !role) {
            return NextResponse.json(
                { success: false, message: 'Username and role are required' },
                { status: 400 }
            );
        }

        if (!skills || skills.length === 0) {
            return NextResponse.json(
                { success: false, message: 'At least one skill is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if username is already taken
        const existingUsername = await User.findOne({ username, email: { $ne: session.user.email } });
        if (existingUsername) {
            return NextResponse.json(
                { success: false, message: 'Username is already taken' },
                { status: 400 }
            );
        }

        // Hash password if provided
        let hashedPassword = null;
        if (password && password.length > 0) {
            const bcrypt = require('bcryptjs');
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Find user by email or create new one
        let user = await User.findOne({ email: session.user.email });

        if (!user) {
            // Create new user with all data (OAuth user completing profile for first time)
            user = await User.create({
                username,
                name: session.user.name,
                email: session.user.email,
                emailVerified: new Date(), // OAuth users have verified email
                image: session.user.image,
                password: hashedPassword, // Optional backup password
                role,
                skills,
                interests: interests || [],
                technologies: technologies || [],
                bio: bio || '',
                availability: availability || 'available',
                lookingFor: lookingFor || '',
                experienceLevel: experienceLevel || 'beginner',
                github: github || '',
                linkedin: linkedin || '',
                portfolio: portfolio || '',
                profileCompleted: true,
                setupStep: 2
            });
        } else {
            // Update existing user
            user.username = username;
            user.role = role;
            user.skills = skills;
            user.interests = interests || [];
            user.technologies = technologies || [];
            user.bio = bio || '';
            user.availability = availability || 'available';
            user.lookingFor = lookingFor || '';
            user.experienceLevel = experienceLevel || 'beginner';
            user.github = github || '';
            user.linkedin = linkedin || '';
            user.portfolio = portfolio || '';
            user.profileCompleted = true;

            // Update password if provided
            if (hashedPassword) {
                user.password = hashedPassword;
            }

            await user.save();
        }

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
