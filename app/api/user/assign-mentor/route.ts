import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Available AI mentors with their expertise
const AI_MENTORS = [
  {
    name: "TechGuide AI",
    expertise: ["Architecture Design", "Code Review", "Best Practices", "Technical Implementation"],
    avatar: "/ai-mentor-1.png",
    description: "Your technical advisor for software architecture and development best practices."
  },
  {
    name: "ProjectPro AI",
    expertise: ["Project Management", "Timeline Planning", "Risk Assessment", "Team Coordination"],
    avatar: "/ai-mentor-2.png",
    description: "Specialized in project planning and management methodologies."
  },
  {
    name: "InnovateMind AI",
    expertise: ["Innovation Strategy", "Market Analysis", "Product Development", "Business Planning"],
    avatar: "/ai-mentor-3.png",
    description: "Helps refine your ideas and develop market-ready solutions."
  },
  {
    name: "CodeCraft AI",
    expertise: ["Full-Stack Development", "Mobile Development", "DevOps", "Testing"],
    avatar: "/ai-mentor-4.png",
    description: "Expert in modern development practices and technical implementation."
  }
];

function findBestMentorMatch(user: any) {
  if (user.role === 'innovator') {
    // For innovators, prioritize mentors with business and innovation expertise
    return AI_MENTORS.find(mentor => 
      mentor.expertise.some(exp => 
        ['Innovation Strategy', 'Market Analysis', 'Product Development'].includes(exp)
      )
    ) || AI_MENTORS[0];
  } else {
    // For coders, match based on their tech stack
    const techMentor = AI_MENTORS.find(mentor =>
      mentor.expertise.some(exp =>
        ['Technical Implementation', 'Code Review', 'Architecture Design'].includes(exp)
      )
    );
    return techMentor || AI_MENTORS[0];
  }
}

export async function POST() {
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

    // Find the user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Find the best matching mentor
    const bestMentor = findBestMentorMatch(user);

    // Assign the mentor to the user
    user.aiMentor = {
      ...bestMentor,
      assignedAt: new Date()
    };

    await user.save();

    return NextResponse.json({
      message: 'AI mentor assigned successfully',
      mentor: user.aiMentor
    });
  } catch (error) {
    console.error('Error assigning AI mentor:', error);
    return NextResponse.json(
      { message: 'Error assigning AI mentor' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve current AI mentor
export async function GET() {
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

    const user = await User.findById(decoded.userId).select('aiMentor');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.aiMentor) {
      // If no mentor is assigned, assign one
      const bestMentor = findBestMentorMatch(user);
      user.aiMentor = {
        ...bestMentor,
        assignedAt: new Date()
      };
      await user.save();
    }

    return NextResponse.json(user.aiMentor);
  } catch (error) {
    console.error('Error retrieving AI mentor:', error);
    return NextResponse.json(
      { message: 'Error retrieving AI mentor' },
      { status: 500 }
    );
  }
} 