'use server';

import { cookies } from 'next/headers';
import { signOut } from '../utils/auth';

export const handleSignOut = async () => {
  await signOut({ redirectTo: '/' });

  (await cookies()).delete('next-auth.session-token');
  (await cookies()).delete('next-auth.csrf-token');

  return { success: true };
};
