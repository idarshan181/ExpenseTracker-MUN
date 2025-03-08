/* eslint-disable no-console */
'use client';

import { cn } from '@/lib/utils';

import { categoryOptions } from '@/query/categories';
import {
  transactionSchema,
  typeAddTransaction,
} from '@/schemas/addTransactionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
}
export default function AddTransactionForm({
  onSuccess,
  onCancel,
}: AddTransactionFormProps) {
  const { data } = useQuery(categoryOptions);

  const form = useForm<typeAddTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: 'expense',
    },
  });

  const transactionType = form.watch('transactionType');

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  async function onSubmit(data: typeAddTransaction) {
    console.log('Transaction added', data);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
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
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="transfer" />
                    </FormControl>
                    <FormLabel className="font-normal">Transfer</FormLabel>
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
                <Select onValueChange={value => field.onChange(Number(value))}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.categories.map(category => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
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
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionType === 'expense'
                    ? (
                        <>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="wallet">Wallet</SelectItem>
                          <SelectItem value="banktransfer">
                            Bank Transfer
                          </SelectItem>
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
          <Button type="submit" className="text-white">Save Transaction</Button>
          <Button type="reset" variant="destructive" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
