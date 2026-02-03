import { NextResponse } from 'next/server';
import { getFAQs } from '@/app/lib/strapi';

export const dynamic = 'force-dynamic';
export const revalidate = 1800;

export async function GET() {
  try {
    const faq = await getFAQs();
    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error fetching faq: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
