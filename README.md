# 🦷 DentalCare Pro - Clínica Dental Profesional

Sitio web moderno y completo para clínica dental con múltiples odontólogos, construido con Next.js 15, TypeScript, Tailwind CSS 4, y Framer Motion.

![DentalCare Pro](https://images.unsplash.com/photo-1629909615957-be38d7689912?w=1200&h=400&fit=crop)

## ✨ Características

### 🎨 Diseño y UX
- ✅ Diseño moderno y profesional específico para clínicas dentales
- ✅ Paleta de colores médica (azules y verdes menta)
- ✅ Animaciones suaves con Framer Motion
- ✅ 100% Responsive - Mobile First
- ✅ Imágenes de alta calidad de Unsplash
- ✅ Tipografía elegante (Inter + Playfair Display)

### 🛠️ Funcionalidades
- ✅ Sistema de agendamiento de citas en línea
- ✅ Perfiles detallados de doctores con especialidades
- ✅ Catálogo de servicios dentales
- ✅ Blog de artículos informativos
- ✅ Sección de testimonios
- ✅ Formulario de contacto
- ✅ Integración con WhatsApp
- ✅ Listo para conectar con Strapi CMS

### 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 (Beta)
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form
- **Iconos**: Lucide React
- **Imágenes**: Next/Image con Unsplash
- **CMS**: Preparado para Strapi

## 📦 Instalación

### Prerrequisitos

- Node.js 18.17 o superior
- npm, yarn o pnpm

### Pasos

1. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

2. **Ejecutar en modo desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

3. **Abrir en el navegador**

Visita [http://localhost:3000](http://localhost:3000)

## 🎯 Estructura del Proyecto

```
dentalcare-pro/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navigation.tsx   # Menú principal
│   │   ├── Hero.tsx         # Sección hero
│   │   ├── ServicesSection.tsx
│   │   ├── DoctorsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── AppointmentForm.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── data.ts          # Datos mock (reemplazar con Strapi)
│   ├── agendar/
│   │   └── page.tsx         # Página de agendamiento
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   └── globals.css          # Estilos globales
├── public/                  # Archivos estáticos
├── tailwind.config.ts       # Configuración Tailwind
├── next.config.js           # Configuración Next.js
└── package.json             # Dependencias
```

## 🔌 Conexión con Strapi

### 1. Instalar Strapi

```bash
npx create-strapi-app@latest backend --quickstart
```

### 2. Crear Content Types en Strapi

Crea los siguientes tipos de contenido:

#### Doctor
```javascript
{
  name: 'text',
  specialty: 'text',
  bio: 'richtext',
  image: 'media',
  credentials: 'json',
  experience: 'text',
  languages: 'json',
  schedule: 'json'
}
```

#### Service
```javascript
{
  title: 'text',
  slug: 'uid',
  description: 'text',
  icon: 'text',
  image: 'media',
  benefits: 'json',
  duration: 'text',
  price: 'text'
}
```

#### BlogPost
```javascript
{
  title: 'text',
  slug: 'uid',
  excerpt: 'text',
  content: 'richtext',
  image: 'media',
  author: 'relation (Doctor)',
  date: 'date',
  category: 'text',
  readTime: 'text'
}
```

#### Appointment
```javascript
{
  name: 'text',
  email: 'email',
  phone: 'text',
  doctor: 'relation (Doctor)',
  service: 'text',
  date: 'date',
  time: 'text',
  message: 'text',
  status: 'enumeration' // pending, confirmed, completed, cancelled
}
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_aqui
```

### 4. Crear Servicio API

Crea `app/lib/strapi.ts`:

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 }, // ISR: revalidar cada 60 segundos
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export async function getDoctors() {
  const data = await fetchAPI('doctors?populate=*');
  return data.data;
}

export async function getServices() {
  const data = await fetchAPI('services?populate=*');
  return data.data;
}

export async function getBlogPosts() {
  const data = await fetchAPI('blog-posts?populate=*&sort=date:desc');
  return data.data;
}

export async function createAppointment(data: any) {
  const res = await fetch(`${STRAPI_URL}/api/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  return res.json();
}
```

### 5. Actualizar Componentes

Reemplaza los imports de datos mock:

```typescript
// Antes
import { doctors } from '../lib/data';

// Después
import { getDoctors } from '../lib/strapi';

// En el componente (si es Server Component)
const doctors = await getDoctors();

// O si es Client Component
const [doctors, setDoctors] = useState([]);

useEffect(() => {
  getDoctors().then(setDoctors);
}, []);
```

## 📝 Personalización

### Cambiar Colores

Edita `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Personaliza tus colores
  },
  dental: {
    blue: '#TU_COLOR',
    mint: '#TU_COLOR',
  }
}
```

### Modificar Información de Contacto

Busca y reemplaza en todos los archivos:
- Email: `contacto@dentalcarepro.com`
- Teléfono: `(81) 1234-5678`
- Dirección: Actualiza en `Footer.tsx`

### Agregar Google Analytics

1. Instala el paquete:
```bash
npm install @next/third-parties
```

2. Agrega en `layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube tu código a GitHub
2. Conecta tu repo en [vercel.com](https://vercel.com)
3. Vercel detectará Next.js automáticamente
4. Agrega variables de entorno si usas Strapi
5. ¡Deploy!

### Opción 2: CLI de Vercel

```bash
npm i -g vercel
vercel
```

## 📊 Características Pendientes (Roadmap)

- [ ] Sistema de pagos en línea
- [ ] Portal de pacientes con login
- [ ] Recordatorios de citas por email/SMS
- [ ] Historial médico digital
- [ ] Chat en vivo
- [ ] Sistema de reseñas verificadas
- [ ] Multi-idioma (inglés)
- [ ] PWA (Progressive Web App)

## 🎨 Personalización del Diseño

### Fotos Recomendadas de Unsplash

El sitio usa fotos de Unsplash. Busca:
- `dental clinic` - Para instalaciones
- `dentist` - Para doctores
- `dental smile` - Para testimonios
- `dental equipment` - Para tecnología

### Cambiar Fuentes

Edita en `app/layout.tsx`:

```typescript
import { TuFuente, TuFuenteDisplay } from 'next/font/google'

const tuFuente = TuFuente({ subsets: ['latin'], variable: '--font-sans' })
const tuDisplay = TuFuenteDisplay({ subsets: ['latin'], variable: '--font-display' })
```

## 🐛 Troubleshooting

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind no se aplica
```bash
npm run dev
# Limpia caché del navegador
```

### Imágenes no cargan
- Verifica la configuración en `next.config.js`
- Asegúrate de que el dominio esté en `remotePatterns`

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Email: contacto@dentalcarepro.com
- WhatsApp: +52 81 1234 5678

## 📄 Licencia

Este proyecto es un template comercial. Puedes usarlo libremente para proyectos de clientes.

---

**Desarrollado con ❤️ para clínicas dentales profesionales**

🦷 **DentalCare Pro** - Tu sonrisa es nuestra pasión
