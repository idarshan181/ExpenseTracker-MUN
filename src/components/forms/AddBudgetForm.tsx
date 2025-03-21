'use client';

import { calculatePeriod } from '@/app/utils/date';

import { useCategories } from '@/hooks/useCategories';

import { cn } from '@/lib/utils';

import { budgetSchema, typeAddBudget } from '@/schemas/addBudgetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddBudgetFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  budget?: typeAddBudget | null;
}

export default function AddBudgetForm({
  onSuccess,
  onCancel,
  budget,
}: AddBudgetFormProps) {
  const { data: session } = useSession();
  const { data: categories } = useCategories();

  const queryClient = useQueryClient();

  const form = useForm<typeAddBudget>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      bname: budget?.bname || '',
      description: budget?.description || '',
      categoryId: budget?.categoryId
        ? String(budget.categoryId)
        : budget?.category?.id
          ? String(budget.category.id)
          : undefined,
      currency: budget?.currency || 'CAD',
      amount: budget?.amount ?? 0, // ✅ Ensure amount is always a number
      startDate: budget?.startDate ? new Date(budget.startDate) : new Date(),
      endDate: budget?.endDate ?? new Date(),
      isActive: budget?.isActive ?? true, // ✅ Ensure isActive is always a boolean
    },
  });

  const startDate = form.watch('startDate');

  useEffect(() => {
    if (budget) {
      form.reset(budget);
    }
  }, [budget, form]);

  useEffect(() => {
    const endDate = form.watch('endDate') || new Date();
    // Ensure endDate is always at least one day after startDate
    if (endDate <= startDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(startDate.getDate() + 1);
      form.setValue('endDate', nextDay);
    }
  }, [startDate, form]);

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  const mutation = useMutation({
    mutationFn: async (data: typeAddBudget) => {
      if (!session?.user?.backendToken) {
        throw new Error('User not authenticated');
      }

      const url = budget
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/budget/${budget.id}/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/budget/`;

      const method = budget ? 'PUT' : 'POST';

      const now = new Date();
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate as Date);

      const updatedData = {
        ...data,
        period: calculatePeriod(startDate, endDate),
        isActive: endDate > startDate && endDate > now,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.backendToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || budget
            ? 'Failed to update budget'
            : 'Failed to add budget',
        );
      }

      return result;
      return true;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['budgets'] });
    },
    onSuccess: async () => {
      toast.success('Budget Added Successfully!');

      await queryClient.invalidateQueries({ queryKey: ['budgets'] });
      await queryClient.refetchQueries({ queryKey: ['budgets'] });

      form.reset();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error, _newBudget) => {
      toast.error(
        error.message || 'Failed to create budget. Please try again.',
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit((data) => {
          mutation.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="bname"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Budget Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter budget description" />
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
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : '');
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
            name="startDate"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Start Date</FormLabel>
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
                      disabled={date => date < new Date('1900-01-01')}
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>End Date</FormLabel>
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
                      fromDate={startDate}
                      // defaultMonth={field.value ? new Date(field.value) : startDate}
                      disabled={date =>
                        !startDate || date <= startDate || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={value => field.onChange(String(value))}
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
                        categories.map(({ id, name }: { id: string; name: string }) => (
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
        <div className="flex justify-start space-x-2">
          <Button
            type="submit"
            className={cn(
              'text-white cursor-pointer',
              !onCancel ? 'w-full' : '',
            )}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating...
                  </>
                )
              : (
                  <>Create Budget</>
                )}
          </Button>

          <Button
            type="reset"
            variant="destructive"
            className="cursor-pointer"
            onClick={handleReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
