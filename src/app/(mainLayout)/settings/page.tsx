import { requireUser } from '@/app/utils/requireUser';
import { SettingsForm } from '@/components/forms/settings/SettingsForm';

export default async function SettingsPage() {
  await requireUser();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}
