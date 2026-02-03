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
        const branch = searchParams.get('branch') || 'main';

        if (!owner || !repo) {
            return NextResponse.json({ error: 'Owner and repo required' }, { status: 400 });
        }

        // Get GitHub token from request header
        const authHeader = req.headers.get('x-github-token');

        if (!authHeader) {
            return NextResponse.json({
                error: 'GitHub not connected'
            }, { status: 401 });
        }

        const githubToken = authHeader;

        // Fetch repository tree from GitHub
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
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
            throw new Error(errorData.message || 'Failed to fetch repository tree');
        }

        const data = await response.json();

        // Build file tree structure
        const fileTree = buildFileTree(data.tree);

        return NextResponse.json({ tree: fileTree, sha: data.sha });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Tree fetch error:', errorMessage);
        return NextResponse.json({
            error: `Failed to fetch repository tree: ${errorMessage}`
        }, { status: 500 });
    }
}

function buildFileTree(items: any[]) {
    const root: any = { name: '/', type: 'tree', children: [] };
    const paths: { [key: string]: any } = { '/': root };

    // Filter and sort items
    const sortedItems = items
        .filter((item: any) => item.type === 'blob' || item.type === 'tree')
        .sort((a: any, b: any) => {
            // Directories first, then files
            if (a.type !== b.type) {
                return a.type === 'tree' ? -1 : 1;
            }
            return a.path.localeCompare(b.path);
        });

    for (const item of sortedItems) {
        const pathParts = item.path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        let currentPath = '';
        let parent = root;

        // Build parent directories if needed
        for (let i = 0; i < pathParts.length - 1; i++) {
            currentPath += (currentPath ? '/' : '') + pathParts[i];

            if (!paths[currentPath]) {
                const dir = {
                    name: pathParts[i],
                    type: 'tree',
                    path: currentPath,
                    children: []
                };
                parent.children.push(dir);
                paths[currentPath] = dir;
            }
            parent = paths[currentPath];
        }

        // Add the file or directory
        const node: any = {
            name: fileName,
            type: item.type,
            path: item.path,
            size: item.size,
            sha: item.sha
        };

        if (item.type === 'tree') {
            node.children = [];
            paths[item.path] = node;
        }

        parent.children.push(node);
    }

    return root.children;
}
