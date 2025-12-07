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
        await dbConnect();
        
        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // First time Google login - create new user
          await User.create({
            name: user.name,
            email: user.email,
            password: '', // No password for OAuth users
            role: 'innovator', // Default role - can be updated later
            country: '',
            profileImage: user.image || '/default-avatar.png',
            skills: [],
            bio: '',
            github: '',
            linkedin: '',
          });
          
          console.log('New user created via Google OAuth:', user.email);
        } else {
          console.log('Existing user signed in via Google:', user.email);
        }
        
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token, user }) {
      try {
        // Attach user ID to session
        if (session.user) {
          session.user.id = user.id;
          
          // Fetch full user data from MongoDB
          await dbConnect();
          const fullUser = await User.findOne({ email: session.user.email }).lean();
          
          if (fullUser) {
            session.user.role = fullUser.role;
            session.user._id = fullUser._id.toString();
            session.user.name = fullUser.name;
            session.user.email = fullUser.email;
            session.user.image = fullUser.profileImage;
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
