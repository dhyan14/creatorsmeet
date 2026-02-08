import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
    // adapter: MongoDBAdapter(clientPromise), // Disabled temporarily - using JWT sessions
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                console.log('SignIn callback triggered for:', user.email);

                // Always allow OAuth sign in - let the adapter handle user creation
                return true;
            } catch (error) {
                console.error('Error in signIn callback:', error);
                return true; // Still allow sign in even if error
            }
        },
        async session({ session, token }) {
            try {
                // Attach user data from token to session
                if (session.user && token) {
                    session.user.id = token.sub || token.id as string;
                    session.user.email = token.email as string || session.user.email;
                    session.user.name = token.name as string || session.user.name;
                    session.user.image = token.picture as string || session.user.image;

                    // Try to fetch additional data from custom User model if exists
                    try {
                        await dbConnect();
                        const fullUser = await User.findOne({ email: session.user.email }).lean();

                        if (fullUser) {
                            // User exists in database - attach their data
                            session.user.role = (fullUser as any).role;
                            session.user._id = (fullUser as any)._id.toString();
                            session.user.profileCompleted = (fullUser as any).profileCompleted;
                        } else {
                            // User NOT in database yet - they need to complete profile
                            // Don't create user here - wait for profile completion
                            session.user.role = null;
                            session.user.profileCompleted = false;
                        }
                    } catch (dbError) {
                        console.error('Error checking user in database:', dbError);
                        // If DB error, assume profile not completed
                        session.user.role = null;
                        session.user.profileCompleted = false;
                    }
                }
                return session;
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        },
        async jwt({ token, user, account, profile }) {
            // Initial sign in
            if (account && user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
                token.provider = account.provider;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback - URL:', url, 'BaseURL:', baseUrl); // Debug log

            // For OAuth callbacks, always redirect to complete-profile
            // The complete-profile page will check if profile is already complete
            // and redirect to dashboard if needed

            // Check if this is an OAuth callback or signin/signup redirect
            if (url.includes('/api/auth/callback/') ||
                url.includes('/signin') ||
                url.includes('/signup')) {
                console.log('OAuth detected, redirecting to complete-profile');
                return `${baseUrl}/complete-profile`;
            }

            // Allow callback URLs from same origin
            if (url.startsWith(baseUrl)) return url;
            // Allow relative callback URLs  
            else if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Default to complete-profile for safety
            return `${baseUrl}/complete-profile`;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/signin',
        newUser: '/complete-profile', // Redirect new users to complete profile
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};
