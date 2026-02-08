import dbConnect from '@/lib/db';
import User, { IUser } from '@/models/User';

/**
 * AI-Powered Matching Algorithm for CreatorsMeet
 * Matches creators with developers based on multiple criteria
 */

interface MatchCriteria {
    userId?: string;
    projectId?: string;
    requiredSkills: string[];
    preferredTechnologies: string[];
    projectType: string;
    experienceLevel?: 'beginner' | 'intermediate' | 'expert';
}

interface MatchResult {
    user: any;
    score: number;
    breakdown: {
        skillMatch: number;
        interestMatch: number;
        technologyMatch: number;
        experienceMatch: number;
        availabilityMatch: number;
    };
}

/**
 * Calculate Jaccard similarity between two arrays
 * Formula: intersection / union
 */
function jaccardSimilarity(arr1: string[], arr2: string[]): number {
    if (arr1.length === 0 && arr2.length === 0) return 1;
    if (arr1.length === 0 || arr2.length === 0) return 0;

    const set1 = new Set(arr1.map(s => s.toLowerCase()));
    const set2 = new Set(arr2.map(s => s.toLowerCase()));

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size;
}

/**
 * Calculate skill match score (0-1)
 */
function calculateSkillMatch(requiredSkills: string[], userSkills: string[]): number {
    return jaccardSimilarity(requiredSkills, userSkills);
}

/**
 * Calculate interest/technology match score (0-1)
 */
function calculateInterestMatch(
    projectType: string,
    preferredTechs: string[],
    userInterests: string[],
    userTechs: string[]
): number {
    // Check if project type matches user interests
    const typeMatch = userInterests.some(interest =>
        interest.toLowerCase().includes(projectType.toLowerCase()) ||
        projectType.toLowerCase().includes(interest.toLowerCase())
    ) ? 0.5 : 0;

    // Check technology overlap
    const techMatch = jaccardSimilarity(preferredTechs, userTechs) * 0.5;

    return typeMatch + techMatch;
}

/**
 * Calculate experience match score (0-1)
 */
function calculateExperienceMatch(
    requiredLevel?: string,
    userLevel?: string
): number {
    if (!requiredLevel || !userLevel) return 0.5; // Neutral if not specified

    const levels = { beginner: 1, intermediate: 2, expert: 3 };
    const required = levels[requiredLevel as keyof typeof levels] || 2;
    const user = levels[userLevel as keyof typeof levels] || 2;

    // Perfect match = 1.0, one level off = 0.7, two levels off = 0.3
    const diff = Math.abs(required - user);
    if (diff === 0) return 1.0;
    if (diff === 1) return 0.7;
    return 0.3;
}

/**
 * Calculate availability score (0-1)
 */
function calculateAvailabilityScore(availability: string): number {
    const scores: Record<string, number> = {
        'available': 1.0,
        'busy': 0.5,
        'not-available': 0.1
    };
    return scores[availability] || 0.5;
}

/**
 * Main matching function
 * Returns top matches sorted by score
 */
export async function findMatches(
    criteria: MatchCriteria,
    limit: number = 10,
    excludeRole?: 'developer' | 'creator'
): Promise<MatchResult[]> {
    await dbConnect();

    // Build query to find potential matches
    const query: any = {
        profileCompleted: true,
        _id: { $ne: criteria.userId } // Exclude the requesting user
    };

    // If looking for specific role
    if (excludeRole) {
        query.role = { $ne: excludeRole };
    }

    // Get all potential matches
    const users = await User.find(query)
        .select('-password -otp -otpExpires')
        .lean();

    // Calculate match scores for each user
    const matches: MatchResult[] = users.map((user: any) => {
        // Calculate individual scores
        const skillMatch = calculateSkillMatch(
            criteria.requiredSkills,
            user.skills || []
        );

        const interestMatch = calculateInterestMatch(
            criteria.projectType,
            criteria.preferredTechnologies,
            user.interests || [],
            user.technologies || []
        );

        const experienceMatch = calculateExperienceMatch(
            criteria.experienceLevel,
            user.experienceLevel
        );

        const availabilityMatch = calculateAvailabilityScore(
            user.availability || 'available'
        );

        // Technology match (separate from interest)
        const technologyMatch = jaccardSimilarity(
            criteria.preferredTechnologies,
            user.technologies || []
        );

        // Weighted total score
        const totalScore =
            skillMatch * 0.35 +           // 35% weight on skills
            interestMatch * 0.20 +        // 20% weight on interests
            technologyMatch * 0.20 +      // 20% weight on technologies
            experienceMatch * 0.15 +      // 15% weight on experience
            availabilityMatch * 0.10;     // 10% weight on availability

        return {
            user,
            score: totalScore,
            breakdown: {
                skillMatch,
                interestMatch,
                technologyMatch,
                experienceMatch,
                availabilityMatch
            }
        };
    });

    // Sort by score descending and return top matches
    return matches
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .filter(match => match.score > 0.1); // Only return meaningful matches
}

/**
 * Find developer matches for a creator's project
 */
export async function findDevelopersForProject(
    creatorId: string,
    projectSkills: string[],
    projectTechnologies: string[],
    projectType: string,
    limit: number = 10
): Promise<MatchResult[]> {
    return findMatches(
        {
            userId: creatorId,
            requiredSkills: projectSkills,
            preferredTechnologies: projectTechnologies,
            projectType
        },
        limit,
        'creator' // Exclude other creators
    );
}

/**
 * Find project/creator matches for a developer
 */
export async function findProjectsForDeveloper(
    developerId: string,
    developerSkills: string[],
    developerTechnologies: string[],
    interests: string[],
    limit: number = 10
): Promise<MatchResult[]> {
    // For now, matching developers to creators
    // In future, this could match to actual projects
    return findMatches(
        {
            userId: developerId,
            requiredSkills: developerSkills,
            preferredTechnologies: developerTechnologies,
            projectType: interests[0] || 'General'
        },
        limit,
        'developer' // Exclude other developers
    );
}
