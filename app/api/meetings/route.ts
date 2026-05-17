import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Meeting from '@/models/Meeting';

// Create a new meeting
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
            title,
            description,
            projectId,
            participants,
            scheduledAt,
            duration,
            meetingLink,
            agenda
        } = body;

        // Validation
        if (!title || !projectId || !scheduledAt) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await dbConnect();

        const meeting = await Meeting.create({
            title,
            description: description || '',
            projectId,
            participants: participants || [],
            scheduledAt: new Date(scheduledAt),
            duration: duration || 60,
            meetingLink: meetingLink || '',
            agenda: agenda || '',
            status: 'scheduled',
            notes: '',
            createdBy: session.user._id
        });

        // Populate references
        await meeting.populate('participants', 'name email image');
        await meeting.populate('createdBy', 'name email image');

        return NextResponse.json({
            success: true,
            message: 'Meeting created successfully',
            meeting
        });
    } catch (error: any) {
        console.error('Create meeting error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// Get all meetings for the current user
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const upcoming = searchParams.get('upcoming');

        await dbConnect();

        let query: any = {
            $or: [
                { createdBy: session.user._id },
                { participants: session.user._id }
            ]
        };

        if (status) {
            query.status = status;
        }

        if (upcoming === 'true') {
            query.scheduledAt = { $gte: new Date() };
            query.status = { $in: ['scheduled', 'in-progress'] };
        }

        const meetings = await Meeting.find(query)
            .populate('participants', 'name email image')
            .populate('createdBy', 'name email image')
            .populate('projectId', 'name description')
            .sort({ scheduledAt: 1 });

        return NextResponse.json({
            success: true,
            meetings
        });
    } catch (error: any) {
        console.error('Get meetings error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
