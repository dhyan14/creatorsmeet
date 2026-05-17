import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Check username availability
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { available: false, message: 'Username is required' },
                { status: 400 }
            );
        }

        // Validate username format
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json({
                available: false,
                message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
            });
        }

        await dbConnect();

        // Check if username exists
        const existingUser = await User.findOne({ username }).lean();

        if (existingUser) {
            return NextResponse.json({
                available: false,
                message: 'Username is already taken'
            });
        }

        return NextResponse.json({
            available: true,
            message: 'Username is available'
        });
    } catch (error: any) {
        console.error('Check username error:', error);
        return NextResponse.json(
            { available: false, message: 'Error checking username' },
            { status: 500 }
        );
    }
}
