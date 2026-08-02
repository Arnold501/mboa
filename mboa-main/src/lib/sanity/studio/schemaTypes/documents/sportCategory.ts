import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons/Tag';

/**
 * Athlete discipline/category (MMA, Kickboxing, Rising Prospects, Coach...).
 * Kept as its own document type — separate from the Newsroom `category` —
 * so editors can add a new discipline without touching code, and the
 * Athletes filter bar is fully data-driven (identical pattern to the
 * Newsroom category filter).
 */
export default defineType({
  name: 'sportCategory',
  title: 'Sport Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first in the filter tabs.'
    })
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description' } }
});
