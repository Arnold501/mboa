import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons/Users';

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'tier', title: 'Tier', type: 'string',
      options: { list: ['Title Partner', 'Media Partner', 'Official Sponsor', 'Venue Partner', 'Medical Partner'] },
    }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, description: 'Optional — falls back to a styled text treatment if left blank.' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' })
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } }
});
