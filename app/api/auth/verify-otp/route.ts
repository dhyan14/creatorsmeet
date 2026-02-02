import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json(
                { message: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find user with matching email and select OTP fields
        const user = await User.findOne({ email }).select('+otp +otpExpires');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { message: 'User already verified' },
                { status: 400 }
            );
        }

        // Check OTP
        if (user.otp !== otp) {
            return NextResponse.json(
                { message: 'Invalid OTP' },
                { status: 400 }
            );
        }

        // Check expiry
        if (user.otpExpires && user.otpExpires < new Date()) {
            return NextResponse.json(
                { message: 'OTP expired' },
                { status: 400 }
            );
        }

        // Verify user and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Create response
        const response = NextResponse.json(
            {
                message: 'Email verified successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
            { status: 200 }
        );

        // Set cookie
        const isProduction = process.env.NODE_ENV === 'production';
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { message: 'Verification failed' },
            { status: 500 }
        );
    }
}
