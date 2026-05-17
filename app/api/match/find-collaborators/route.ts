import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { findDevelopersForProject, findProjectsForDeveloper } from '@/lib/matching';
import dbConnect from '@/lib/db';
import User from '@/models/User';

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
            type, // 'developers' or 'projects'
            skills,
            technologies,
            projectType,
            interests,
            limit
        } = body;

        await dbConnect();

        // Get current user
        const currentUser = await User.findOne({ email: session.user.email });

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        let matches;

        if (type === 'developers') {
            // Creator looking for developers
            matches = await findDevelopersForProject(
                currentUser._id.toString(),
                skills || currentUser.skills || [],
                technologies || currentUser.technologies || [],
                projectType || currentUser.lookingFor || 'General',
                limit || 10
            );
        } else {
            // Developer looking for projects/creators
            matches = await findProjectsForDeveloper(
                currentUser._id.toString(),
                currentUser.skills || [],
                currentUser.technologies || [],
                interests || currentUser.interests || [],
                limit || 10
            );
        }

        return NextResponse.json({
            success: true,
            matches: matches.map(match => ({
                user: {
                    id: match.user._id,
                    name: match.user.name,
                    email: match.user.email,
                    username: match.user.username,
                    role: match.user.role,
                    image: match.user.image,
                    skills: match.user.skills,
                    technologies: match.user.technologies,
                    interests: match.user.interests,
                    bio: match.user.bio,
                    experienceLevel: match.user.experienceLevel,
                    availability: match.user.availability,
                    github: match.user.github,
                    linkedin: match.user.linkedin,
                    portfolio: match.user.portfolio
                },
                score: Math.round(match.score * 100), // Convert to percentage
                breakdown: {
                    skillMatch: Math.round(match.breakdown.skillMatch * 100),
                    interestMatch: Math.round(match.breakdown.interestMatch * 100),
                    technologyMatch: Math.round(match.breakdown.technologyMatch * 100),
                    experienceMatch: Math.round(match.breakdown.experienceMatch * 100),
                    availabilityMatch: Math.round(match.breakdown.availabilityMatch * 100)
                }
            }))
        });
    } catch (error: any) {
        console.error('Find collaborators error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
