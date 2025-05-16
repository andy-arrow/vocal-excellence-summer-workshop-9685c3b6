
import * as z from 'zod';
import { EMAIL_REGEX } from '@/utils/security';

// Create type-safe arrays of valid values
const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;

export const applicationSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, { message: 'First name must not exceed 50 characters' }),
  
  lastName: z.string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(50, { message: 'Last name must not exceed 50 characters' }),
  
  email: z.string()
    .min(5, { message: 'Email is required' })
    .max(100, { message: 'Email must not exceed 100 characters' })
    .regex(EMAIL_REGEX, { message: 'Please enter a valid email address' }),
  
  phone: z.string()
    .min(5, { message: 'Phone number is required' })
    .max(20, { message: 'Phone number must not exceed 20 characters' }),
  
  whereFrom: z.string().min(1, { message: 'Please tell us where you are from' }),
  
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number"
  }).int().positive().min(16, { message: 'You must be at least 16 years old' }).max(100).optional(),
  
  socialMedia: z.string().optional(),
  
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  
  nationality: z.string().min(1, { message: 'Nationality is required' }),

  vocalRange: z.enum(['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'], {
    required_error: 'Please select your vocal range',
  }),
  
  yearsOfSinging: z.string().optional(),
  
  musicalBackground: z.string()
    .min(10, { message: 'Please provide some details about your musical background' }),
  
  teacherName: z.string().optional(),
  teacherEmail: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  
  reasonForApplying: z.string()
    .min(50, { message: 'Please provide at least 50 characters explaining why you want to join the programme' })
    .max(2000, { message: 'Your explanation must not exceed 2000 characters' }),
  
  heardAboutUs: z.string()
    .min(1, { message: 'Please tell us how you heard about us' }),
  
  scholarshipInterest: z.boolean().default(false),
  
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues),
    details: z.string().optional(),
  }),
  
  areasOfInterest: z.string().optional(),
  
  specialNeeds: z.string().optional(),
  
  termsAgreed: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type DietaryRestrictionType = (typeof dietaryValues)[number];
