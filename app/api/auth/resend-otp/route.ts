import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendOTPEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if already verified
        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email already verified' },
                { status: 400 }
            );
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user with new OTP
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send email
        try {
            await sendOTPEmail({
                to: email,
                name: user.name,
                otp: otp
            });

            console.log(`New OTP sent to ${email}`);

            return NextResponse.json({
                success: true,
                message: 'New OTP sent to your email'
            }, { status: 200 });

        } catch (emailError) {
            console.error('Failed to send OTP email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send email. Please try again.' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Resend OTP error:', error);
        return NextResponse.json(
            { error: 'Failed to resend OTP' },
            { status: 500 }
        );
    }
}
