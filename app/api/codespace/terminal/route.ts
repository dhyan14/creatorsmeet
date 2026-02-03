import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Whitelist of safe commands
const ALLOWED_COMMANDS = [
    'ls', 'pwd', 'cat', 'echo', 'git status', 'git log',
    'npm --version', 'node --version', 'git --version'
];

const BLOCKED_PATTERNS = [
    /rm\s+-rf/,
    /sudo/,
    /chmod/,
    /chown/,
    /kill/,
    />/,  // Redirection
    /\|/,  // Piping
    /&&/,  // Chaining
    /;/    // Command separator
];

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { command, workingDirectory } = await req.json();

        if (!command) {
            return NextResponse.json({ error: 'Command required' }, { status: 400 });
        }

        // Security checks
        const isSafe = isCommandSafe(command);
        if (!isSafe) {
            return NextResponse.json({
                error: 'Command not allowed for security reasons'
            }, { status: 403 });
        }

        // Execute command with timeout
        try {
            const { stdout, stderr } = await execAsync(command, {
                timeout: 30000, // 30 second timeout
                cwd: workingDirectory || process.cwd(),
                maxBuffer: 1024 * 1024 // 1MB max output
            });

            return NextResponse.json({
                success: true,
                output: stdout || stderr,
                command
            });
        } catch (execError: any) {
            return NextResponse.json({
                success: false,
                error: execError.message,
                output: execError.stdout || execError.stderr,
                command
            });
        }
    } catch (error) {
        console.error('Terminal execution error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

function isCommandSafe(command: string): boolean {
    // Check against blocked patterns
    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(command)) {
            return false;
        }
    }

    // Check if command starts with an allowed command
    const commandStart = command.trim().split(' ')[0];
    const baseAllowed = ALLOWED_COMMANDS.some(allowed =>
        command.startsWith(allowed) || commandStart === allowed.split(' ')[0]
    );

    return baseAllowed;
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // TODO: Get command history from database
        return NextResponse.json({
            history: []
        });
    } catch (error) {
        console.error('Terminal history error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
