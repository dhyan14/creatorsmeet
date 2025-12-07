import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const authOptions: NextAuthOptions = {
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
          
          // Try to fetch additional data from custom User model if available
          try {
            await dbConnect();
            const fullUser = await User.findOne({ email: session.user.email }).lean();
            
            if (fullUser) {
              session.user.role = (fullUser as any).role;
              session.user._id = (fullUser as any)._id.toString();
            } else {
              // Create user in custom model if not exists
              await User.create({
                name: session.user.name,
                email: session.user.email,
                password: '',
                role: 'innovator',
                country: '',
                profileImage: session.user.image || '/default-avatar.png',
                skills: [],
                bio: '',
                github: '',
                linkedin: '',
              });
              session.user.role = 'innovator';
            }
          } catch (dbError) {
            console.error('Error syncing with custom User model:', dbError);
            // Continue anyway - user is authenticated via OAuth
            session.user.role = 'innovator'; // Default role
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
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
    newUser: '/dashboard', // Redirect new users to dashboard
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
