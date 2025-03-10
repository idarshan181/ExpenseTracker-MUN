import { z } from 'zod';

export const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
});
