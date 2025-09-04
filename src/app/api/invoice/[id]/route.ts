
import { NextResponse } from 'next/server';

const invoices = {
    "#INV-0010": {
        id: "#INV-0010",
        date: "14 Nov 2023",
        patient: {
            name: "Tosin Adebayo",
            address: "2996 Westheimer Rd. Santa Ana, Illinois 85486",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "woman portrait",
        },
        doctor: {
            name: "Dr. Darren Elder",
            specialty: "Cardiology",
            clinic: "NovainHealth Medical Center",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "male doctor",
        },
        items: [
            { description: "General Consultation", quantity: 1, price: "₦100.00" },
            { description: "Medication", quantity: 2, price: "₦25.00" },
            { description: "Lab Test", quantity: 1, price: "₦50.00" },
        ],
        subtotal: "₦200.00",
        tax: "₦20.00",
        discount: "-₦10.00",
        total: "₦210.00",
        paymentMethod: "Visa ending in 1234",
    },
    "#INV-0009": {
        id: "#INV-0009",
        date: "13 Nov 2023",
        patient: {
            name: "Tosin Adebayo",
            address: "2996 Westheimer Rd. Santa Ana, Illinois 85486",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "woman portrait",
        },
        doctor: {
            name: "Dr. Linda Tobin",
            specialty: "Endocrinology",
            clinic: "NovainHealth Medical Center",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "female doctor smiling",
        },
        items: [
            { description: "Follow-up Consultation", quantity: 1, price: "₦200.00" },
        ],
        subtotal: "₦200.00",
        tax: "₦20.00",
        discount: "₦0.00",
        total: "₦220.00",
        paymentMethod: "Mastercard ending in 5678",
    },
     "#INV-0008": {
        id: "#INV-0008",
        date: "11 Nov 2023",
        patient: {
            name: "Tosin Adebayo",
            address: "2996 Westheimer Rd. Santa Ana, Illinois 85486",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "woman portrait",
        },
        doctor: {
            name: "Dr. Paul Richard",
            specialty: "Dermatology",
            clinic: "NovainHealth Medical Center",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "doctor smiling",
        },
        items: [
            { description: "Skin Check", quantity: 1, price: "₦250.00" },
        ],
        subtotal: "₦250.00",
        tax: "₦25.00",
        discount: "₦0.00",
        total: "₦275.00",
        paymentMethod: "Wallet",
    }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const invoiceId = params.id;
  const invoice = invoices[invoiceId as keyof typeof invoices];

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json(invoice);
}
