import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const owner = searchParams.get('owner');
        const repo = searchParams.get('repo');
        const path = searchParams.get('path');
        const branch = searchParams.get('branch') || 'main';

        if (!owner || !repo || !path) {
            return NextResponse.json({
                error: 'Owner, repo, and path required'
            }, { status: 400 });
        }

        // Get GitHub token from request header
        const authHeader = req.headers.get('x-github-token');

        if (!authHeader) {
            return NextResponse.json({
                error: 'GitHub not connected'
            }, { status: 401 });
        }

        const githubToken = authHeader;

        // Fetch file content from GitHub
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch file');
        }

        const data = await response.json();

        // Decode base64 content
        let content = '';
        if (data.content) {
            content = Buffer.from(data.content, 'base64').toString('utf-8');
        }

        return NextResponse.json({
            name: data.name,
            path: data.path,
            content: content,
            size: data.size,
            sha: data.sha,
            url: data.html_url
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('File fetch error:', errorMessage);
        return NextResponse.json({
            error: `Failed to fetch file: ${errorMessage}`
        }, { status: 500 });
    }
}
