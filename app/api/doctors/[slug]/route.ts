import { NextResponse } from 'next/server';
import { getDoctor } from '@/app/lib/strapi';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'slug is required' },
        { status: 400 }
      );
    }

    const doctor = await getDoctor(slug);

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    );
  }
}

// Cache de Next.js
export const revalidate = 3600; // 1 hora