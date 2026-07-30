import { defineArrayMember, defineField, defineType } from 'sanity'

export const flexPageType = defineType({
  name: 'flexPage',
  title: 'Página MOVARA Flex',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'galeria', title: 'Galería' },
    { name: 'precio', title: 'Precio' },
    { name: 'specs', title: 'Specs técnicas' },
    { name: 'extras', title: 'Extras' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'title',
          title: 'Nombre',
          type: 'string',
          initialValue: 'MOVARA Flex',
        }),
        defineField({
          name: 'ctaPrimario',
          title: 'Texto botón',
          type: 'string',
          initialValue: 'Quiero este modelo',
        }),
      ],
    }),

    // ── Galería ─────────────────────────────────────────────
    defineField({
      name: 'galeria',
      title: 'Fotos de la galería',
      type: 'array',
      group: 'galeria',
      description: 'Si está vacía, se usa /banner-hero.webp como placeholder repetido.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'label', title: 'Etiqueta', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'galeriaVideos',
      title: 'Videos de la galería',
      type: 'array',
      group: 'galeria',
      description: 'Opcional. Se agregan al final de la fila de thumbnails con ícono de play.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'url', title: 'URL del video', type: 'url', validation: (Rule) => Rule.required() }),
            defineField({ name: 'titulo', title: 'Título', type: 'string', initialValue: 'Video' }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'url' } },
        }),
      ],
    }),

    // ── Descripción ───────────────────────────────────────
    defineField({
      name: 'descripcion',
      title: 'Descripción corta (2-3 líneas)',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'El MOVARA Flex es una unidad plegable y expandible que se transporta cerrada y se despliega en destino. Vivienda, inversión turística u oficina rural, lista en días y no en meses de obra.',
    }),

    // ── Precio ─────────────────────────────────────────────
    // Precio único por m², aplica a las tres variantes. El cliente
    // multiplica por los m² que quiere para estimar su inversión.
    defineField({
      name: 'precioPorM2',
      title: 'Precio por m² (USD)',
      type: 'number',
      group: 'precio',
      initialValue: 594,
    }),
    defineField({
      name: 'precioNota',
      title: 'Nota aclaratoria bajo el precio',
      type: 'string',
      group: 'precio',
      initialValue:
        'El precio final depende de la configuración, los extras y la zona de instalación. Consultanos para tu presupuesto.',
    }),

    // ── Specs técnicas clave ───────────────────────────────
    defineField({
      name: 'specsClave',
      title: 'Specs técnicas clave (6-8 puntos, siempre visibles)',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(6).max(8),
      initialValue: [
        'Estructura de acero galvanizado — no se oxida ni corroe',
        'Paredes de lana de roca 75mm — incombustible, alta aislación térmica',
        'Techo panel sándwich de poliuretano — sin goteras, aislación superior',
        'Piso impermeable — resistente a la humedad y a termitas',
        'Ventanas DVH con rotura de puente térmico — sin condensación',
        'Instalación eléctrica lista para la red argentina',
        'Baño y cocina completos, instalados y listos para usar',
        'Calefón eléctrico incluido de fábrica',
      ],
    }),

    // ── Extras disponibles ─────────────────────────────────
    defineField({
      name: 'extrasDisponibles',
      title: 'Extras disponibles (lista simple, sin precio)',
      type: 'array',
      group: 'extras',
      of: [{ type: 'string' }],
      initialValue: [
        'Color exterior',
        'Distribución de ambientes',
        'Tipo de piso',
        'Balcón o galería exterior',
        'Sobretecho',
        'Material labrado exterior',
        'Nivel de aislación según zona climática',
        'Kit solar',
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página MOVARA Flex' }
    },
  },
})
