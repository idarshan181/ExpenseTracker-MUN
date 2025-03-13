import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { prisma } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github, Google],
  session: {
    strategy: 'jwt',
  },
  callbacks: {

    async signIn({ user, account }) {
      try {
        // Extract user details from the provider's response
        const userData = {
          id: user.id || account?.providerAccountId,
          hd: account?.provider,
          email: user.email,
          email_verified: true, // Google provides this, GitHub doesn't
          name: user.name,
          given_name: user.name?.split(' ')[0] || '',
          family_name: user.name?.split(' ').slice(1).join(' ') || '',
          picture: user.image,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok || !data.token) {
          console.error('SignIn failed: Backend denied access');
          return false; // Reject sign in
        }
        // Store the backend token in the user object for JWT callback
        if (account) {
          account.backendToken = data.token as string;
        }

        return true;
      } catch (error) {
        console.error('Error validating sign-in:', error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account?.backendToken) {
        token.backendToken = account.backendToken;
      }

      if (account?.id_token) {
        token.accessToken = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (typeof token?.backendToken === 'string') {
        session.user.backendToken = token.backendToken;
        session.userId = token.sub as string;
        session.user = {
          ...session?.user,
          id: token.sub as string,
        };
      } else {
        console.warn('Warning: Token does not contain a valid backendToken');
      }

      // Exposing accessToken (OAuth ID token) if needed
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
