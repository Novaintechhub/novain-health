
import ViewMedicalRecord from "@/components/patient/view-medical-record";
import { Suspense } from "react";

function ViewMedicalRecordContent() {
    return <ViewMedicalRecord />;
}

export default function ViewMedicalRecordPage() {
  return (
    <Suspense>
        <ViewMedicalRecordContent />
    </Suspense>
  );
}
