
import DoctorViewAppointment from "@/components/doctor-view-appointment";
import { Suspense } from "react";

function DoctorViewAppointmentContent() {
    return <DoctorViewAppointment />;
}

export default function DoctorViewAppointmentPage() {
  return (
    <Suspense>
        <DoctorViewAppointmentContent />
    </Suspense>
  );
}

    