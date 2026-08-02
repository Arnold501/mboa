import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';

export default defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Categorization' },
    { name: 'seo', title: 'SEO & Sharing' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(120)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on cards, listing pages, and search results.',
      validation: (Rule) => Rule.required().max(220)
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', group: 'content' }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageBlock',
      group: 'media',
      description: 'Used on article cards, the Newsroom hero, and as the default social share image.',
      validation: (Rule) =>
        Rule.required().custom((val: any) => {
          if (!val?.image?.asset) return 'A cover image is required for every article.';
          if (!val?.alt) return 'Add alt text for the cover image.';
          return true;
        })
    }),
    defineField({
      name: 'coverVideo',
      title: 'Cover Video (optional)',
      type: 'videoEmbed',
      group: 'media',
      description: 'If set, consider referencing it in the body too — the cover video is not auto-embedded in the article hero.'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'meta'
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Articles (optional override)',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(3),
      description: 'Leave empty to auto-select the latest 3 articles from the same category.'
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage & Newsroom hero',
      type: 'boolean',
      initialValue: false,
      group: 'meta'
    }),
    defineField({
      name: 'pinnedOrder',
      title: 'Pinned order (lower = higher priority)',
      type: 'number',
      group: 'meta',
      hidden: ({ document }) => !document?.featured
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      description:
        'Set a future date/time to schedule this article — it stays completely hidden from the public site until then.',
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'seo', title: 'SEO & Social Sharing', type: 'seo', group: 'seo' })
  ],
  orderings: [
    { title: 'Publish date, new to old', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage.image',
      category: 'category.title',
      publishedAt: 'publishedAt',
      featured: 'featured'
    },
    prepare({ title, media, category, publishedAt, featured }) {
      const scheduled = publishedAt && new Date(publishedAt) > new Date();
      return {
        title,
        media,
        subtitle: [
          category,
          featured ? '★ Featured' : null,
          scheduled ? `Scheduled — ${new Date(publishedAt).toLocaleDateString()}` : null
        ]
          .filter(Boolean)
          .join(' · ')
      };
    }
  }
});
