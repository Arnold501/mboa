import { defineField, defineType } from 'sanity';
import { RemoveIcon } from '@sanity/icons/Remove'

export default defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Ornament (✦)', value: 'ornament' }
        ]
      },
      initialValue: 'line'
    })
  ],
  preview: { prepare: () => ({ title: 'Divider' }) }
});
