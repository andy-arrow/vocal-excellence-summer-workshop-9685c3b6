
import * as z from 'zod';
import { EMAIL_REGEX } from '@/utils/security';

// Create type-safe arrays of valid values
const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;
const vocalRangeValues = ['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'] as const;

export const applicationSchema = z.object({
  firstName: z.string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must not exceed 50 characters' }),
  
  lastName: z.string()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must not exceed 50 characters' }),
  
  email: z.string()
    .min(1, { message: 'Email is required' })
    .max(100, { message: 'Email must not exceed 100 characters' })
    .regex(EMAIL_REGEX, { message: 'Please enter a valid email address' }),
  
  phone: z.string()
    .min(1, { message: 'Phone number is required' })
    .max(20, { message: 'Phone number must not exceed 20 characters' }),
  
  whereFrom: z.string().optional().default(''),
  
  age: z.number({
    invalid_type_error: "Age must be a number"
  }).int().positive().optional(),
  
  socialMedia: z.string().optional().default(''),
  
  dateOfBirth: z.string().optional().default(''),
  
  nationality: z.string().optional().default(''),

  vocalRange: z.enum(vocalRangeValues, {
    required_error: 'Please select your vocal range',
  }).optional().default('soprano' as any),
  
  yearsOfSinging: z.string().optional().default(''),
  
  musicalBackground: z.string().optional().default(''),
  
  teacherName: z.string().optional().default(''),
  teacherEmail: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  
  reasonForApplying: z.string().optional().default(''),
  
  heardAboutUs: z.string().optional().default(''),
  
  scholarshipInterest: z.boolean().default(false),
  
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues).default('none'),
    details: z.string().optional().default(''),
  }).default({type: 'none', details: ''}),
  
  areasOfInterest: z.string().optional().default(''),
  
  specialNeeds: z.string().optional().default(''),
  
  termsAgreed: z.boolean().default(true),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type DietaryRestrictionType = (typeof dietaryValues)[number];
export type VocalRangeType = (typeof vocalRangeValues)[number];
