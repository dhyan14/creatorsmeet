import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { idea } = await request.json();

        if (!idea || typeof idea !== 'string' || idea.trim().length < 50) {
            return NextResponse.json(
                { error: 'Idea description must be at least 50 characters' },
                { status: 400 }
            );
        }

        // Check if OpenAI API key is configured
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not configured');
            // Return fallback technologies based on keywords
            return NextResponse.json({
                technologies: extractTechnologiesFromKeywords(idea)
            });
        }

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a technical advisor that analyzes project ideas and identifies the most relevant technologies needed to build them. Return ONLY a JSON array of technology names, nothing else. Focus on specific frameworks, languages, and tools. Maximum 8 technologies.'
                    },
                    {
                        role: 'user',
                        content: `Analyze this project idea and extract the key technologies needed to build it:\n\n${idea}\n\nReturn only a JSON array of technology names.`
                    }
                ],
                temperature: 0.3,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '[]';

        // Parse the JSON array from the response
        let technologies: string[];
        try {
            technologies = JSON.parse(content);
        } catch {
            // If parsing fails, try to extract technologies from the text
            technologies = extractTechnologiesFromText(content);
        }

        // Validate and clean technologies
        technologies = technologies
            .filter((tech): tech is string => typeof tech === 'string' && tech.length > 0)
            .map(tech => tech.trim())
            .filter((tech, index, self) => self.indexOf(tech) === index) // Remove duplicates
            .slice(0, 8); // Limit to 8 technologies

        return NextResponse.json({ technologies });

    } catch (error) {
        console.error('Error analyzing idea:', error);

        // Fallback to keyword-based extraction
        const { idea } = await request.json();
        return NextResponse.json({
            technologies: extractTechnologiesFromKeywords(idea)
        });
    }
}

// Fallback function to extract technologies based on keywords
function extractTechnologiesFromKeywords(idea: string): string[] {
    const lowerIdea = idea.toLowerCase();
    const technologies: string[] = [];

    // Mobile keywords
    if (lowerIdea.includes('mobile') || lowerIdea.includes('app') || lowerIdea.includes('ios') || lowerIdea.includes('android')) {
        technologies.push('React Native');
        if (lowerIdea.includes('ios')) technologies.push('Swift');
        if (lowerIdea.includes('android')) technologies.push('Kotlin');
    }

    // Web keywords
    if (lowerIdea.includes('website') || lowerIdea.includes('web') || lowerIdea.includes('browser')) {
        technologies.push('React', 'Next.js', 'TypeScript');
    }

    // Backend keywords
    if (lowerIdea.includes('api') || lowerIdea.includes('backend') || lowerIdea.includes('server') || lowerIdea.includes('database')) {
        technologies.push('Node.js', 'MongoDB');
    }

    // Real-time keywords
    if (lowerIdea.includes('real-time') || lowerIdea.includes('live') || lowerIdea.includes('notification')) {
        technologies.push('WebSocket', 'Firebase');
    }

    // AI/ML keywords
    if (lowerIdea.includes('ai') || lowerIdea.includes('machine learning') || lowerIdea.includes('intelligent')) {
        technologies.push('Python', 'TensorFlow');
    }

    // Map keywords
    if (lowerIdea.includes('map') || lowerIdea.includes('location') || lowerIdea.includes('geo')) {
        technologies.push('Google Maps API');
    }

    // Payment keywords
    if (lowerIdea.includes('payment') || lowerIdea.includes('checkout') || lowerIdea.includes('subscription')) {
        technologies.push('Stripe');
    }

    // If no technologies detected, add generic web stack
    if (technologies.length === 0) {
        technologies.push('React', 'Node.js', 'MongoDB');
    }

    return Array.from(new Set(technologies)).slice(0, 8);
}

// Helper function to extract technologies from unstructured text
function extractTechnologiesFromText(text: string): string[] {
    const commonTech = [
        'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript', 'JavaScript',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes',
        'React Native', 'Flutter', 'Swift', 'Kotlin', 'Next.js', 'Express', 'Django',
        'Flask', 'TensorFlow', 'PyTorch', 'GraphQL', 'REST API', 'WebSocket', 'Redis'
    ];

    return commonTech.filter(tech =>
        text.toLowerCase().includes(tech.toLowerCase())
    ).slice(0, 8);
}
