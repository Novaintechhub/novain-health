import OtpVerification from "@/components/otp-verification";
import { Suspense } from "react";

// A component that uses useSearchParams must be wrapped in a Suspense boundary.
const OtpVerificationComponent = () => {
  return <OtpVerification />;
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <OtpVerificationComponent />
    </Suspense>
  );
}
