import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.NEXTAUTH_URL + '/api/codespace/git/connect/callback';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');

        if (code) {
            // Handle OAuth callback
            return handleOAuthCallback(code, session.user.email!);
        } else {
            // Initiate OAuth flow
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=repo,user`;
            return NextResponse.json({ authUrl });
        }
    } catch (error) {
        console.error('Git connect error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { action } = await req.json();

        if (action === 'disconnect') {
            // TODO: Remove GitHub token from user in database
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Git disconnect error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function handleOAuthCallback(code: string, userEmail: string) {
    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: GITHUB_REDIRECT_URI
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description || 'OAuth failed');
        }

        const accessToken = tokenData.access_token;

        // Get user info from GitHub
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const githubUser = await userResponse.json();

        // TODO: Save encrypted token and GitHub username to user in database
        // For now, return success
        return NextResponse.json({
            success: true,
            githubUsername: githubUser.login
        });
    } catch (error) {
        console.error('OAuth callback error:', error);
        return NextResponse.json({ error: 'OAuth failed' }, { status: 500 });
    }
}
