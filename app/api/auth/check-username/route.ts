import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        // Validate username format
        const usernameRegex = /^[a-z0-9_-]+$/;
        if (!usernameRegex.test(username.toLowerCase())) {
            return NextResponse.json(
                {
                    available: false,
                    message: 'Username can only contain letters, numbers, underscores, and hyphens'
                },
                { status: 200 }
            );
        }

        if (username.length < 3 || username.length > 20) {
            return NextResponse.json(
                {
                    available: false,
                    message: 'Username must be between 3 and 20 characters'
                },
                { status: 200 }
            );
        }

        // Connect to database
        await dbConnect();

        // Check if username exists (case-insensitive)
        const existingUser = await User.findOne({
            username: username.toLowerCase()
        }).collation({ locale: 'en', strength: 2 });

        if (existingUser) {
            return NextResponse.json(
                {
                    available: false,
                    message: 'Username is already taken'
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                available: true,
                message: 'Username is available'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Username check error:', error);
        return NextResponse.json(
            { error: 'Failed to check username availability' },
            { status: 500 }
        );
    }
}
