// Mock data - Later this will come from Strapi

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  credentials: string[];
  experience: string;
  languages: string[];
  schedule: {
    [key: string]: string;
  };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  benefits: string[];
  duration: string;
  price: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
  treatment: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string; // markdown
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dra. María González",
    specialty: "Odontología General y Estética",
    bio: "Con más de 15 años de experiencia, la Dra. González se especializa en tratamientos estéticos y restaurativos, ayudando a sus pacientes a lograr sonrisas hermosas y saludables.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=800&fit=crop",
    credentials: [
      "Licenciatura en Odontología - UNAM",
      "Especialidad en Estética Dental - Universidad de Guadalajara",
      "Certificación en Invisalign",
      "Miembro de la Asociación Dental Mexicana"
    ],
    experience: "15 años",
    languages: ["Español", "Inglés"],
    schedule: {
      "Lunes": "9:00 AM - 6:00 PM",
      "Martes": "9:00 AM - 6:00 PM",
      "Miércoles": "9:00 AM - 6:00 PM",
      "Jueves": "9:00 AM - 6:00 PM",
      "Viernes": "9:00 AM - 3:00 PM"
    }
  },
  {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    specialty: "Ortodoncia y Ortopedia Maxilofacial",
    bio: "Especialista en corregir problemas de alineación dental y facial. El Dr. Rodríguez ha transformado miles de sonrisas utilizando las técnicas más avanzadas en ortodoncia.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=800&fit=crop",
    credentials: [
      "Licenciatura en Odontología - ITESM",
      "Especialidad en Ortodoncia - Universidad Autónoma de Nuevo León",
      "Certificación en Brackets de Zafiro",
      "Instructor de Invisalign"
    ],
    experience: "12 años",
    languages: ["Español", "Inglés", "Francés"],
    schedule: {
      "Lunes": "10:00 AM - 7:00 PM",
      "Martes": "10:00 AM - 7:00 PM",
      "Miércoles": "10:00 AM - 7:00 PM",
      "Jueves": "10:00 AM - 7:00 PM",
      "Sábado": "9:00 AM - 2:00 PM"
    }
  },
  {
    id: 3,
    name: "Dr. Luis Hernández",
    specialty: "Cirugía Oral e Implantología",
    bio: "Experto en procedimientos quirúrgicos complejos y colocación de implantes dentales. El Dr. Hernández combina precisión técnica con un enfoque humanitario en cada tratamiento.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=800&fit=crop",
    credentials: [
      "Licenciatura en Odontología - Universidad de Monterrey",
      "Especialidad en Cirugía Oral - UANL",
      "Certificación en Implantología Avanzada",
      "Diplomado en Sedación Consciente"
    ],
    experience: "18 años",
    languages: ["Español", "Inglés"],
    schedule: {
      "Martes": "8:00 AM - 4:00 PM",
      "Miércoles": "8:00 AM - 4:00 PM",
      "Jueves": "8:00 AM - 4:00 PM",
      "Viernes": "8:00 AM - 4:00 PM",
      "Sábado": "8:00 AM - 1:00 PM"
    }
  },
  {
    id: 4,
    name: "Dra. Ana Martínez",
    specialty: "Endodoncia y Periodoncia",
    bio: "Dedicada al tratamiento de conductos radiculares y enfermedades de las encías. La Dra. Martínez es reconocida por su meticulosidad y cuidado en procedimientos delicados.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=800&fit=crop",
    credentials: [
      "Licenciatura en Odontología - UNAM",
      "Especialidad en Endodoncia - Universidad La Salle",
      "Maestría en Periodoncia - UANL",
      "Certificación en Microscopía Dental"
    ],
    experience: "10 años",
    languages: ["Español", "Inglés"],
    schedule: {
      "Lunes": "9:00 AM - 5:00 PM",
      "Martes": "9:00 AM - 5:00 PM",
      "Jueves": "9:00 AM - 5:00 PM",
      "Viernes": "9:00 AM - 5:00 PM",
      "Sábado": "10:00 AM - 2:00 PM"
    }
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: "Limpieza Dental Profesional",
    slug: "limpieza-dental",
    description: "Limpieza profunda que elimina placa, sarro y manchas, dejando tus dientes brillantes y saludables.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop",
    benefits: [
      "Prevención de caries y enfermedades periodontales",
      "Eliminación de manchas y decoloración",
      "Aliento más fresco y duradero",
      "Detección temprana de problemas dentales"
    ],
    duration: "45-60 minutos",
    price: "Desde $800 MXN"
  },
  {
    id: 2,
    title: "Blanqueamiento Dental",
    slug: "blanqueamiento-dental",
    description: "Tratamiento profesional que aclara el tono de tus dientes hasta 8 tonos, con resultados inmediatos y duraderos.",
    icon: "Smile",
    image: "https://images.unsplash.com/photo-1655807946138-811bb2340d34?q=80&w=1571&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    benefits: [
      "Sonrisa hasta 8 tonos más blanca",
      "Resultados visibles desde la primera sesión",
      "Tratamiento seguro y sin dolor",
      "Mejora la confianza y autoestima"
    ],
    duration: "60-90 minutos",
    price: "Desde $3,500 MXN"
  },
  {
    id: 3,
    title: "Ortodoncia Invisible",
    slug: "ortodoncia-invisible",
    description: "Alinea tus dientes de forma discreta con tecnología Invisalign. Nadie notará que llevas ortodoncia.",
    icon: "Smile",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=800&fit=crop",
    benefits: [
      "100% removible para comer y cepillarse",
      "Prácticamente invisible",
      "Más cómodo que los brackets tradicionales",
      "Menos visitas al consultorio"
    ],
    duration: "12-18 meses",
    price: "Desde $45,000 MXN"
  },
  {
    id: 4,
    title: "Implantes Dentales",
    slug: "implantes-dentales",
    description: "Reemplaza dientes perdidos con implantes de titanio que lucen y funcionan como dientes naturales.",
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=800&fit=crop",
    benefits: [
      "Solución permanente y duradera",
      "Aspecto y función natural",
      "Previene pérdida ósea",
      "No afecta dientes adyacentes"
    ],
    duration: "3-6 meses (proceso completo)",
    price: "Desde $18,000 MXN por implante"
  },
  {
    id: 5,
    title: "Carillas Dentales",
    slug: "carillas-dentales",
    description: "Transforma tu sonrisa con carillas de porcelana que corrigen forma, color y tamaño de tus dientes.",
    icon: "Star",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=800&fit=crop",
    benefits: [
      "Sonrisa perfecta en pocas sesiones",
      "Resultados naturales y duraderos",
      "Corrige múltiples problemas estéticos",
      "Material resistente y de larga duración"
    ],
    duration: "2-3 sesiones",
    price: "Desde $8,000 MXN por carilla"
  },
  {
    id: 6,
    title: "Endodoncia (Tratamiento de Conducto)",
    slug: "endodoncia",
    description: "Salvamos dientes dañados o infectados mediante tratamiento de conducto con tecnología avanzada.",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&h=800&fit=crop",
    benefits: [
      "Salva el diente natural",
      "Elimina dolor e infección",
      "Procedimiento con anestesia local",
      "Alta tasa de éxito"
    ],
    duration: "60-90 minutos",
    price: "Desde $4,500 MXN"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Hábitos Diarios para una Sonrisa Perfecta",
    slug: "habitos-sonrisa-perfecta",
    excerpt: "Descubre los hábitos esenciales que los odontólogos recomiendan para mantener tus dientes sanos y tu sonrisa radiante.",
    content: `
# 5 Hábitos Diarios para una Sonrisa Perfecta

La clave para una sonrisa saludable no está solo en las visitas al dentista, sino en los hábitos que practicas cada día. Con pequeños cambios consistentes puedes reducir caries, inflamación de encías y sensibilidad.

![Cepillado dental en casa](https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&h=900&fit=crop)

## Antes de empezar: lo básico

- **Cepíllate 2 veces al día** (idealmente después de desayunar y antes de dormir).
- **Usa pasta con flúor**.
- **No olvides lengua y encías** (con suavidad).

> Consejo rápido: si sangran las encías al usar hilo dental, no lo dejes; normalmente mejora en 7–14 días con técnica correcta. Si persiste, consulta a tu dentista.

## 1. Cepillado Correcto
El cepillado debe durar al menos **2 minutos**, dos veces al día. Usa **movimientos circulares suaves** y recorre todas las superficies:

1. Cara externa
2. Cara interna
3. Superficies de masticación

## 2. Uso del Hilo Dental
El hilo dental elimina bacterias donde el cepillo no llega (especialmente entre dientes). Mantén el hilo en forma de “C” alrededor del diente y desliza suavemente.

## 3. Enjuague (cuando aplica)
No siempre es obligatorio, pero un enjuague recomendado por tu dentista puede ayudar en casos de **gingivitis**, **ortodoncia** o **alto riesgo de caries**.

## 4. Cuida lo que comes y bebes
Reduce la frecuencia de azúcares y bebidas ácidas. Si tomas café o refresco, acompáñalo con agua y evita “sorbos” durante todo el día.

## 5. Visitas preventivas
Una limpieza profesional cada **6 meses** (o según indicación) hace una diferencia enorme.

---

### Checklist rápido

- [ ] Cepillado 2 veces al día
- [ ] Hilo dental diario
- [ ] Menos snacks azucarados frecuentes
- [ ] Limpieza dental periódica
    `,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=800&fit=crop",
    author: "Dra. María González",
    date: "2024-01-15",
    category: "Cuidado Dental",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "¿Cuándo es el Momento Ideal para Ortodoncia?",
    slug: "momento-ideal-ortodoncia",
    excerpt: "La ortodoncia no es solo para niños. Conoce cuál es la edad ideal y por qué cada vez más adultos eligen este tratamiento.",
    content: `
# ¿Cuándo es el Momento Ideal para Ortodoncia?

Muchos piensan que la ortodoncia es exclusiva de la infancia, pero la realidad es que **cualquier edad puede ser buena** si hay salud periodontal y un plan adecuado.

![Ortodoncia y alineación dental](https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&h=900&fit=crop)

## Señales de que podrías necesitar ortodoncia

- Dientes apiñados o separados
- Mordida cruzada / abierta
- Dolor en mandíbula o chasquidos (en algunos casos)
- Desgaste dental irregular

## La edad ideal (en términos prácticos)

### Niños y adolescentes
Suele evaluarse alrededor de los **7 años** para detectar problemas de crecimiento. El tratamiento puede ser:

- **Fase 1** (interceptiva): guía de crecimiento
- **Fase 2**: alineación final con brackets o alineadores

### Adultos
Cada vez más adultos eligen ortodoncia por estética, salud y funcionalidad. Opciones comunes:

1. Brackets metálicos o estéticos
2. Alineadores transparentes
3. Ortodoncia lingual (casos específicos)

> Importante: si hay inflamación de encías o caries activas, se atienden primero antes de mover dientes.

## ¿Cuánto dura?
Depende de la complejidad. Promedio: **12–18 meses**, aunque hay casos más cortos o más largos.

---

### Recomendación
Una valoración inicial con radiografías y fotos es la mejor forma de definir si es el momento ideal para ti.
    `,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop",
    author: "Dr. Carlos Rodríguez",
    date: "2024-01-10",
    category: "Ortodoncia",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Implantes Dentales: Mitos y Realidades",
    slug: "implantes-dentales-mitos",
    excerpt: "Desmontamos los mitos más comunes sobre los implantes dentales y te contamos la verdad detrás de este tratamiento.",
    content: `
# Implantes Dentales: Mitos y Realidades

Los implantes dentales son una de las soluciones más efectivas para reemplazar dientes perdidos. Aun así, existen muchos mitos que generan miedo o confusión.

![Implante dental y cuidado profesional](https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=900&fit=crop)

## ¿Qué es un implante?
Es un “tornillo” de titanio (o material biocompatible) que se integra al hueso. Sobre él se coloca una corona que se ve y funciona como un diente.

## Mito 1: “Duele muchísimo”
**Realidad:** el procedimiento se realiza con anestesia local. La mayoría de pacientes reporta molestias controlables similares a una extracción.

## Mito 2: “No cualquiera puede ponerse implantes”
**Realidad:** muchas personas sí son candidatas. Se evalúa:

- Cantidad/calidad de hueso
- Salud de encías
- Control de enfermedades (por ejemplo, diabetes)
- Hábitos (como fumar)

## Mito 3: “Los implantes duran poco”
**Realidad:** con higiene y mantenimiento, pueden durar **muchos años**. La clave es el seguimiento y la limpieza profesional.

## Cuidados después del tratamiento

1. Higiene diaria (cepillado + hilo dental o irrigador)
2. Limpiezas periódicas
3. Evitar morder objetos duros (hielo, tapas, etc.)

---

### Conclusión
Un implante bien planificado es una inversión en salud y calidad de vida. Si tienes dudas, agenda una valoración para revisar tu caso.
    `,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=800&fit=crop",
    author: "Dr. Luis Hernández",
    date: "2024-01-05",
    category: "Implantología",
    readTime: "6 min"
  }
];

