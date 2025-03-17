import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'), // Required field
  description: z.string().optional(), // Optional field
  icon: z.string().optional(), // Optional field
  color: z.string().optional(), // Optional field
  isDefault: z.boolean().default(false), // Default value
});

// Type inference for TypeScript
export type typeAddCategory = z.infer<typeof categorySchema>;
