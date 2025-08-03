
import { NextResponse } from 'next/server';

const stats = {
    totalPatients: 1500,
    todayPatients: 65,
    appointments: 85,
};

export async function GET() {
    return NextResponse.json(stats);
}
