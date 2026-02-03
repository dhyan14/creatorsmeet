import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.NEXTAUTH_URL + '/api/codespace/git/connect/callback';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            return new NextResponse(
                `<html><body><script>
                    if (window.opener) {
                        window.opener.postMessage({ type: 'github_oauth_error', error: '${error}' }, '*');
                        window.close();
                    } else {
                        window.location.href = '/dashboard?git_error=${error}';
                    }
                </script></body></html>`,
                { headers: { 'Content-Type': 'text/html' } }
            );
        }

        if (!code) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

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
            return new NextResponse(
                `<html><body><script>
                    if (window.opener) {
                        window.opener.postMessage({ type: 'github_oauth_error', error: '${tokenData.error_description || 'OAuth failed'}' }, '*');
                        window.close();
                    } else {
                        window.location.href = '/dashboard?git_error=oauth_failed';
                    }
                </script></body></html>`,
                { headers: { 'Content-Type': 'text/html' } }
            );
        }

        const accessToken = tokenData.access_token;

        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const githubUser = await userResponse.json();

        return new NextResponse(
            `<html><body><script>
                if (window.opener) {
                    window.opener.postMessage({ 
                        type: 'github_oauth_success', 
                        username: '${githubUser.login}',
                        token: '${accessToken}'
                    }, '*');
                    window.close();
                } else {
                    sessionStorage.setItem('github_token', '${accessToken}');
                    sessionStorage.setItem('github_username', '${githubUser.login}');
                    window.location.href = '/dashboard?git_connected=true&github_username=${githubUser.login}';
                }
            </script>
            <p>Connected! Closing window...</p>
            </body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
        );
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('OAuth callback error:', errorMessage, error);
        return new NextResponse(
            `<html><body><script>
                console.error('OAuth Error:', '${errorMessage}');
                if (window.opener) {
                    window.opener.postMessage({ type: 'github_oauth_error', error: 'Connection failed: ${errorMessage}' }, '*');
                    window.close();
                } else {
                    window.location.href = '/dashboard?git_error=connection_failed';
                }
            </script>
            <p>Error: ${errorMessage}</p>
            </body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
        );
    }
}
