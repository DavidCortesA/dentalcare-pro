const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface FetchOptions {
  method?: string;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.body,
    },
  };

  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, mergedOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}

// Doctores
export async function getDoctors() {
  const data = await fetchAPI('doctors?populate=*', {
    next: { revalidate: 3600 }, // Revalidar cada hora
  });
  return data.data;
}

export async function getDoctor(id: number) {
  const data = await fetchAPI(`doctors/${id}?populate=*`);
  return data.data;
}

// Servicios
export async function getServices() {
  const data = await fetchAPI('services?populate=*', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

export async function getService(slug: string) {
  const data = await fetchAPI(`services?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0];
}

// Blog
export async function getBlogPosts(limit?: number) {
  let endpoint = 'blog-posts?populate=*&sort=date:desc';
  if (limit) {
    endpoint += `&pagination[limit]=${limit}`;
  }
  const data = await fetchAPI(endpoint, {
    next: { revalidate: 1800 }, // Revalidar cada 30 min
  });
  return data.data;
}

export async function getBlogPost(slug: string) {
  const data = await fetchAPI(`blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0];
}

// Testimonios
export async function getTestimonials() {
  const data = await fetchAPI('testimonials?populate=*', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

// FAQ
export async function getFAQ() {
  const data = await fetchAPI('faq?populate=*', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

// Crear cita
export async function createAppointment(appointmentData: any) {
  const data = await fetchAPI('appointments', {
    method: 'POST',
    body: JSON.stringify({ data: appointmentData }),
    cache: 'no-store',
  });
  return data.data;
}

export function transformDoctor(strapiDoctor: any) {
  return {
    id: strapiDoctor.id,
    name: strapiDoctor.name,
    specialty: strapiDoctor.specialty,
    bio: strapiDoctor.bio,
    image: strapiDoctor.image?.data?.attributes?.url 
      ? `${STRAPI_URL}${strapiDoctor.image.data.attributes.url}`
      : '/placeholder-doctor.jpg',
    credentials: strapiDoctor.credentials || [],
    experience: strapiDoctor.experience,
    languages: strapiDoctor.languages || [],
    schedule: strapiDoctor.schedule || {},
  };
}

export function transformService(strapiService: any) {
  const { id, attributes } = strapiService;
  return {
    id,
    title: attributes.title,
    slug: attributes.slug,
    description: attributes.description,
    icon: attributes.icon,
    image: attributes.image?.data?.attributes?.url
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : '/placeholder-service.jpg',
    benefits: attributes.benefits || [],
    duration: attributes.duration,
    price: attributes.price,
  };
}

export function transformBlogPost(strapiBlogPost: any) {
  const { id, attributes } = strapiBlogPost;
  return {
    id,
    title: attributes.title,
    slug: attributes.slug,
    excerpt: attributes.excerpt,
    content: attributes.content,
    image: attributes.image?.data?.attributes?.url
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : '/placeholder-blog.jpg',
    author: attributes.author?.data?.attributes?.name || 'DentalCare Pro',
    date: attributes.date,
    category: attributes.category,
    readTime: attributes.readTime,
  };
}

export function transformTestimonials(strapiTestimonials: any) {
  return {
    id: strapiTestimonials.id,
  }
}