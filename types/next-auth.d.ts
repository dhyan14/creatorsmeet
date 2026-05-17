import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      _id?: string;
      role?: string | null;
      profileCompleted?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string | null;
    _id?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string | null;
    provider?: string;
  }
}
