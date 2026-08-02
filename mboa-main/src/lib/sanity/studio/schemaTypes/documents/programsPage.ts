import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

/** Singleton — surrounding copy/stats for the Programs page (individual
 *  programs live in the repeatable `program` document type). */
export default defineType({
  name: 'programsPage',
  title: 'Programs Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' }),
    defineField({ name: 'statsBar', title: 'Stats Bar', type: 'array', of: [{ type: 'statItem' }] }),
    defineField({ name: 'applyCtaHeadingLine1', title: 'Apply CTA Heading — Line 1', type: 'string' }),
    defineField({ name: 'applyCtaHeadingLine2', title: 'Apply CTA Heading — Line 2 (gold gradient)', type: 'string' }),
    defineField({ name: 'applyCtaParagraph', title: 'Apply CTA Paragraph', type: 'text', rows: 2 })
  ],
  preview: { prepare: () => ({ title: 'Programs Page' }) }
});
