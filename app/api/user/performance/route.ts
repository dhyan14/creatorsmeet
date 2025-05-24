import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verify(token.value, JWT_SECRET) as { userId: string };

    // Connect to MongoDB
    await dbConnect();

    // Find the current user and their active project
    const user = await User.findById(decoded.userId)
      .populate('activeProject')
      .lean();
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const project = user.activeProject;
    
    if (!project) {
      return NextResponse.json(
        { message: 'No active project found' },
        { status: 404 }
      );
    }

    // Calculate project progress
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
    const projectProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Get team metrics from the user's performance data
    const teamMetrics = user.performance || {
      communicationScore: 0,
      collaborationScore: 0,
      deliverySpeed: 0,
      codeQuality: 0
    };

    const performance = {
      projectProgress,
      tasksCompleted: completedTasks,
      totalTasks,
      milestones: project.milestones,
      teamMetrics
    };

    return NextResponse.json(performance);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json(
      { message: 'Error fetching performance data' },
      { status: 500 }
    );
  }
} 