'use client';

import { cn } from '@/lib/utils';

import { categorySchema, typeAddCategory } from '@/schemas/addCategorySchema';

import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { availableCategories } from '../Categories/CategoryIcons';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddCategoriesFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  category?: typeAddCategory | null;
}

export default function AddCategoriesForm({
  onSuccess,
  onCancel,
  category,
}: AddCategoriesFormProps) {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const form = useForm<typeAddCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category ? category.name : '',
      icon: category?.icon ?? availableCategories[0].name,
      color: category?.color ?? '#000000',
      description: category?.description ?? '',
    },
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  const mutation = useMutation({
    mutationFn: async (data: typeAddCategory) => {
      if (!session?.user?.backendToken) {
        throw new Error('User not authenticated');
      }

      const url = category
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${category.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/`;

      const method = category ? 'PUT' : 'POST';

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
        throw new Error(
          result.message || category
            ? 'Failed to update category'
            : 'Failed to add category',
        );
      }

      return result;
    },
    onMutate: async () => {
      // cancel any ongoing fetch to prevent duplicate calls
      await queryClient.cancelQueries({ queryKey: ['categories'] });
    },
    onSuccess: async () => {
      toast.success('Category Added Successfully!');

      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      await queryClient.refetchQueries({ queryKey: ['categories'] });

      form.reset();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error, _newCategory) => {
      toast.error(
        error.message || 'Failed to create category. Please try again.',
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
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Category Name" />
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
                <Textarea {...field} placeholder="Enter category description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map(({ name, icon: Icon, color }) => (
                    <SelectItem key={name} value={name}>
                      <Icon
                        className={cn(color, 'w-5 h-5 inline-block mr-2')}
                      />
                      <span>{name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-1/2">
          {/* Color Picker */}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Category Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
              : category
                ? (
                    'Update Category'
                  )
                : (
                    'Create Category'
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
