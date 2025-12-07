import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
    async session({ session, token, user }) {
      try {
        // Attach user ID to session
        if (session.user && user) {
          session.user.id = user.id;
          session.user.email = user.email || session.user.email;
          session.user.name = user.name || session.user.name;
          session.user.image = user.image || session.user.image;
          
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
            // Continue anyway - user is authenticated via OAuth adapter
          }
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
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
