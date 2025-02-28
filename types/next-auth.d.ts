// next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

// Extend the User object in session
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
