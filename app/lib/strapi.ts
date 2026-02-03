const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface FetchOptions {
  method?: string;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Función base para hacer fetch a Strapi
 */
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
    },
  };

  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  try {
    const res = await fetch(url, mergedOptions);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Strapi API error (${res.status}):`, errorText);
      throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ============================================================================
// SERVICIOS / SERVICES
// ============================================================================

export async function getServices() {
  const data = await fetchAPI('services?populate=*', {
    next: { revalidate: 3600 }, // Cache 1 hora
  });
  return data.data;
}

export async function getService(slug: string) {
  const data = await fetchAPI(`services?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 3600 },
  });
  return data.data[0];
}

// ============================================================================
// DOCTORES / DOCTORS
// ============================================================================

export async function getDoctors() {
  const data = await fetchAPI('doctors?populate=*', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

export async function getDoctor(slug: string) {
  const data = await fetchAPI(`doctors?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 3600 },
  });
  
  if (!data?.data || data.data.length === 0) {
    return null;
  }
  
  return data.data[0];
}

// ============================================================================
// BLOG POSTS
// ============================================================================

export async function getBlogPosts(limit?: number) {
  let endpoint = 'blog-posts?populate=*&sort=date:desc';
  if (limit) {
    endpoint += `&pagination[limit]=${limit}`;
  }
  const data = await fetchAPI(endpoint, {
    next: { revalidate: 1800 }, // Cache 30 min (blog cambia más frecuente)
  });
  return data.data;
}

export async function getBlogPost(slug: string) {
  const data = await fetchAPI(`blog-posts?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 1800 },
  });
  return data.data[0];
}

// ============================================================================
// TESTIMONIOS / TESTIMONIALS
// ============================================================================

export async function getTestimonials() {
  const data = await fetchAPI('testimonials?populate=*&filters[verified][$eq]=true', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

// ============================================================================
// FAQS
// ============================================================================

export async function getFAQs() {
  const data = await fetchAPI('faqs?sort=order:asc', {
    next: { revalidate: 3600 },
  });
  return data.data;
}

export async function getFAQsByCategory(category: string) {
  const data = await fetchAPI(
    `faqs?filters[category][$eq]=${category}&sort=order:asc`,
    {
      next: { revalidate: 3600 },
    }
  );
  return data.data;
}

// ============================================================================
// CITAS / APPOINTMENTS
// ============================================================================

export async function createAppointment(appointmentData: any) {
  const data = await fetchAPI('appointments', {
    method: 'POST',
    body: JSON.stringify({ data: appointmentData }),
    cache: 'no-store',
  });
  return data.data;
}

// ============================================================================
// TRANSFORMADORES (Para convertir formato Strapi a formato app)
// ============================================================================

/**
 * Transforma un doctor de Strapi al formato de la app
 */
export function transformDoctor(strapiDoctor: any) {
  if (!strapiDoctor) return null;
  
  const { id, attributes } = strapiDoctor;
  return {
    id,
    name: attributes.name,
    specialty: attributes.specialty,
    bio: attributes.bio,
    image: attributes.image?.data?.attributes?.url 
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=800&fit=crop',
    credentials: attributes.credentials || [],
    experience: attributes.experience,
    languages: attributes.languages || [],
    schedule: attributes.schedule || {},
  };
}

/**
 * Transforma un servicio de Strapi al formato de la app
 */
export function transformService(strapiService: any) {
  if (!strapiService) return null;
  
  const { id, attributes } = strapiService;
  return {
    id,
    title: attributes.title,
    slug: attributes.slug,
    description: attributes.description,
    icon: attributes.icon || 'Sparkles',
    image: attributes.image?.data?.attributes?.url
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop',
    benefits: attributes.benefits || [],
    duration: attributes.duration,
    price: attributes.price,
  };
}

/**
 * Transforma un blog post de Strapi al formato de la app
 */
export function transformBlogPost(strapiBlogPost: any) {
  if (!strapiBlogPost) return null;
  
  const { id, attributes } = strapiBlogPost;
  return {
    id,
    title: attributes.title,
    slug: attributes.slug,
    excerpt: attributes.excerpt,
    content: attributes.content,
    image: attributes.image?.data?.attributes?.url
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=800&fit=crop',
    author: attributes.author?.data?.attributes?.name || 'DentalCare Pro',
    date: attributes.date,
    category: attributes.category,
    readTime: attributes.readTime,
  };
}

/**
 * Transforma un testimonio de Strapi al formato de la app
 */
export function transformTestimonial(strapiTestimonial: any) {
  if (!strapiTestimonial) return null;
  
  const { id, attributes } = strapiTestimonial;
  return {
    id,
    name: attributes.name,
    image: attributes.image?.data?.attributes?.url
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: attributes.rating,
    comment: attributes.comment,
    treatment: attributes.treatment,
  };
}

/**
 * Transforma un FAQ de Strapi al formato de la app
 */
export function transformFAQ(strapiFAQ: any) {
  if (!strapiFAQ) return null;
  
  const { id, attributes } = strapiFAQ;
  return {
    id,
    question: attributes.question,
    answer: attributes.answer,
    category: attributes.category,
    order: attributes.order,
  };
}

// ============================================================================
// EXPORTAR fetchAPI para uso personalizado
// ============================================================================

export { fetchAPI };
