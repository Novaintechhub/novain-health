
import Checkout from "@/components/patient/checkout";
import { Suspense } from 'react';

function CheckoutPageContent() {
    return <Checkout />;
}

export default function CheckoutPage() {
  return (
    <Suspense>
        <CheckoutPageContent />
    </Suspense>
  );
}
