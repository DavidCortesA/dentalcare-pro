import { NextResponse } from 'next/server';
import { getFAQs } from '@/app/lib/strapi';

export async function GET() {
  try {
    const faq =  await getFAQs();
    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error fetching faq: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}