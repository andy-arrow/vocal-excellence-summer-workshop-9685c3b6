import { z } from "zod";

export const emailSchema = z.string().email("Invalid email format").max(255, "Email too long");
export const phoneSchema = z.string().min(5, "Phone number too short").max(30, "Phone number too long");
export const nameSchema = z.string().min(1, "Name is required").max(100, "Name too long");

const vocalRangeValues = ['soprano', 'mezzo-soprano', 'alto', 'tenor', 'baritone', 'bass', 'other'] as const;

const dietaryValues = ['none', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'other'] as const;

export const applicationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  whereFrom: z.string().max(100).optional().nullable(),
  age: z.string().max(10).optional().nullable(),
  socialMedia: z.string().max(255).optional().nullable(),
  dateOfBirth: z.string().max(20).optional().nullable(),
  nationality: z.string().max(100).optional().nullable(),
  vocalRange: z.enum(vocalRangeValues).default('soprano'),
  yearsOfSinging: z.string().min(1, "Years of singing is required").max(50),
  musicalBackground: z.string().min(1, "Musical background is required").max(2000),
  teacherName: z.string().max(100).optional().nullable(),
  teacherEmail: z.string().email().optional().nullable().or(z.literal("")),
  reasonForApplying: z.string().min(1, "Reason for applying is required").max(5000),
  heardAboutUs: z.string().max(255).optional().nullable(),
  scholarshipInterest: z.boolean().optional().default(false),
  dietaryRestrictions: z.object({
    type: z.enum(dietaryValues).default('none').optional().nullable(),
    details: z.string().optional().nullable().default(''),
  }).optional().nullable(),
  areasOfInterest: z.string().max(1000).optional().nullable(),
  specialNeeds: z.string().max(1000).optional().nullable(),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

export const contactMessageSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
});

export const contactSubmissionSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  vocalType: z.string().max(50).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(50).optional().default("website"),
});

export const emailSignupSchema = z.object({
  email: emailSchema,
  source: z.string().max(100).optional().default("website"),
  variant: z.string().max(50).optional().nullable(),
  pagePath: z.string().max(255).optional().nullable(),
});

export const adminVerifySchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type EmailSignupInput = z.infer<typeof emailSignupSchema>;
