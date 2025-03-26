import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string().optional(),
  categoryId: z.string().optional(),
  transactionType: z.enum(['expense', 'income'], {
    required_error: 'Transaction type is required',
  }),
  source: z.enum(['card', 'cash', 'wallet', 'salary']).optional(),
  currency: z.string().default('CAD'),
  amount: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) {
        return undefined;
      }
      return Number(val);
    },
    z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
      .positive('Amount must be a positive number')
      .max(9999999999.99, 'Amount must not exceed 10 digits with 2 decimal places'),
  ),
  // transactionDate: z.date().refine(date => date <= new Date(), {
  //   message: 'Transaction date cannot be in the future',
  // }),
  transactionDate: z.string()
    .refine(date => !Number.isNaN(Date.parse(date)), { message: 'Invalid date format' }) // Ensures valid ISO date
    .refine(date => new Date(date) <= new Date(), { message: 'Transaction date cannot be in the future' }),
  description: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

export type typeAddTransaction = z.infer<typeof transactionSchema> & {
  category?: { id: number; name: string } | null; // Ensure category exists in type
}; ;
