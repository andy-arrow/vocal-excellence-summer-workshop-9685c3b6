import * as z from 'zod';

// Extremely permissive email regex that accepts almost any string with an @ symbol
const ULTRA_PERMISSIVE_EMAIL_REGEX = /.+@.+/;

// Create type-safe arrays of valid values
const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;
const vocalRangeValues = ['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'] as const;

// Create an extremely permissive schema that accepts almost any input
export const applicationSchema = z.object({
  firstName: z.string().optional().default(''),
  
  lastName: z.string().optional().default(''),
  
  email: z.string()
    .regex(ULTRA_PERMISSIVE_EMAIL_REGEX, { message: 'Please include @ symbol in email' })
    .optional()
    .nullable()
    .default('')
    .or(z.literal('')), // Allow empty string email
  
  phone: z.string().optional().nullable().default(''),
  
  whereFrom: z.string().optional().nullable().default(''),
  
  age: z.number({
    invalid_type_error: "Please enter a number for age"
  }).int().positive().optional().nullable()
    .or(z.string().transform((val) => {
      // Try to convert string to number, or return null if not possible
      const parsed = parseInt(val);
      return isNaN(parsed) ? null : parsed;
    }))
    .or(z.literal('')), // Accept empty string for age
  
  socialMedia: z.string().optional().nullable().default(''),
  
  dateOfBirth: z.string().optional().nullable().default(''),
  
  nationality: z.string().optional().nullable().default(''),

  vocalRange: z.enum(vocalRangeValues, {
    required_error: 'Please select your vocal range',
  }).optional().nullable().default('soprano' as any)
    .or(z.string()), // Accept any string for vocal range
  
  yearsOfSinging: z.string().optional().nullable().default('')
    .or(z.number().transform(val => String(val))), // Accept numbers too
  
  musicalBackground: z.string().optional().nullable().default(''),
  
  teacherName: z.string().optional().nullable().default(''),
  
  teacherEmail: z.string().optional().nullable().default('')
    .or(z.string().email({ message: 'Please enter a valid email' }).optional()), // Accept any string
  
  reasonForApplying: z.string().optional().nullable().default(''),
  
  heardAboutUs: z.string().optional().nullable().default(''),
  
  scholarshipInterest: z.boolean().default(false).optional().nullable()
    .or(z.string().transform(val => val === 'true' || val === '1')), // Accept string representations
  
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues).default('none').optional().nullable(),
    details: z.string().optional().nullable().default(''),
  }).default({type: 'none', details: ''}).optional().nullable()
    .or(z.string().transform(val => ({ type: 'other', details: val })))
    .or(z.any()), // Accept literally anything
  
  areasOfInterest: z.string().optional().nullable().default(''),
  
  specialNeeds: z.string().optional().nullable().default(''),
  
  termsAgreed: z.boolean().default(true).optional().nullable()
    .or(z.string().transform(val => val !== 'false' && val !== '0'))
    .or(z.any()), // Accept literally anything for terms
}).passthrough(); // Accept any additional fields

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type DietaryRestrictionType = (typeof dietaryValues)[number];
export type VocalRangeType = (typeof vocalRangeValues)[number];
