
import type { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase-admin/firestore';
import type { DoctorCoreProfile, PatientProfile, Appointment } from '@/lib/types';

export const doctorConverter: FirestoreDataConverter<DoctorCoreProfile> = {
  toFirestore(doctor: DoctorCoreProfile): DocumentData {
    // Clean up undefined values before sending to Firestore
    const data: any = { ...doctor };
    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            delete data[key];
        }
    });
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): DoctorCoreProfile {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'doctor',
      createdAt: data.createdAt,
      imageUrl: data.imageUrl || '',
      specialty: data.specialty || '',
      isVerified: data.isVerified || false,
      rating: data.rating || 0,
      reviews: data.reviews || 0,
      location: data.location || '',
      availability: data.availability || 'Not set',
      price: data.price || 'Not set',
      image: data.image || `https://placehold.co/250x250.png?text=${data.firstName.charAt(0)}${data.lastName.charAt(0)}`,
      hint: data.hint || 'doctor portrait',
      memberSince: data.memberSince || new Date().toISOString().split('T')[0],
      earned: data.earned || "₦0.00",
      accountStatus: data.accountStatus || 'active',
    };
  },
};

export const patientConverter: FirestoreDataConverter<PatientProfile> = {
  toFirestore(patient: PatientProfile): DocumentData {
    // Clean up undefined values before sending to Firestore
    const data: any = { ...patient };
    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            delete data[key];
        }
    });
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): PatientProfile {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'patient',
      patientId: data.patientId || '',
      mobileNumber: data.mobileNumber,
      stateOfResidence: data.stateOfResidence,
      lga: data.lga,
      language: data.language,
      createdAt: data.createdAt,
      imageUrl: data.imageUrl || `https://placehold.co/40x40.png?text=${data.firstName.charAt(0)}${data.lastName.charAt(0)}`,
       // Add other patient-specific fields
      age: data.age || 0,
      address: data.address || '',
      phone: data.phone || data.mobileNumber,
      lastVisit: data.lastVisit || new Date().toISOString().split('T')[0],
      paid: data.paid || '₦0.00',
      avatarUrl: data.avatarUrl || data.imageUrl || `https://placehold.co/40x40.png?text=${data.firstName.charAt(0)}${data.lastName.charAt(0)}`,
      avatarHint: data.avatarHint || 'person portrait',
      genotype: data.genotype || 'N/A',
      bloodGroup: data.bloodGroup || 'N/A',
    };
  },
};

export const appointmentConverter: FirestoreDataConverter<Appointment> = {
    toFirestore(appointment: Appointment): DocumentData {
        return {
            ...appointment,
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Appointment {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            patientId: data.patientId,
            doctorId: data.doctorId,
            appointmentDate: data.appointmentDate, // Keep as ISO string
            bookingDate: data.bookingDate,
            type: data.type,
            status: data.status,
            amount: data.amount,
            isPaid: data.isPaid || false,
            cancellationReason: data.cancellationReason || '',
            // You'll need to fetch these separately
            doctorName: data.doctorName || 'Dr. Placeholder',
            doctorAvatar: data.doctorAvatar || 'https://placehold.co/40x40.png',
            doctorAvatarHint: data.doctorAvatarHint || 'doctor portrait',
            patientName: data.patientName || 'Patient Placeholder',
            patientAvatar: data.patientAvatar || 'https://placehold.co/40x40.png',
            patientAvatarHint: data.patientAvatarHint || 'person portrait',
            specialty: data.specialty || 'General',
        };
    },
};
