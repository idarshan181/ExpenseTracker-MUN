/* eslint-disable no-console */

'use client';

// import { createJobSeeker } from '@/app/actions';
import { jobSeekerSchema } from '@/app/utils/zodSchemas';
import { UploadDropzone } from '@/components/general/UploadThingsRe';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import pdfImage from '@/public/logos/pdf.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

export default function JobSeekerForm() {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: '',
      about: '',
      resume: '',
    },
  });

  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
    console.log(data);
    try {
      setPending(true);
      console.log(data);
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error(error);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                {field.value
                  ? (
                      <div className="relative w-fit">
                        <Image
                          src={pdfImage}
                          alt="Resume PDF"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -right-4 -top-2"
                          onClick={() => field.onChange('')}
                        >
                          <XIcon className="size-4" />
                        </Button>
                      </div>
                    )
                  : (
                      <UploadDropzone
                        endpoint="resumeUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].url);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                        className="border-primary ut-button:bg-primary ut-button:text-white hover:ut-button:bg-primary/90 ut-allowed-content:text-muted-foreground ut-label:text-muted-foreground"
                      />
                    )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Submitting...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
}
