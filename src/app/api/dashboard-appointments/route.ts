
import { NextResponse } from 'next/server';

const patientData = [
    {
        id: "#00016",
        name: "Tosin Adebayo",
        appointmentDate: "11th Dec 2024",
        appointmentTime: "10:00am",
        purpose: "General",
        type: "New Patient",
        paidAmount: "₦150",
    },
    {
        id: "#00028",
        name: "Musa Ahmed",
        appointmentDate: "14th Dec 2024",
        appointmentTime: "1:00pm",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "₦350",
    },
    {
        id: "#00118",
        name: "Peter Obi",
        appointmentDate: "16th Dec 2024",
        appointmentTime: "9:30am",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "₦50",
    },
    {
        id: "#00118",
        name: "Chima Okenwa",
        appointmentDate: "24th Nov 2024",
        appointmentTime: "6:00pm",
        purpose: "General",
        type: "New Patient",
        paidAmount: "₦250",
    },
    {
        id: "#00216",
        name: "Joshua Banks",
        appointmentDate: "3rd Dec 2024",
        appointmentTime: "3:00pm",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "₦85",
    },
    {
        id: "#00216",
        name: "Ify Nnachi",
        appointmentDate: "3rd Dec 2024",
        appointmentTime: "12:00pm",
        purpose: "General",
        type: "New Patient",
        paidAmount: "₦80",
    },
];

export async function GET() {
    return NextResponse.json(patientData);
}
