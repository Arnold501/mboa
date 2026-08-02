import { defineField, defineType } from 'sanity';
import { LaunchIcon } from '@sanity/icons/Launch';

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'text', title: 'Supporting Text', type: 'text', rows: 2 }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      description: 'Internal path (e.g. /programs) or full URL.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (gold fill)', value: 'primary' },
          { title: 'Outline', value: 'outline' }
        ]
      },
      initialValue: 'primary'
    })
  ],
  preview: { select: { title: 'heading', subtitle: 'buttonLabel' } }
});
