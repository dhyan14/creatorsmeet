import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const owner = searchParams.get('owner');
        const repo = searchParams.get('repo');
        const page = searchParams.get('page') || '1';
        const perPage = searchParams.get('perPage') || '30';

        if (!owner || !repo) {
            return NextResponse.json({ error: 'Owner and repo required' }, { status: 400 });
        }

        // TODO: Get GitHub token from database
        const githubToken = 'USER_GITHUB_TOKEN';

        if (!githubToken) {
            return NextResponse.json({ error: 'GitHub not connected' }, { status: 400 });
        }

        // Fetch commits from GitHub
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=${perPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch commits');
        }

        const commits = await response.json();

        // Transform to needed format
        const formattedCommits = commits.map((commit: any) => ({
            sha: commit.sha,
            message: commit.commit.message,
            author: {
                name: commit.commit.author.name,
                email: commit.commit.author.email,
                avatar: commit.author?.avatar_url
            },
            date: commit.commit.author.date,
            url: commit.html_url
        }));

        return NextResponse.json({ commits: formattedCommits });
    } catch (error) {
        console.error('Commits fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch commits' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { owner, repo, message, files, branch = 'main' } = await req.json();

        if (!owner || !repo || !message || !files || files.length === 0) {
            return NextResponse.json({
                error: 'Owner, repo, message, and files required'
            }, { status: 400 });
        }

        // TODO: Get GitHub token from database
        const githubToken = 'USER_GITHUB_TOKEN';

        if (!githubToken) {
            return NextResponse.json({ error: 'GitHub not connected' }, { status: 400 });
        }

        // Create commit via GitHub API
        // This is a simplified version - full implementation would:
        // 1. Get current branch SHA
        // 2. Create tree with file changes
        // 3. Create commit
        // 4. Update branch reference

        return NextResponse.json({
            success: true,
            message: 'Commit created successfully',
            sha: 'mock-commit-sha'
        });
    } catch (error) {
        console.error('Commit creation error:', error);
        return NextResponse.json({ error: 'Failed to create commit' }, { status: 500 });
    }
}
