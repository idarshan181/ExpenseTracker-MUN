'use client';

/* eslint-disable no-console */
import { createCompany } from '@/app/actions';
import { countryList } from '@/app/utils/countriesList';
import { companySchema } from '@/app/utils/zodSchemas';
import { UploadDropzone } from '@/components/general/UploadThingsRe';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

export default function CompanyForm() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      location: '',
      about: '',
      logo: '',
      website: '',
      xAccount: '',
    },
  });

  const [pending, setPending] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(data);
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company Name" {...field} />
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Location</FormLabel>
                {/* <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Worldwide</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>🌍</span>
                        {' '}
                        <span> Worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map(country => (
                        <SelectItem key={country.code} value={country.name}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={`w-full border border-gray-300 bg-transparent ${!field.value ? 'text-muted-foreground' : ''} focus:ring-2 focus:ring-green-500`}

                      >
                        <span className="flex w-full items-center">
                          {field.value
                            ? (
                                <>
                                  <span className="flex items-center">
                                    <span>{countryList.find(country => country.name === field.value)?.flagEmoji}</span>
                                    <span className="ml-2 text-left">{field.value}</span>
                                  </span>
                                </>
                              )
                            : (
                                'Select Location'
                              )}
                          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
                        </span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command onValueChange={field.onChange} value={field.value}>
                      <CommandInput placeholder="Select location..." />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup heading="Worldwide">
                          <CommandItem
                            value="worldwide"
                            onSelect={() => {
                              // field.onChange('worldwide');
                              setIsPopoverOpen(false);
                            }}
                          >
                            <span>🌍</span>
                            <span> Worldwide / Remote</span>
                          </CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="Location">
                          {countryList.map(country => (
                            <CommandItem
                              key={country.code}
                              value={country.name}
                              onSelect={() => {
                                // field.onChange(country.name);
                                setIsPopoverOpen(false);
                              }}
                            >
                              <span>{country.flagEmoji}</span>
                              <span className="pl-2">{country.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter) Account</FormLabel>
                <FormControl>
                  <Input placeholder="@yourcompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                {field.value
                  ? (
                      <div className="relative w-fit">
                        <Image src={field.value} alt="Company Logo" width={100} height={100} className="rounded-lg" />
                        <Button type="button" variant="destructive" size="icon" className="absolute -right-4 -top-2" onClick={() => field.onChange('')}>
                          <XIcon className="size-4" />
                        </Button>
                      </div>
                    )
                  : (
                      <UploadDropzone
                        endpoint="imageUploader"
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
          {pending ? 'Submitting...' : 'Continue' }
        </Button>
      </form>
    </Form>
  );
}
