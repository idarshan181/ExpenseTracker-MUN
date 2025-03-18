import { signIn } from 'next-auth/react';

test('should call signIn function with correct provider', async () => {
  const signInMock = jest.spyOn(signIn, 'default');
  await signIn('github');
  expect(signInMock).toHaveBeenCalledWith('github');
});
