
import { NextResponse } from 'next/server';

const walletData = {
    balance: "₦5,250.00",
    transactions: [
        {
            date: "2024-07-15",
            description: "Refund for cancelled appointment with Dr. Elder",
            amount: "+ ₦150.00",
            type: "credit",
        },
        {
            date: "2024-07-10",
            description: "Payment for consultation with Dr. Tobin",
            amount: "- ₦200.00",
            type: "debit",
        },
        {
            date: "2024-07-05",
            description: "Funds added to wallet",
            amount: "+ ₦5,000.00",
            type: "credit",
        },
         {
            date: "2024-07-01",
            description: "Payment for lab test booking",
            amount: "- ₦300.00",
            type: "debit",
        },
    ],
};

export async function GET() {
    // In a real app, you would fetch this from Firestore based on the logged-in user.
    return NextResponse.json(walletData);
}
