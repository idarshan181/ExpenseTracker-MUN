import OnboardingForm from '@/components/forms/Onboarding/OnboardingForm';
import { redirect } from 'next/navigation';
import { prisma } from '../utils/db';
import { requireUser } from '../utils/requireUser';

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect('/');
  }

  return user;
}

export default async function OnboardingPage() {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session.id as string);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}
