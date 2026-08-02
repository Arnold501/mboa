import { defineField, defineType } from 'sanity';
import { ArrowRightIcon } from '@sanity/icons/ArrowRight';

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: ArrowRightIcon,
  fields: [
    defineField({ name: 'source', title: 'From path', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'destination',
      title: 'To path or URL',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'permanent', title: 'Permanent (301)', type: 'boolean', initialValue: true })
  ],
  preview: { select: { title: 'source', subtitle: 'destination' } }
});
