import { defineField, defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';

export default defineType({
  name: 'calloutBlock',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Tip', value: 'tip' },
          { title: 'Warning', value: 'warning' },
          { title: 'Quote', value: 'quote' }
        ]
      },
      initialValue: 'info'
    }),
    defineField({ name: 'accentColor', title: 'Accent Color', type: 'brandColor' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] }
        }
      ]
    })
  ],
  preview: { select: { title: 'title', subtitle: 'style' } }
});
