import { z } from 'zod';

export const RegistrationSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  mobileNumber: z.string().min(10, { message: 'Valid mobile number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  stateOfResidence: z.string().min(1, { message: 'State is required' }),
  lga: z.string().min(1, { message: 'LGA is required' }),
  language: z.string().min(1, { message: 'Language is required' }),
  role: z.enum(['patient', 'doctor']),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;
