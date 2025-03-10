'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationForm from './NotificationForm';
import ProfileForm from './ProfileForm';

export function SettingsForm() {
  return (
    <Tabs defaultValue="profile" className="">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="w-full max-w-md">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="notifications" className="w-full max-w-md">
        <NotificationForm />
      </TabsContent>
    </Tabs>
  );
}
