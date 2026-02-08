import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Meeting from '@/models/Meeting';

// GET single meeting
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const meeting = await Meeting.findById(params.id)
            .populate('participants', 'name email username image')
            .populate('createdBy', 'name email username image')
            .populate('projectId', 'name description');

        if (!meeting) {
            return NextResponse.json(
                { success: false, message: 'Meeting not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            meeting
        });
    } catch (error: any) {
        console.error('Get meeting error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// UPDATE meeting
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        await dbConnect();

        const meeting = await Meeting.findById(params.id);

        if (!meeting) {
            return NextResponse.json(
                { success: false, message: 'Meeting not found' },
                { status: 404 }
            );
        }

        // Update fields
        Object.keys(body).forEach(key => {
            if (body[key] !== undefined) {
                (meeting as any)[key] = body[key];
            }
        });

        await meeting.save();

        // Populate references
        await meeting.populate('participants', 'name email username image');
        await meeting.populate('createdBy', 'name email username image');
        await meeting.populate('projectId', 'name description');

        return NextResponse.json({
            success: true,
            message: 'Meeting updated successfully',
            meeting
        });
    } catch (error: any) {
        console.error('Update meeting error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE meeting
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const meeting = await Meeting.findByIdAndDelete(params.id);

        if (!meeting) {
            return NextResponse.json(
                { success: false, message: 'Meeting not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Meeting deleted successfully'
        });
    } catch (error: any) {
        console.error('Delete meeting error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
