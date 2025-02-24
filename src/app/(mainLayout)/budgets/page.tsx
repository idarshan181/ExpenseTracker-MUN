import { requireUser } from '@/app/utils/requireUser';
import { Button } from '@/components/ui/button';

export default async function Budgets() {
  await requireUser();
  return (
    <div className="">
      <Button variant="default" className="mx-auto">
        Welcome to your budgets
      </Button>
    </div>
  );
}
