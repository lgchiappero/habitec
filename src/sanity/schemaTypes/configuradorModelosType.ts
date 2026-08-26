import { defineArrayMember, defineField, defineType } from 'sanity'

function modeloImagenesFields(nombre: string) {
  return [
    defineField({
      name: 'imagenPrincipal',
      title: `Imagen principal — ${nombre}`,
      type: 'image',
      description: 'Foto que aparece de entrada en la card del configurador.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galeria',
      title: `Galería — ${nombre}`,
      type: 'array',
      description: 'Fotos adicionales, se muestran como thumbnails debajo de la imagen principal.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'label', title: 'Etiqueta', type: 'string' })],
        }),
      ],
    }),
  ]
}

export const configuradorModelosType = defineType({
  name: 'configuradorModelos',
  title: 'Imágenes del Configurador',
  type: 'document',
  groups: [
    { name: 'flex18', title: 'MOVARA Flex 18' },
    { name: 'flex38', title: 'MOVARA Flex 38' },
    { name: 'flex77', title: 'MOVARA Flex 77' },
  ],
  fields: [
    defineField({
      name: 'flex18',
      title: 'MOVARA Flex 18',
      type: 'object',
      group: 'flex18',
      fields: modeloImagenesFields('MOVARA Flex 18'),
    }),
    defineField({
      name: 'flex38',
      title: 'MOVARA Flex 38',
      type: 'object',
      group: 'flex38',
      fields: modeloImagenesFields('MOVARA Flex 38'),
    }),
    defineField({
      name: 'flex77',
      title: 'MOVARA Flex 77',
      type: 'object',
      group: 'flex77',
      fields: modeloImagenesFields('MOVARA Flex 77'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Imágenes del Configurador' }
    },
  },
})
