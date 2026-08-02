import { defineField, defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';

/** Singleton — content for the About page. */
export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'intro', title: 'Vision & Mission', default: true },
    { name: 'story', title: 'Story & Quote' },
    { name: 'philosophy', title: 'Philosophy & Pathway' }
  ],
  fields: [
    defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero', group: 'intro' }),

    defineField({ name: 'visionHeadingLine1', title: 'Vision Heading — Line 1', type: 'string', group: 'intro' }),
    defineField({ name: 'visionHeadingLine2', title: 'Vision Heading — Line 2 (gold gradient)', type: 'string', group: 'intro' }),
    defineField({ name: 'visionParagraph1', title: 'Vision Paragraph 1', type: 'text', rows: 3, group: 'intro' }),
    defineField({ name: 'visionParagraph2', title: 'Vision Paragraph 2', type: 'text', rows: 3, group: 'intro' }),

    defineField({ name: 'missionHeadingLine1', title: 'Mission Heading — Line 1', type: 'string', group: 'intro' }),
    defineField({ name: 'missionHeadingLine2', title: 'Mission Heading — Line 2 (gold gradient)', type: 'string', group: 'intro' }),
    defineField({ name: 'missionParagraph1', title: 'Mission Paragraph 1', type: 'text', rows: 3, group: 'intro' }),
    defineField({ name: 'missionParagraph2', title: 'Mission Paragraph 2', type: 'text', rows: 3, group: 'intro' }),

    defineField({ name: 'storyHeadingLine1', title: 'Story Heading — Line 1', type: 'string', group: 'story' }),
    defineField({ name: 'storyHeadingLine2', title: 'Story Heading — Line 2 (gold gradient)', type: 'string', group: 'story' }),
    defineField({ name: 'storyContent', title: 'Story Content', type: 'blockContent', group: 'story' }),

    defineField({ name: 'quoteText', title: 'Full-bleed Quote', type: 'text', rows: 3, group: 'story' }),
    defineField({ name: 'quoteAttribution', title: 'Quote Attribution', type: 'string', group: 'story', initialValue: '— MBOA Sports Founder' }),
    defineField({ name: 'quoteBackgroundImage', title: 'Quote Background Image', type: 'imageBlock', group: 'story' }),

    defineField({
      name: 'philosophy', title: 'Philosophy Pillars', type: 'array', group: 'philosophy',
      of: [{
        type: 'object', name: 'philosophyItem',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'desc', title: 'Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'title' } }
      }]
    }),
    defineField({
      name: 'pathway', title: 'Africa → Global Pathway Steps', type: 'array', group: 'philosophy',
      of: [{
        type: 'object', name: 'pathwayStep',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'desc', title: 'Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'label' } }
      }]
    }),

    defineField({ name: 'ctaHeading', title: 'Closing CTA Heading', type: 'string', group: 'philosophy' }),
    defineField({ name: 'ctaParagraph', title: 'Closing CTA Paragraph', type: 'text', rows: 2, group: 'philosophy' })
  ],
  preview: { prepare: () => ({ title: 'About Page' }) }
});
