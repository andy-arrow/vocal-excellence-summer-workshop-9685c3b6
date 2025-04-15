import * as z from 'zod';
import { EMAIL_REGEX } from '@/utils/security';
import { countries, nationalities } from '@/data/countries';

// Create type-safe arrays of valid values
const countryValues = countries.map(c => c.value);
const nationalityValues = nationalities.map(n => n.value);

export const applicationSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, { message: 'First name must not exceed 50 characters' })
    .regex(/^[a-zA-Z\s-']+$/, { message: 'First name can only contain letters, spaces, hyphens, and apostrophes' }),
  
  lastName: z.string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(50, { message: 'Last name must not exceed 50 characters' })
    .regex(/^[a-zA-Z\s-']+$/, { message: 'Last name can only contain letters, spaces, hyphens, and apostrophes' }),
  
  email: z.string()
    .min(5, { message: 'Email is required' })
    .max(100, { message: 'Email must not exceed 100 characters' })
    .regex(EMAIL_REGEX, { message: 'Please enter a valid email address' }),
  
  phone: z.string()
    .min(7, { message: 'Phone number must be at least 7 digits' })
    .max(20, { message: 'Phone number must not exceed 20 characters' })
    .regex(/^[+]?[\d\s-()]+$/, { message: 'Please enter a valid phone number' }),
  
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  nationality: z.enum(nationalityValues as [string, ...string[]], {
    required_error: 'Please select your nationality',
  }),
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.enum(countryValues as [string, ...string[]], {
    required_error: 'Please select your country',
  }),
  postalCode: z.string().min(1, { message: 'Postal/Zip code is required' }),
  vocalRange: z.enum(['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'], {
    required_error: 'Please select your vocal range',
  }),
  yearsOfExperience: z.string().min(1, { message: 'Years of experience is required' }),
  musicalBackground: z.string().min(50, { message: 'Please provide at least 50 characters' }),
  teacherName: z.string().optional(),
  teacherEmail: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  performanceExperience: z.string().min(50, { message: 'Please provide at least 50 characters' }),
  reasonForApplying: z.string().min(100, { message: 'Please provide at least 100 characters' }),
  heardAboutUs: z.string().min(1, { message: 'Please tell us how you heard about us' }),
  scholarshipInterest: z.boolean().default(false),
  specialNeeds: z.string().optional(),
  termsAgreed: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
