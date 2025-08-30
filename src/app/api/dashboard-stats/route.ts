
import { NextResponse } from 'next/server';

const statsData = {
    totalPatients: 88,
    todayPatients: 12,
    appointments: 5,
};

export async function GET() {
    return NextResponse.json(statsData);
}
