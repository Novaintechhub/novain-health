
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
    price?: string; // This can be a default or average price
    image?: string;
    hint?: string;
    memberSince?: string;
    earned?: string;
    accountStatus?: "active" | "inactive";
    stateOfResidence?: string;
    lga?: string;
    language?: string;
    mobileNumber?: string;
    reliabilityScore?: number;
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
    services?: string[];
    specializations?: string[];
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    pinterestUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
    pricingModel?: 'free' | 'custom';
    freeMethods?: {
        video: boolean;
        voice: boolean;
        chat: boolean;
    };
    customPricing?: {
        video: { '15'?: number, '30'?: number, '45'?: number, '60'?: number };
        voice: { '15'?: number, '30'?: number, '45'?: number, '60'?: number };
        chat: { '15'?: number, '30'?: number, '45'?: number, '60'?: number };
    };
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
    licenseBody: string;
    registrationNumber: string;
    year: string;
    certificateUrl?: string;
}


// This is the composite type used by the application frontend
export interface DoctorProfile extends DoctorCoreProfile, DoctorDetails {
    education?: DoctorEducation[];
    experience?: DoctorExperience[];
    awards?: DoctorAward[];
    memberships?: DoctorMembership[];
    registrations?: DoctorRegistration[];
    schedule?: any; // Consider a more specific type later
    approvedAppointments?: Partial<Appointment>[];
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
    dateOfBirth?: string;
    walletBalance?: number;
}

export type ConsultationDetails = {
    symptoms: string;
    symptomsStartDate: string;
    existingConditions: string;
    currentMedications: string;
    allergies: string;
    seenDoctorBefore: 'Yes' | 'No';
    medicalRecordUris?: string[];
};

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
  status: "Approved" | "Cancelled" | "Pending" | "Completed" | "No-Show";
  amount: string;
  isPaid: boolean;
  cancellationReason?: string;
  duration?: string;
  consultationDetails?: ConsultationDetails;
};
