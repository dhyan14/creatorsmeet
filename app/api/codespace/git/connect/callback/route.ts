import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.NEXTAUTH_URL + '/api/codespace/git/connect/callback';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            // Handle OAuth error
            const dashboardUrl = new URL('/dashboard', req.url);
            dashboardUrl.searchParams.set('git_error', error);
            return NextResponse.redirect(dashboardUrl);
        }

        if (!code) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

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
            const dashboardUrl = new URL('/dashboard', req.url);
            dashboardUrl.searchParams.set('git_error', tokenData.error_description || 'OAuth failed');
            return NextResponse.redirect(dashboardUrl);
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
        // For now, store in session or temporary storage
        console.log('GitHub OAuth successful for user:', githubUser.login);

        // Redirect back to dashboard with success
        const dashboardUrl = new URL('/dashboard', req.url);
        dashboardUrl.searchParams.set('git_connected', 'true');
        dashboardUrl.searchParams.set('github_username', githubUser.login);

        return NextResponse.redirect(dashboardUrl);
    } catch (error) {
        console.error('OAuth callback error:', error);
        const dashboardUrl = new URL('/dashboard', req.url);
        dashboardUrl.searchParams.set('git_error', 'Connection failed');
        return NextResponse.redirect(dashboardUrl);
    }
}
