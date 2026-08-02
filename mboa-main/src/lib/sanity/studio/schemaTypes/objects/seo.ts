import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(70),
      description: 'Falls back to the article title if left blank.'
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'Falls back to the excerpt if left blank.'
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Falls back to the cover image if left blank.'
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false
    })
  ]
});
