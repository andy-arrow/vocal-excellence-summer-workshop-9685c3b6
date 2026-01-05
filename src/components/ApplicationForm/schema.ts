import * as z from 'zod';

const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;
const vocalRangeValues = ['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'] as const;

export const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100, "First name too long"),
  
  lastName: z.string().min(1, "Last name is required").max(100, "Last name too long"),
  
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
  
  phone: z.string()
    .min(5, "Phone number must be at least 5 characters")
    .max(30, "Phone number too long"),
  
  whereFrom: z.string().max(100).optional().nullable().default(''),
  
  age: z.string().max(10).optional().nullable().default(''),
  
  socialMedia: z.string().max(255).optional().nullable().default(''),
  
  dateOfBirth: z.string().max(20).optional().nullable().default(''),
  
  nationality: z.string().max(100).optional().nullable().default(''),

  vocalRange: z.string().max(50).optional().nullable().default('soprano'),
  
  yearsOfSinging: z.string().max(50).optional().nullable().default(''),
  
  musicalBackground: z.string().max(2000).optional().nullable().default(''),
  
  teacherName: z.string().max(100).optional().nullable().default(''),
  
  teacherEmail: z.string().email().optional().nullable().or(z.literal('')).default(''),
  
  reasonForApplying: z.string().max(5000).optional().nullable().default(''),
  
  heardAboutUs: z.string().max(255).optional().nullable().default(''),
  
  scholarshipInterest: z.boolean().default(false),
  
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues).default('none').optional().nullable(),
    details: z.string().optional().nullable().default(''),
  }).default({type: 'none', details: ''}).optional().nullable(),
  
  areasOfInterest: z.string().max(1000).optional().nullable().default(''),
  
  specialNeeds: z.string().max(1000).optional().nullable().default(''),
  
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export type DietaryRestrictionType = (typeof dietaryValues)[number];
export type VocalRangeType = (typeof vocalRangeValues)[number];
