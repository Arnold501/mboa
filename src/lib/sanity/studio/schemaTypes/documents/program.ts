import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description:
        'Controls which section this program appears in on the Community page. Active programs show under "Latest Programs"; Archived ones move to "Past Programs".',
      options: {
        list: [
          { title: 'Active — shown under Latest Programs', value: 'active' },
          { title: 'Archived — shown under Past Programs', value: 'archived' }
        ],
        layout: 'radio'
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required()
    }),
    defineField({
  name: 'date',
  title: 'Program Date',
  type: 'date',
  description:
    'Powers the Month filter on the Community page. Defaults to today when a new program is created — change it to reflect when the program actually runs/ran.',
  options: { dateFormat: 'YYYY-MM-DD' },
  initialValue: () => new Date().toISOString().split('T')[0],
  validation: (Rule) => Rule.required()
}),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', description: 'e.g. 🏆', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'details', title: 'Full Details', type: 'blockContent' }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'image', title: 'Image', type: 'imageBlock',
      validation: (Rule) =>
        Rule.required().custom((val: any) =>
          !val?.image?.asset ? 'An image is required.' : !val?.alt ? 'Add alt text.' : true
        )
    }),
    defineField({ name: 'cta', title: 'Button Label', type: 'string', initialValue: 'Apply Now' }),
    defineField({ name: 'ctaUrl', title: 'Button Link', type: 'string', initialValue: '/contact' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' })
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image.image', status: 'status' },
    prepare: ({ title, subtitle, media, status }) => ({
      title,
      media,
      subtitle: status === 'archived' ? `Archived · ${subtitle ?? ''}` : subtitle
    })
  }
});