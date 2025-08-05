
import { NextResponse } from 'next/server';

const walletData = {
  balance: "₦5200.00",
  transactions: [
    {
      date: "12 Oct 2025",
      description: "Refund for missed appointment with Dr. Darren Elder",
      amount: "+ ₦200.00",
      type: "credit",
    },
    {
      date: "10 Oct 2025",
      description: "Wallet Top-up via Credit Card",
      amount: "+ ₦5000.00",
      type: "credit",
    },
    {
      date: "08 Oct 2025",
      description: "Payment for appointment with Dr. Susan Mandible",
      amount: "- ₦150.00",
      type: "debit",
    },
    {
      date: "05 Oct 2025",
      description: "Wallet Top-up via Bank Transfer",
      amount: "+ ₦150.00",
      type: "credit",
    },
  ],
};

export async function GET() {
  return NextResponse.json(walletData);
}
