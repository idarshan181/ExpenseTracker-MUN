'use client';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/public/logos/logo.png';
import Image from 'next/image';
import { useState } from 'react';
import CompanyForm from './CompanyForm';
import JobSeekerForm from './JobSeekerForm';
import { UserTypeSelection } from './UserTypeForm';

type UserSelectionType = 'company' | 'jobseeker' | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserTypeSelction = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelction} />;
      case 2:
        return userType === 'company'
          ? (
              <CompanyForm />
            )
          : (
              <JobSeekerForm />
            );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-10 flex items-center gap-4">
        <Image src={Logo} alt="Logo" height={50} width={50} />
        <h1 className="text-4xl font-bold">
          Expense Tracker
          <span className="text-primary"> MUN</span>
        </h1>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
