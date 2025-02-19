import { Button } from '@/components/ui/button';
import { Building2, UserRound } from 'lucide-react';

type UserTypeSelectionProps = {
  onSelect: (type: 'company' | 'jobseeker') => void;
};

export function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome! Lets get started</h2>
        <p className="text-muted-foreground">
          Choose how would you like to use platform!
        </p>
      </div>
      <div className="grid gap-4">
        <Button
          variant="outline"
          className="h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={() => onSelect('company')}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Company / Organization</h3>
            <p>Post jobs and find great talent.</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={() => onSelect('jobseeker')}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Job Seeker</h3>
            <p>Find your dream job opportunity</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
