import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

/** Singleton — content for the homepage sections that aren't pulled live
 *  from Athletes/Newsroom (hero, stats bar, about preview, pillars, final CTA). */
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About Preview' },
    { name: 'pillars', title: 'System & Wellness' },
    { name: 'cta', title: 'Final CTA' }
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'High-Performance Multi-Sport Organization' }),
    defineField({ name: 'heroHeadlineLine1', title: 'Headline — Line 1', type: 'string', group: 'hero', initialValue: 'MBOA' }),
    defineField({ name: 'heroHeadlineLine2', title: 'Headline — Line 2 (shimmer effect)', type: 'string', group: 'hero', initialValue: 'SPORTS' }),
    defineField({ name: 'heroTagline', title: 'Tagline', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroBackgroundImage', title: 'Background Image', type: 'imageBlock', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Primary Button Label', type: 'string', group: 'hero', initialValue: 'Explore Programs' }),
    defineField({ name: 'heroPrimaryCtaUrl', title: 'Primary Button Link', type: 'string', group: 'hero', initialValue: '/programs-hidden' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Secondary Button Label', type: 'string', group: 'hero', initialValue: 'Watch Highlights' }),
    defineField({ name: 'heroSecondaryCtaUrl', title: 'Secondary Button Link', type: 'string', group: 'hero', initialValue: '/media' }),
    defineField({ name: 'stats', title: 'Stats Bar', type: 'array', of: [{ type: 'statItem' }], group: 'hero' }),

    defineField({ name: 'aboutEyebrow', title: 'Eyebrow', type: 'string', group: 'about', initialValue: 'About MBOA Sports' }),
    defineField({ name: 'aboutHeadingLine1', title: 'Heading — Line 1', type: 'string', group: 'about' }),
    defineField({ name: 'aboutHeadingLine2', title: 'Heading — Line 2 (gold gradient)', type: 'string', group: 'about' }),
    defineField({ name: 'aboutHeadingLine3', title: 'Heading — Line 3', type: 'string', group: 'about' }),
    defineField({ name: 'aboutParagraph1', title: 'Paragraph 1', type: 'text', rows: 3, group: 'about' }),
    defineField({ name: 'aboutParagraph2', title: 'Paragraph 2', type: 'text', rows: 3, group: 'about' }),
    defineField({ name: 'aboutImage', title: 'Image', type: 'imageBlock', group: 'about' }),
    defineField({ name: 'aboutBadgeValue', title: 'Floating Badge Value', type: 'string', group: 'about', initialValue: '12+' }),
    defineField({ name: 'aboutBadgeLabel', title: 'Floating Badge Label', type: 'string', group: 'about', initialValue: 'Years Building Champions' }),

    defineField({
      name: 'systemPillars', title: 'System Pillars (3-column)', type: 'array', group: 'pillars',
      of: [{
        type: 'object', name: 'systemPillar',
        fields: [
          { name: 'number', title: 'Number', type: 'string' },
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'desc', title: 'Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'title', subtitle: 'number' } }
      }]
    }),
    defineField({
      name: 'wellnessPillars', title: 'Wellness Pillars', type: 'array', group: 'pillars',
      of: [{
        type: 'object', name: 'wellnessPillar',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'desc', title: 'Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'title' } }
      }]
    }),
    defineField({ name: 'wellnessEyebrow', title: 'Wellness Section Eyebrow', type: 'string', group: 'pillars', initialValue: 'Athlete Wellbeing' }),
    defineField({ name: 'wellnessHeading', title: 'Wellness Section Heading', type: 'string', group: 'pillars' }),
    defineField({ name: 'wellnessParagraph', title: 'Wellness Section Paragraph', type: 'text', rows: 3, group: 'pillars' }),

    defineField({ name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'The Movement Continues' }),
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaParagraph', title: 'Paragraph', type: 'text', rows: 2, group: 'cta' }),
    defineField({ name: 'ctaBackgroundImage', title: 'Background Image', type: 'imageBlock', group: 'cta' })
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) }
});
