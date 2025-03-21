/* eslint-disable no-console */
'use server';

import { cookies } from 'next/headers';
import { signOut } from '../utils/auth';

export const handleSignOut = async () => {
  console.log('inside handleSignOut');
  await signOut({ redirectTo: '/' });

  (await cookies()).delete('__Secure-authjs.session-token');
  (await cookies()).delete('authjs.session-token');
  (await cookies()).delete('authjs.callback-url');
  (await cookies()).delete('__Secure-authjs.state');
  (await cookies()).delete('__Host-authjs.csrf-token');
  (await cookies()).delete('authjs.csrf-token');

  console.log((await cookies()).getAll());

  return { success: true };
};
