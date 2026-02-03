import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // TODO: Get GitHub token from database
        const githubToken = 'USER_GITHUB_TOKEN'; // Replace with actual token retrieval

        if (!githubToken) {
            return NextResponse.json({ error: 'GitHub not connected' }, { status: 400 });
        }

        // Fetch user's repositories from GitHub
        const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Transform to needed format
        const formattedRepos = repos.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            owner: repo.owner.login,
            private: repo.private,
            description: repo.description,
            url: repo.html_url,
            defaultBranch: repo.default_branch,
            updatedAt: repo.updated_at
        }));

        return NextResponse.json({ repositories: formattedRepos });
    } catch (error) {
        console.error('Repositories fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { owner, repo, branch = 'main' } = await req.json();

        if (!owner || !repo) {
            return NextResponse.json({ error: 'Owner and repo required' }, { status: 400 });
        }

        // TODO: Clone repository to user's workspace
        // For now, return success
        return NextResponse.json({
            success: true,
            message: `Repository ${owner}/${repo} connected`,
            branch
        });
    } catch (error) {
        console.error('Repository connect error:', error);
        return NextResponse.json({ error: 'Failed to connect repository' }, { status: 500 });
    }
}
