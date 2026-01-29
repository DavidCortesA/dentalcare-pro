'use client';

import useSWR, { mutate } from 'swr';

// Fetcher genérico para SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

// Configuración por defecto de SWR
const defaultConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minuto
};

// ============================================================================
// HOOKS PERSONALIZADOS
// ============================================================================

/**
 * Hook para obtener servicios
 * @example
 * const { services, isLoading, error } = useServices();
 */
export function useServices() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/services',
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 3600000, // Auto-refresh cada hora
    }
  );

  return {
    services: data,
    isLoading,
    error,
    mutate, // Para revalidar manualmente
  };
}
/**
 * Hook para obtener servicio
 * @example
 * const { service, isLoading, error } = useService();
 */
export function useService(slug:string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/services/${slug}` : null,
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 1800000,
    }
  );

  return {
    service: data,
    isLoading,
    error,
    mutate,
  }
};

/**
 * Hook para obtener doctores
 * @example
 * const { doctors, isLoading, error } = useDoctors();
 */
export function useDoctors() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/doctors',
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 3600000, // Auto-refresh cada hora
    }
  );

  return {
    doctors: data,
    isLoading,
    error,
    mutate,
  };
}
/**
 * Hook para obtener doctor
 * @example
 * const { doctor, isLoading, error } = useDoctor(id);
 */
export function useDoctor(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/doctors/${slug}` : null,
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 1800000,
    }
  );

  return {
    doctor: data,
    error,
    isLoading,
    mutate,
  }
}

/**
 * Hook para obtener posts del blog
 * @param limit - Número máximo de posts (opcional)
 * @example
 * const { posts, isLoading, error } = useBlogPosts(3);
 */
export function useBlogPosts(limit?: number) {
  const endpoint = limit ? `/api/blog?limit=${limit}` : '/api/blog';
  
  const { data, error, isLoading, mutate } = useSWR(
    endpoint,
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 1800000, // Auto-refresh cada 30 min
    }
  );

  return {
    posts: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook para obtener post del blog
 * @oaram slug - Slug del articulo
 * @example
 * const { post, isLoading, error } = useBlogPost(id)
 */
export function useBlogPost(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `/api/blog/${slug}` : null,
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 1800000,
    }
  );

  return {
    post: data,
    error,
    isLoading,
    mutate,
  }
}

/**
 * Hook para obtener testimonios
 * @example
 * const { testimonials, isLoading, error } = useTestimonials();
 */
export function useTestimonials() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/testimonials',
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 3600000, // Auto-refresh cada hora
    }
  );

  return {
    testimonials: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook para obtener FAQs
 * @example
 * const { faqs, isLoading, error } = useFAQs();
 */
export function useFAQs() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/faqs',
    fetcher,
    {
      ...defaultConfig,
      refreshInterval: 3600000, // Auto-refresh cada hora
    }
  );

  return {
    faqs: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook genérico para cualquier endpoint
 * @param endpoint - URL del endpoint (sin /api/)
 * @param options - Opciones de SWR
 * @example
 * const { data, isLoading, error } = useStrapi('services', { refreshInterval: 5000 });
 */
export function useStrapi<T = any>(endpoint: string, options = {}) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    `/api/${endpoint}`,
    fetcher,
    {
      ...defaultConfig,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
