# 🔌 Guía de Integración con Strapi CMS

Esta guía te ayudará a conectar el frontend de DentalCare Pro con Strapi CMS para gestionar contenido dinámicamente.

## 📋 Tabla de Contenidos

1. [Instalación de Strapi](#instalación-de-strapi)
2. [Configuración de Content Types](#configuración-de-content-types)
3. [Configuración de Permisos](#configuración-de-permisos)
4. [Integración con Next.js](#integración-con-nextjs)
5. [Migración de Datos Mock](#migración-de-datos-mock)

---

## 1. Instalación de Strapi

### Crear proyecto Strapi

```bash
# En una carpeta separada (fuera del proyecto Next.js)
npx create-strapi-app@latest backend --quickstart

# O con SQLite (recomendado para desarrollo)
npx create-strapi-app@latest backend --quickstart --no-run

cd backend
npm run develop
```

Esto abrirá `http://localhost:1337/admin` donde crearás tu cuenta de administrador.

---

## 2. Configuración de Content Types

### A. Content Type: Doctor

1. Ve a **Content-Type Builder** en el panel de Strapi
2. Click en "Create new collection type"
3. Nombre: `doctor`

**Campos:**

| Campo | Tipo | Configuraciones |
|-------|------|----------------|
| name | Text | Required, Short text |
| specialty | Text | Required |
| bio | Rich Text | Required |
| image | Media | Single media, Images only |
| credentials | JSON | - |
| experience | Text | - |
| languages | JSON | - |
| schedule | JSON | - |
| email | Email | Unique |
| phone | Text | - |

**Ejemplo de JSON para credentials:**
```json
[
  "Licenciatura en Odontología - UNAM",
  "Especialidad en Estética Dental",
  "Certificación en Invisalign"
]
```

**Ejemplo de JSON para schedule:**
```json
{
  "Lunes": "9:00 AM - 6:00 PM",
  "Martes": "9:00 AM - 6:00 PM",
  "Miércoles": "9:00 AM - 6:00 PM"
}
```

### B. Content Type: Service

1. Crear collection type "service"

**Campos:**

| Campo | Tipo | Configuraciones |
|-------|------|----------------|
| title | Text | Required |
| slug | UID | Target field: title |
| description | Text | Required, Long text |
| icon | Text | Default: "Sparkles" |
| image | Media | Single media |
| benefits | JSON | - |
| duration | Text | e.g., "45-60 minutos" |
| price | Text | e.g., "Desde $800 MXN" |

**Ejemplo de JSON para benefits:**
```json
[
  "Prevención de caries",
  "Eliminación de manchas",
  "Aliento más fresco"
]
```

### C. Content Type: Blog Post

1. Crear collection type "blog-post"

**Campos:**

| Campo | Tipo | Configuraciones |
|-------|------|----------------|
| title | Text | Required |
| slug | UID | Target field: title |
| excerpt | Text | Required, Long text |
| content | Rich Text | Required |
| image | Media | Single media |
| author | Relation | Doctor (many-to-one) |
| date | Date | Required |
| category | Text | - |
| readTime | Text | e.g., "5 min" |
| published | Boolean | Default: false |

### D. Content Type: Testimonial

1. Crear collection type "testimonial"

**Campos:**

| Campo | Tipo | Configuraciones |
|-------|------|----------------|
| name | Text | Required |
| image | Media | Single media |
| rating | Number | Integer, min: 1, max: 5 |
| comment | Text | Required, Long text |
| treatment | Text | - |
| verified | Boolean | Default: true |

### E. Content Type: Appointment

1. Crear collection type "appointment"

**Campos:**

| Campo | Tipo | Configuraciones |
|-------|------|----------------|
| name | Text | Required |
| email | Email | Required |
| phone | Text | Required |
| doctor | Relation | Doctor (many-to-one), optional |
| service | Text | Required |
| date | Date | Required |
| time | Text | Required |
| message | Text | Long text |
| status | Enumeration | pending, confirmed, completed, cancelled |

---

## 3. Configuración de Permisos

### Permitir acceso público a ciertos datos:

1. Ve a **Settings → Roles → Public**
2. Habilita permisos para:

**Doctor:**
- find
- findOne

**Service:**
- find
- findOne

**Blog Post:**
- find
- findOne

**Testimonial:**
- find

**Appointment:**
- create (para que usuarios puedan agendar citas)

---

## 4. Integración con Next.js

### A. Instalar dependencias adicionales

```bash
cd ../dentalcare-pro
npm install qs
```

### B. Crear archivo de utilidades para Strapi

Crear `app/lib/strapi.ts`:

```typescript
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
      ...options.headers,
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

// Crear cita
export async function createAppointment(appointmentData: any) {
  const data = await fetchAPI('appointments', {
    method: 'POST',
    body: JSON.stringify({ data: appointmentData }),
    cache: 'no-store',
  });
  return data.data;
}

// Transformar datos de Strapi al formato esperado
export function transformDoctor(strapiDoctor: any) {
  const { id, attributes } = strapiDoctor;
  return {
    id,
    name: attributes.name,
    specialty: attributes.specialty,
    bio: attributes.bio,
    image: attributes.image?.data?.attributes?.url 
      ? `${STRAPI_URL}${attributes.image.data.attributes.url}`
      : '/placeholder-doctor.jpg',
    credentials: attributes.credentials || [],
    experience: attributes.experience,
    languages: attributes.languages || [],
    schedule: attributes.schedule || {},
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
```

### C. Actualizar variables de entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_desde_strapi
```

**Obtener API Token:**
1. En Strapi admin: Settings → API Tokens
2. Create new API Token
3. Name: "Frontend Token"
4. Token type: Read-only
5. Copy el token y pégalo en `.env.local`

---

## 5. Migración de Datos Mock

### A. Actualizar componentes para usar Strapi

**Ejemplo: DoctorsSection.tsx**

```typescript
// Antes
import { doctors } from '../lib/data';

export default function DoctorsSection() {
  // ...
}

// Después
import { getDoctors, transformDoctor } from '../lib/strapi';

export default async function DoctorsSection() {
  const strapiDoctors = await getDoctors();
  const doctors = strapiDoctors.map(transformDoctor);
  
  return (
    // ... mismo JSX
  );
}
```

### B. Actualizar AppointmentForm

```typescript
'use client';

import { createAppointment } from '../lib/strapi';

const onSubmit = async (data: AppointmentFormData) => {
  try {
    await createAppointment({
      name: data.name,
      email: data.email,
      phone: data.phone,
      doctor: data.doctor ? parseInt(data.doctor) : null,
      service: data.service,
      date: data.date,
      time: data.time,
      message: data.message,
      status: 'pending',
    });
    
    setIsSubmitted(true);
    reset();
  } catch (error) {
    console.error('Error creating appointment:', error);
    // Mostrar mensaje de error al usuario
  }
};
```

---

## 6. Poblar Strapi con Datos Iniciales

### Opción 1: Manualmente desde el Admin Panel

1. Ve a Content Manager en Strapi
2. Agrega doctores, servicios, posts uno por uno

### Opción 2: Usar script de seeding

Crear `backend/src/seed.js`:

```javascript
// Script para poblar datos iniciales
module.exports = async () => {
  const doctors = [
    {
      name: "Dra. María González",
      specialty: "Odontología General y Estética",
      bio: "Con más de 15 años de experiencia...",
      // ... resto de datos
    },
    // ... más doctores
  ];

  for (const doctor of doctors) {
    await strapi.entityService.create('api::doctor.doctor', {
      data: doctor,
    });
  }

  console.log('✅ Datos iniciales cargados');
};
```

Ejecutar: `npm run strapi seed`

---

## 7. Testing de la Integración

### Verificar que todo funciona:

```bash
# Terminal 1: Strapi backend
cd backend
npm run develop

# Terminal 2: Next.js frontend
cd dentalcare-pro
npm run dev
```

Visita:
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

---

## 🚀 Despliegue en Producción

### Strapi Backend

**Opciones recomendadas:**
1. **Railway** (Fácil y gratis para empezar)
2. **Heroku** (Con PostgreSQL)
3. **DigitalOcean** (VPS)

**Variables de entorno en producción:**
```env
DATABASE_URL=postgresql://...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
APP_KEYS=...
```

### Next.js Frontend

**En Vercel:**
1. Agregar variables de entorno:
   - `NEXT_PUBLIC_STRAPI_URL=https://tu-strapi.railway.app`
   - `NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_produccion`

---

## 📝 Notas Importantes

1. **Imágenes**: Las URLs de Strapi serán absolutas en producción
2. **CORS**: Configura CORS en Strapi para permitir tu dominio frontend
3. **Rate Limiting**: Considera agregar rate limiting para la API
4. **Caché**: Next.js cachea automáticamente con ISR (Incremental Static Regeneration)

---

## ❓ Troubleshooting

### Error: Failed to fetch
- Verifica que Strapi esté corriendo
- Verifica las variables de entorno
- Revisa los permisos en Settings → Roles

### Imágenes no se ven
- Verifica la URL base de Strapi
- Asegúrate de incluir `populate=*` en las queries

### Token inválido
- Regenera el API token en Strapi
- Actualiza `.env.local`
- Reinicia el servidor de desarrollo

---

¿Necesitas ayuda? Revisa la [documentación oficial de Strapi](https://docs.strapi.io)
