/* eslint-disable no-console */
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
    async jwt({ token, account }) {
      console.log('JWT Callback - Account::Token', account?.id_token);
      if (account?.id_token) {
        token.accessToken = account.id_token;
        console.log('JWT Callback - Token:', token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token);

      // NOTE: Exposing accessToken (id_token) in session to client
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
        console.log('Session Object with Token:', session);
      } else {
        console.warn('Warning: Token does not contain accessToken');
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
