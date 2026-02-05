import { NextRequest, NextResponse } from 'next/server';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.NEXTAUTH_URL + '/api/codespace/git/connect/callback';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        // Handle OAuth error
        if (error) {
            return new NextResponse(
                `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>GitHub Auth Failed</title>
                </head>
                <body>
                    <script>
                        window.opener.postMessage({
                            type: 'github_oauth_error',
                            error: '${error}'
                        }, window.location.origin);
                        window.close();
                    </script>
                    <p>Authentication failed. This window will close automatically...</p>
                </body>
                </html>
                `,
                {
                    headers: { 'Content-Type': 'text/html' }
                }
            );
        }

        if (!code) {
            return new NextResponse(
                `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>GitHub Auth Failed</title>
                </head>
                <body>
                    <script>
                        window.opener.postMessage({
                            type: 'github_oauth_error',
                            error: 'No authorization code received'
                        }, window.location.origin);
                        window.close();
                    </script>
                    <p>Authentication failed. This window will close automatically...</p>
                </body>
                </html>
                `,
                {
                    headers: { 'Content-Type': 'text/html' }
                }
            );
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

        // Return HTML that closes popup and sends success message
        return new NextResponse(
            `
            <!DOCTYPE html>
            <html>
            <head>
                <title>GitHub Connected</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }
                    .container {
                        text-align: center;
                        padding: 2rem;
                    }
                    .checkmark {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                        animation: scaleIn 0.3s ease-out;
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0); }
                        to { transform: scale(1); }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="checkmark">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h1>Connected!</h1>
                    <p>GitHub account linked successfully</p>
                    <p style="opacity: 0.8; font-size: 0.9rem;">This window will close automatically...</p>
                </div>
                <script>
                    // Send success message to parent window
                    if (window.opener) {
                        window.opener.postMessage({
                            type: 'github_oauth_success',
                            token: '${accessToken}',
                            username: '${githubUser.login}'
                        }, window.location.origin);
                    }
                    
                    // Close window after a short delay
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                </script>
            </body>
            </html>
            `,
            {
                headers: { 'Content-Type': 'text/html' }
            }
        );
    } catch (error) {
        console.error('OAuth callback error:', error);
        return new NextResponse(
            `
            <!DOCTYPE html>
            <html>
            <head>
                <title>GitHub Auth Error</title>
            </head>
            <body>
                <script>
                    window.opener.postMessage({
                        type: 'github_oauth_error',
                        error: 'Authentication failed'
                    }, window.location.origin);
                    window.close();
                </script>
                <p>Authentication failed. This window will close automatically...</p>
            </body>
            </html>
            `,
            {
                headers: { 'Content-Type': 'text/html' }
            }
        );
    }
}
