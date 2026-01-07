import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Tip from '@/models/Tip';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
    try {
        await dbConnect();
        const tips = await Tip.find()
            .populate('author', 'name role profileImage')
            .sort({ createdAt: -1 });

        return NextResponse.json(tips);
    } catch (error) {
        console.error('Error fetching tips:', error);
        return NextResponse.json(
            { message: 'Error fetching tips' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token.value, JWT_SECRET) as { userId: string };
        await dbConnect();

        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        if (user.role !== 'mentor') {
            return NextResponse.json(
                { message: 'Only mentors can post tips' },
                { status: 403 }
            );
        }

        const { content } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json(
                { message: 'Content is required' },
                { status: 400 }
            );
        }

        const tip = await Tip.create({
            content,
            author: user._id
        });

        // Populate author details for the response
        await tip.populate('author', 'name role profileImage');

        return NextResponse.json(tip, { status: 201 });
    } catch (error) {
        console.error('Error creating tip:', error);
        return NextResponse.json(
            { message: 'Error creating tip' },
            { status: 500 }
        );
    }
}
