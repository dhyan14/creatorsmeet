import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import User from '@/models/User';

// CREATE new project
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
            name,
            description,
            technologies,
            budget,
            startDate,
            endDate
        } = body;

        // Validation
        if (!name) {
            return NextResponse.json(
                { success: false, message: 'Project name is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Get current user
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Create project
        const project = await Project.create({
            name,
            description: description || '',
            innovator: user._id,
            technologies: technologies || [],
            budget: budget || { min: 0, max: 0, currency: 'USD' },
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            status: 'planning',
            progress: 0,
            milestones: [],
            tasks: []
        });

        // Populate innovator details
        await project.populate('innovator', 'name email username image');

        return NextResponse.json({
            success: true,
            message: 'Project created successfully',
            project
        });
    } catch (error: any) {
        console.error('Create project error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET all projects (with filters)
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
        const myProjects = searchParams.get('my') === 'true';
        const status = searchParams.get('status');

        await dbConnect();

        // Get current user
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        let query: any = {};

        if (myProjects) {
            // Get projects where user is innovator or developer
            query = {
                $or: [
                    { innovator: user._id },
                    { developer: user._id }
                ]
            };
        }

        if (status) {
            query.status = status;
        }

        const projects = await Project.find(query)
            .populate('innovator', 'name email username image role')
            .populate('developer', 'name email username image role')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            projects
        });
    } catch (error: any) {
        console.error('Get projects error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
