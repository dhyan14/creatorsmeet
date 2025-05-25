import { NextResponse } from 'next/server';
import dbConnect, { getConnectionStatus } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test MongoDB connection
    await dbConnect();
    const connectionStatus = getConnectionStatus();
    console.log('MongoDB connection status:', connectionStatus);

    // Test user collection
    const userCount = await User.countDocuments();
    console.log('Total users in database:', userCount);

    // Get a sample user with project requirements
    const sampleUser = await User.findOne({ 
      'projectRequirements.description': { $exists: true } 
    }).select('-password');

    console.log('Sample user with project requirements:', sampleUser);

    return NextResponse.json({
      status: 'success',
      connectionStatus,
      userCount,
      sampleUser,
      message: 'Database connection and schema test successful'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Database test failed',
        error: error
      },
      { status: 500 }
    );
  }
} 