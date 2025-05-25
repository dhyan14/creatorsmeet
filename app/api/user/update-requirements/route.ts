import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect, { getConnectionStatus } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    console.log('Starting update requirements API...');
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      console.log('No auth token found');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = verify(token.value, JWT_SECRET) as { userId: string };
    console.log('User ID from token:', decoded.userId);

    // Connect to MongoDB
    await dbConnect();
    const dbStatus = getConnectionStatus();
    console.log('MongoDB connection status:', dbStatus);

    // Get request body
    const body = await req.json();
    console.log('Request body:', body);
    const { description, technologies, complexity, expertise, preferredStack } = body;

    // Validate required fields
    if (!description || !technologies || !complexity || !expertise) {
      console.log('Missing required fields:', { description, technologies, complexity, expertise });
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update user's project requirements with retry logic
    let retries = 3;
    let user = null;

    while (retries > 0 && !user) {
      try {
        console.log('Attempting to update user project requirements (attempt', 4 - retries, 'of 3)');
        user = await User.findByIdAndUpdate(
          decoded.userId,
          {
            $set: {
              'projectRequirements.description': description,
              'projectRequirements.technologies': technologies,
              'projectRequirements.complexity': complexity,
              'projectRequirements.expertise': expertise,
              'projectRequirements.preferredStack': preferredStack || technologies[0],
            }
          },
          { 
            new: true,
            runValidators: true,
            select: '-password'
          }
        );

        if (!user) {
          console.error('User not found:', decoded.userId);
          return NextResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        }

        // Log successful update
        console.log('Successfully updated project requirements for user:', {
          userId: decoded.userId,
          requirements: {
            description: description.substring(0, 50) + '...',
            technologies,
            complexity,
            expertise,
            preferredStack: preferredStack || technologies[0]
          }
        });
        break;
      } catch (updateError) {
        console.error('Error updating user (attempt ' + (4 - retries) + '):', updateError);
        retries--;
        if (retries === 0) {
          throw updateError;
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating project requirements:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error updating project requirements' },
      { status: 500 }
    );
  }
} 