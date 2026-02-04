import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // Validate OTP format (6 digits)
        if (!/^\d{6}$/.test(otp)) {
            return NextResponse.json(
                { error: 'Invalid OTP format' },
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Find user by email
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select('+otp +otpExpires');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if user is already verified
        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email already verified' },
                { status: 400 }
            );
        }

        // Check if OTP exists
        if (!user.otp || !user.otpExpires) {
            return NextResponse.json(
                { error: 'No OTP found. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpires) {
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Verify OTP
        if (user.otp !== otp) {
            return NextResponse.json(
                { error: 'Invalid OTP' },
                { status: 400 }
            );
        }

        // Mark email as verified
        user.emailVerified = new Date();
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                emailVerified: true
            }
        }, { status: 200 });

    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
