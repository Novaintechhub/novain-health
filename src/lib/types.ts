
import { z } from 'zod';

// Regex for Nigerian phone numbers. Allows for +234 format or the standard 080/090 format.
const nigerianPhoneNumberRegex = /^((\+234)|0)[789][01]\d{8}$/;

export const RegistrationSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  mobileNumber: z.string().regex(nigerianPhoneNumberRegex, { message: 'Please enter a valid Nigerian phone number' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  stateOfResidence: z.string().min(1, { message: 'State is required' }),
  lga: z.string().min(1, { message: 'LGA is required' }),
  language: z.string().min(1, { message: 'Language is required' }),
  role: z.enum(['patient', 'doctor']),
  profileImage: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;

// Base user profile
interface UserProfile {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'patient' | 'doctor';
    mobileNumber: string;
    stateOfResidence: string;
    lga: string;
    language: string;
    createdAt: string;
    imageUrl?: string;
    dateOfBirth?: string;
}

// Doctor specific profile fields
export interface DoctorProfile extends UserProfile {
    role: 'doctor';
    specialty?: string;
    isVerified?: boolean;
    rating?: number;
    reviews?: number;
    location?: string;
    availability?: string;
    price?: string;
    image?: string;
    hint?: string;
    memberSince?: string;
    earned?: string;
    accountStatus?: "active" | "inactive";
}

// Patient specific profile fields
export interface PatientProfile extends UserProfile {
    role: 'patient';
    age?: number;
    address?: string;
    phone?: string;
    lastVisit?: string;
    paid?: string;
    avatarUrl?: string;
    avatarHint?: string;
    genotype?: string;
    bloodGroup?: string;
}

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  doctorAvatarHint: string;
  specialty: string;
  patientName: string;
  patientAvatar: string;
  patientAvatarHint: string;
  appointmentDate: string; // Stored as ISO string
  bookingDate: string;
  type: string;
  status: "Approved" | "Cancelled" | "Pending" | "Completed";
  amount: string;
  cancellationReason?: string;
};

    