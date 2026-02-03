import { NextResponse } from 'next/server';
import { getDoctors } from '@/app/lib/strapi';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doctors = await getDoctors();
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export const revalidate = 3600;