export const aboutPage = {
  title: 'Sobre Nosotros',
  subtitle: 'Odontología moderna con un trato humano.',
  heroImage:
    'https://images.unsplash.com/photo-1606811842243-af7e16970c1f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  content: `
# Sobre DentalCare Pro

En **DentalCare Pro** combinamos tecnología de vanguardia, especialistas certificados y un enfoque cálido y cercano. Nuestro objetivo es simple: que salgas con una sonrisa sana, estética y funcional.

## Nuestra misión
Brindar atención dental integral con **calidad**, **transparencia** y **excelencia clínica**.

## Nuestra visión
Ser la clínica de referencia en Monterrey por resultados, experiencia del paciente y tratamientos innovadores.

## Nuestros valores
- **Ética y honestidad** en diagnósticos y tratamientos
- **Calidad** en materiales y procesos
- **Empatía** y acompañamiento en cada paso
- **Actualización continua** del equipo médico

> Si tienes dudas sobre un tratamiento, te explicamos opciones, tiempos y costos antes de iniciar.
  `.trim(),
};

export const privacyPolicyMarkdown = `
# Aviso de Privacidad

Este Aviso de Privacidad describe cómo **DentalCare Pro** recopila, utiliza y protege tus datos personales.

## Datos que podemos recopilar
- Nombre, teléfono y correo electrónico
- Información de citas y seguimiento
- Datos clínicos necesarios para tu atención (cuando aplique)

## Finalidades
1. Agendar y confirmar citas
2. Brindar atención odontológica y seguimiento
3. Enviar recordatorios o información relacionada con el servicio

## Derechos ARCO
Puedes solicitar **Acceso, Rectificación, Cancelación u Oposición** al tratamiento de tus datos.

## Contacto
Si deseas ejercer tus derechos o tienes dudas, contáctanos en: **contacto@dentalcarepro.com**

> Nota: Este texto es un ejemplo. Para uso legal real, debe revisarlo un profesional.
`.trim();

export const termsAndConditionsMarkdown = `
# Términos y Condiciones

Al usar este sitio, aceptas los presentes Términos y Condiciones.

## Uso del sitio
- La información es de carácter informativo y no sustituye una valoración clínica.
- Nos reservamos el derecho de actualizar contenidos y precios sin previo aviso.

## Citas y cancelaciones
- Recomendamos llegar con 10 minutos de anticipación.
- Puedes reprogramar tu cita con al menos 24 horas de aviso (cuando sea posible).

## Responsabilidad
DentalCare Pro no se hace responsable por decisiones tomadas únicamente con base en contenido del sitio.

> Nota: Este texto es un ejemplo. Para uso legal real, debe revisarlo un profesional.
`.trim();

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: '¿Cada cuánto debo hacerme una limpieza dental?',
    answer:
      'En general, cada **6 meses**. Algunas personas pueden requerirla cada 3–4 meses según encías, ortodoncia o riesgo de caries.',
  },
  {
    id: 2,
    question: '¿El blanqueamiento daña los dientes?',
    answer:
      'Cuando está **bien indicado** y se realiza con productos profesionales, es seguro. Puede haber sensibilidad temporal que se controla con geles desensibilizantes.',
  },
  {
    id: 3,
    question: '¿Invisalign funciona igual que los brackets?',
    answer:
      'En muchos casos sí. La opción ideal depende de tu mordida, hábitos y objetivos. Lo mejor es una valoración para definir el plan.',
  },
  {
    id: 4,
    question: '¿Cuánto dura un implante dental?',
    answer:
      'Con higiene y mantenimiento, un implante puede durar **muchos años**. El éxito depende de hueso, encías, control de enfermedades y seguimiento profesional.',
  },
  {
    id: 5,
    question: '¿Atienden urgencias dentales?',
    answer:
      'Sí. Si tienes dolor intenso, inflamación o un diente fracturado, contáctanos para darte prioridad y orientarte.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María López",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rating: 5,
    comment: "Excelente atención y profesionalismo. La Dra. González fue muy paciente y explicó cada paso del tratamiento. Mi sonrisa quedó hermosa gracias a las carillas.",
    treatment: "Carillas Dentales"
  },
  {
    id: 2,
    name: "Roberto García",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 5,
    comment: "Después de años con brackets, decidí probar Invisalign con el Dr. Rodríguez. Increíble diferencia, cómodo y nadie nota que lo llevo puesto. 100% recomendado.",
    treatment: "Ortodoncia Invisible"
  },
  {
    id: 3,
    name: "Ana Ramírez",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    rating: 5,
    comment: "Tenía mucho miedo al implante dental, pero el Dr. Hernández hizo que todo fuera muy tranquilo. El resultado es perfecto, parece un diente natural.",
    treatment: "Implantes Dentales"
  },
  {
    id: 4,
    name: "Jorge Martínez",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 5,
    comment: "Clínica muy limpia y moderna. El blanqueamiento dental superó mis expectativas. Mi sonrisa luce increíble y el trato fue excelente en todo momento.",
    treatment: "Blanqueamiento Dental"
  }
];
