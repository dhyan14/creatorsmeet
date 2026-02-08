import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

// GET single project by ID
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

        const project = await Project.findById(params.id)
            .populate('innovator', 'name email username image role skills technologies')
            .populate('developer', 'name email username image role skills technologies')
            .populate('tasks.assignedTo', 'name email username image');

        if (!project) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            project
        });
    } catch (error: any) {
        console.error('Get project error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// UPDATE project
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

        const project = await Project.findById(params.id);

        if (!project) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            );
        }

        // Update fields
        Object.keys(body).forEach(key => {
            if (body[key] !== undefined) {
                (project as any)[key] = body[key];
            }
        });

        await project.save();

        // Populate references
        await project.populate('innovator', 'name email username image');
        await project.populate('developer', 'name email username image');

        return NextResponse.json({
            success: true,
            message: 'Project updated successfully',
            project
        });
    } catch (error: any) {
        console.error('Update project error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE project
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

        const project = await Project.findByIdAndDelete(params.id);

        if (!project) {
            return NextResponse.json(
                { success: false, message: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error: any) {
        console.error('Delete project error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
