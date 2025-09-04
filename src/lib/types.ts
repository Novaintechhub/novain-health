
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
    createdAt: string;
    imageUrl?: string;
}

export interface DoctorCoreProfile extends UserProfile {
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

export interface DoctorDetails {
    aboutMe?: string;
    mobileNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    clinicName?: string;
    clinicAddress?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    stateOfResidence?: string;
    lga?: string;
    language?: string;
    pricing?: string;
    services?: string[];
    specializations?: string[];
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    pinterestUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
}

export interface DoctorEducation {
    id?: string;
    college: string;
    degree: string;
    yearStarted: string;
    yearCompleted: string;
}

export interface DoctorExperience {
    id?: string;
    hospital: string;
    designation: string;
    from: string;
    to: string;
}

export interface DoctorAward {
    id?: string;
    name: string;
    year: string;
}

export interface DoctorMembership {
    id?: string;
    organization: string;
}

export interface DoctorRegistration {
    id?: string;
    registration: string;
    year: string;
}


// This is the composite type used by the application frontend
export interface DoctorProfile extends DoctorCoreProfile, DoctorDetails {
    education?: DoctorEducation[];
    experience?: DoctorExperience[];
    awards?: DoctorAward[];
    memberships?: DoctorMembership[];
    registrations?: DoctorRegistration[];
}


// Patient specific profile fields
export interface PatientProfile extends UserProfile {
    role: 'patient';
    patientId?: string; // New patient ID
    mobileNumber: string;
    stateOfResidence: string;
    lga: string;
    language: string;
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
