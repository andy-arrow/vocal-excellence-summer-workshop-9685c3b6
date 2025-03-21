
import * as z from 'zod';

export const applicationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
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
  termsAgreed: z.boolean({
    required_error: 'You must agree to the terms and conditions',
  }).refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
