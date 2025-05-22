
import * as z from 'zod';
import { EMAIL_REGEX } from '@/utils/security';

// Create type-safe arrays of valid values
const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;
const vocalRangeValues = ['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'] as const;

// Create an extremely permissive schema that accepts almost any input
export const applicationSchema = z.object({
  firstName: z.string().optional().default(''),
  
  lastName: z.string().optional().default(''),
  
  email: z.string()
    .regex(EMAIL_REGEX, { message: 'Please enter a valid email address' })
    .optional()
    .or(z.literal('')), // Allow empty string email
  
  phone: z.string().optional().default(''),
  
  whereFrom: z.string().optional().default(''),
  
  age: z.number({
    invalid_type_error: "Please enter a number for age"
  }).int().positive().optional().nullable()
    .or(z.string().transform((val) => {
      // Try to convert string to number, or return null if not possible
      const parsed = parseInt(val);
      return isNaN(parsed) ? null : parsed;
    })), // Super permissive - accept strings and convert
  
  socialMedia: z.string().optional().default(''),
  
  dateOfBirth: z.string().optional().default(''),
  
  nationality: z.string().optional().default(''),

  vocalRange: z.enum(vocalRangeValues, {
    required_error: 'Please select your vocal range',
  }).optional().default('soprano' as any)
    .or(z.string()), // Accept any string for vocal range
  
  yearsOfSinging: z.string().optional().default('')
    .or(z.number().transform(val => String(val))), // Accept numbers too
  
  musicalBackground: z.string().optional().default(''),
  
  teacherName: z.string().optional().default(''),
  
  teacherEmail: z.string().optional().default('')
    .or(z.string().email({ message: 'Please enter a valid email' }).optional()), // Accept any string
  
  reasonForApplying: z.string().optional().default(''),
  
  heardAboutUs: z.string().optional().default(''),
  
  scholarshipInterest: z.boolean().default(false).optional()
    .or(z.string().transform(val => val === 'true' || val === '1')), // Accept string representations
  
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues).default('none').optional(),
    details: z.string().optional().default(''),
  }).default({type: 'none', details: ''}).optional().nullable()
    .or(z.string().transform(val => ({ type: 'other', details: val }))), // Accept any string as details
  
  areasOfInterest: z.string().optional().default(''),
  
  specialNeeds: z.string().optional().default(''),
  
  termsAgreed: z.boolean().default(true).optional()
    .or(z.string().transform(val => val !== 'false' && val !== '0')), // Accept anything but explicit false
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type DietaryRestrictionType = (typeof dietaryValues)[number];
export type VocalRangeType = (typeof vocalRangeValues)[number];
