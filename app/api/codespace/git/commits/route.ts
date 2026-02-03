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

        if (!owner || !repo) {
            return NextResponse.json({ error: 'Owner and repo required' }, { status: 400 });
        }

        // Get GitHub token from request header
        const authHeader = req.headers.get('x-github-token');

        if (!authHeader) {
            return NextResponse.json({
                error: 'GitHub not connected. Please connect your GitHub account first.'
            }, { status: 401 });
        }

        const githubToken = authHeader;

        // Fetch commits from GitHub
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=50`,
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('GitHub API error:', errorData);
            throw new Error(errorData.message || 'Failed to fetch commits');
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Commits fetch error:', errorMessage);
        return NextResponse.json({ error: `Failed to fetch commits: ${errorMessage}` }, { status: 500 });
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

        // Get GitHub token from request header
        const authHeader = req.headers.get('x-github-token');

        if (!authHeader) {
            return NextResponse.json({ error: 'GitHub not connected' }, { status: 401 });
        }
        const githubToken = authHeader;

        const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const headers = {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        // Step 1: Get the current commit SHA of the branch
        const refResponse = await fetch(`${baseUrl}/git/ref/heads/${branch}`, { headers });
        if (!refResponse.ok) {
            const errorData = await refResponse.json();
            throw new Error(`Failed to get branch reference: ${errorData.message}`);
        }
        const refData = await refResponse.json();
        const currentCommitSha = refData.object.sha;

        // Step 2: Get the current commit to get the tree SHA
        const commitResponse = await fetch(`${baseUrl}/git/commits/${currentCommitSha}`, { headers });
        if (!commitResponse.ok) {
            throw new Error('Failed to get current commit');
        }
        const commitData = await commitResponse.json();
        const currentTreeSha = commitData.tree.sha;

        // Step 3: Create blobs for each file
        const blobs = await Promise.all(
            files.map(async (file: { path: string; content: string }) => {
                const blobResponse = await fetch(`${baseUrl}/git/blobs`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        content: file.content,
                        encoding: 'utf-8'
                    })
                });
                if (!blobResponse.ok) {
                    throw new Error(`Failed to create blob for ${file.path}`);
                }
                const blobData = await blobResponse.json();
                return {
                    path: file.path,
                    mode: '100644',
                    type: 'blob',
                    sha: blobData.sha
                };
            })
        );

        // Step 4: Create a new tree
        const treeResponse = await fetch(`${baseUrl}/git/trees`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                base_tree: currentTreeSha,
                tree: blobs
            })
        });
        if (!treeResponse.ok) {
            throw new Error('Failed to create tree');
        }
        const treeData = await treeResponse.json();

        // Step 5: Create a new commit
        const newCommitResponse = await fetch(`${baseUrl}/git/commits`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                message,
                tree: treeData.sha,
                parents: [currentCommitSha]
            })
        });
        if (!newCommitResponse.ok) {
            throw new Error('Failed to create commit');
        }
        const newCommitData = await newCommitResponse.json();

        // Step 6: Update the branch reference
        const updateRefResponse = await fetch(`${baseUrl}/git/refs/heads/${branch}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                sha: newCommitData.sha,
                force: false
            })
        });
        if (!updateRefResponse.ok) {
            throw new Error('Failed to update branch reference');
        }

        return NextResponse.json({
            success: true,
            message: 'Commit created and pushed successfully',
            sha: newCommitData.sha,
            url: `https://github.com/${owner}/${repo}/commit/${newCommitData.sha}`
        });
    } catch (error) {
        console.error('Commit creation error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error: `Failed to create commit: ${errorMessage}`
        }, { status: 500 });
    }
}
