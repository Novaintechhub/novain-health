
import ReportNoShow from "@/components/patient/report-no-show";
import { Suspense } from "react";

export default function ReportNoShowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportNoShow />
    </Suspense>
  );
}
