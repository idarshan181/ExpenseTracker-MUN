'use client';

import { useCategories } from '@/hooks/useCategories';

import { cn } from '@/lib/utils';
import {
  transactionSchema,
  typeAddTransaction,
} from '@/schemas/addTransactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddTransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  transaction?: typeAddTransaction | null;
}
export default function AddTransactionForm({
  onSuccess,
  onCancel,
  transaction,
}: AddTransactionFormProps) {
  const { data: session } = useSession();
  const { data: categories } = useCategories();
  const queryClient = useQueryClient();

  const form = useForm<typeAddTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: transaction?.transactionType ?? 'expense',
      amount: 0, // Default to 0 instead of undefined
      categoryId: transaction?.categoryId ?? transaction?.category?.id, // ✅ Use categoryId or fallback to category.id
      transactionDate: new Date(), // Ensure date is always set
      description: transaction?.description ?? '',
      source: transaction?.source ?? undefined,
    },
  });

  useEffect(() => {
    if (transaction) {
      form.reset(transaction);
    }
  }, [transaction, form]);

  const transactionType = form.watch('transactionType') || 'expense';

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  const mutation = useMutation({
    mutationFn: async (data: typeAddTransaction) => {
      if (!session?.user?.backendToken) {
        throw new Error('User not authenticated');
      }

      const url = transaction
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${transaction.id}/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/`;

      const method = transaction ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.backendToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add transaction');
      }

      return result;
    },
    onMutate: async () => {
      // 🚀 Cancel any ongoing fetch to prevent duplicate calls
      await queryClient.cancelQueries({ queryKey: ['transactions'] });
    },
    onSuccess: async () => {
      toast.success(
        transaction ? 'Transaction Updated Successfully!' : 'Transaction Added Successfully!',
      );

      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      await queryClient.refetchQueries({ queryKey: ['categories'] });

      form.reset();

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error, _newTransaction) => {
      toast.error(
        error.message || 'Failed to add transaction. Please try again.',
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit(data => mutation.mutate(data))}
      >
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="expense" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="income" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    $
                  </span>
                  <Input
                    {...field}
                    min={0}
                    type="number"
                    step="0.1"
                    placeholder="0.00"
                    className="pl-8"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : ''); // Convert to number
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? (
                              format(field.value, 'PPP')
                            )
                          : (
                              <span>Pick a date</span>
                            )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={value => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories && categories.length > 0
                      ? (
                          categories.map(({ id, name }: { id: number; name: string }) => (
                            <SelectItem key={id} value={String(id)}>
                              {name}
                            </SelectItem>
                          ))
                        )
                      : (
                          <SelectItem disabled value="none">No categories available</SelectItem>
                        )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter transaction details" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Account (Source)</FormLabel>
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account">
                      {field.value ? field.value.charAt(0).toUpperCase() + field.value.slice(1) : 'Select account'}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionType === 'expense'
                    ? (
                        <>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="wallet">Wallet</SelectItem>
                        </>
                      )
                    : transactionType === 'income'
                      ? (
                          <>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="salary">Salary</SelectItem>
                          </>
                        )
                      : (
                          <>
                            <SelectItem value="accounts">Between Accounts</SelectItem>
                            <SelectItem value="savings">To Savings</SelectItem>
                            <SelectItem value="investment">To Investment</SelectItem>
                          </>
                        )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-4">
          <Button type="submit" className="text-white">
            {transaction ? 'Update Transaction' : 'Save Transaction'}
          </Button>
          <Button type="reset" variant="destructive" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
