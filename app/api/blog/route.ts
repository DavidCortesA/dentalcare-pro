import { NextResponse } from "next/server";
import { getBlogPost, getBlogPosts } from "@/app/lib/strapi";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const posts = await getBlogPosts(limit ? parseInt(limit) : undefined);
    return NextResponse.json(posts);
  } catch (error){
    console.error('Error fetching blog posts: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts'},
      { status: 500 }
    );
  }
}

export const revalidate = 1800;