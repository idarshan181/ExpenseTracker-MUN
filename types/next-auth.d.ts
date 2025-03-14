// next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

// Extend the User object in session
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    backendToken?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    backendToken?: string;
    emailVerified?: boolean;
  }
  interface Account extends DefaultAccount {
    backendToken?: string;
    userData?: {
      id?: string | null | undefined;
      hd?: string | null | undefined;
      email?: string | null | undefined;
      email_verified?: boolean | null;
      name?: string | null | undefined;
      given_name?: string | null | undefined;
      family_name?: string | null | undefined;
      picture?: string | null | undefined;
    };
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    backendToken?: string;
    emailVerified?: boolean;
  }
}
