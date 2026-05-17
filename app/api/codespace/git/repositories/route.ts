import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const authHeader = req.headers.get('x-github-token');

        if (!authHeader) {
            return NextResponse.json({
                error: 'GitHub not connected. Please connect your GitHub account first.'
            }, { status: 401 });
        }

        const githubToken = authHeader;

        const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repositories from GitHub');
        }

        const repos = await response.json();

        const repositories = repos.map((repo: any) => ({
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

        return NextResponse.json({ repositories });
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return NextResponse.json({
            error: 'Failed to fetch repositories'
        }, { status: 500 });
    }
}
