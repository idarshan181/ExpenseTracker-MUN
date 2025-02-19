'use client';

import { countryList } from '@/app/utils/countriesList';
import { jobSchema } from '@/app/utils/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SalaryRangeSelector from '../general/SalaryRangeSelector';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function CreateJobForm() {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: '',
      employmentType: '',
      location: '',
      salaryFrom: 0,
      salaryTo: 0,
      jobDescription: '',
      listingDuration: 30, // 30 days
      benefits: [''],
      skills: [],
      requirements: [],
      status: 'DRAFT',
      companyName: '',
      companyLocation: '',
      companyAbout: '',
      companyLogo: '',
      companyWebsite: '',
      companyXAccount: '',
    },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Form {...form}>
      <form className="col-span-1 flex flex-col gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel></SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">
                            Internship/Temporary
                          </SelectItem>
                          {/* <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
                          <SelectItem value="co-op">Co-op</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
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
                                        <span>
                                          {
                                            countryList.find(
                                              country =>
                                                country.name === field.value,
                                            )?.flagEmoji
                                          }
                                        </span>
                                        <span className="ml-2 text-left">
                                          {field.value}
                                        </span>
                                      </span>
                                    </>
                                  )
                                : (
                                    'Select Location'
                                  )}
                              <ChevronDown className="ml-auto size-4 shrink-0 opacity-50" />
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    currency="INR"
                    minSalary={10000}
                    maxSalary={100000}
                    step={1000}
                  />
                </FormControl>
              </FormItem>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
