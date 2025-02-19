import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters long'),
  location: z.string().min(1, 'Location must be defined'),
  about: z
    .string()
    .min(10, 'Please provide a brief description of your company'),
  logo: z.string().min(1, 'Please upload a logo for your company'),
  website: z.string().url('Please provide a valid URL'),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  about: z.string().min(10, 'Please provide a brief description of yourself'),
  resume: z.string().min(1, 'Please upload your resume'),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  location: z.string().min(1, 'Location is required'),
  salaryFrom: z.number().int().nonnegative('Salary from must be a non-negative integer'),
  salaryTo: z.number().int().nonnegative('Salary to must be a non-negative integer'),
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters long'),
  listingDuration: z.number().int().nonnegative('Listing duration must be a non-negative integer'),
  benefits: z.array(z.string()).min(1, 'Please provide at least one benefit'),
  skills: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'ACTIVE', 'EXPIRED']).default('DRAFT'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters long'),
  companyLocation: z.string().min(1, 'Location must be defined'),
  companyAbout: z.string().min(10, 'Please provide a brief description of your company'),
  companyLogo: z.string().min(1, 'Please upload a logo for your company'),
  companyWebsite: z.string().url('Please provide a valid URL'),
  companyXAccount: z.string().optional(),
});
