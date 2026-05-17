import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = NEXTAUTH_URL + '/api/codespace/git/connect/callback';

    return NextResponse.json({
        NEXTAUTH_URL: NEXTAUTH_URL || 'NOT SET',
        GITHUB_CLIENT_ID: GITHUB_CLIENT_ID || 'NOT SET',
        GITHUB_REDIRECT_URI: GITHUB_REDIRECT_URI || 'NOT SET',
        expectedCallbackURL: 'https://www.creatorsmeet.in/api/codespace/git/connect/callback'
    });
}
