
import RequestAppointment from "@/components/patient/request-appointment";
import { Suspense } from "react";

function RequestAppointmentContent() {
    return <RequestAppointment />;
}

export default function RequestAppointmentPage() {
  return (
    <Suspense>
        <RequestAppointmentContent />
    </Suspense>
  );
}
