import { defineField, defineType } from 'sanity';
import { NumberIcon } from '@sanity/icons/Number';

export default defineType({
  name: 'statHighlight',
  title: 'Stat Highlight',
  type: 'object',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. "94%" or "12-2-0"',
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'color', title: 'Accent Color', type: 'brandColor' })
  ],
  preview: { select: { title: 'value', subtitle: 'label' } }
});
