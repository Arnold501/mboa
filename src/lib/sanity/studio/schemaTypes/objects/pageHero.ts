import { defineField, defineType } from 'sanity';

/**
 * Reusable hero content (eyebrow/title/subtitle/background image) — used
 * as a `hero` field on every top-level page's singleton content document
 * (newsroomPage, athletesPage, eventsPage, mediaPage, partnersPage,
 * programsPage, storePage, contactPage). One object type, one place to
 * change the shape of "what a page hero looks like" for the whole site.
 *
 * The About page and Home page are intentionally NOT built on this type —
 * About is fully static by design, and Home has its own richer hero shape
 * (two-line shimmer headline, dual CTAs) defined directly on homePage.ts.
 */
export default defineType({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'imageBlock',
      validation: (Rule) =>
        Rule.required().custom((val: any) =>
          !val?.image?.asset ? 'A hero image is required.' : !val?.alt ? 'Add alt text for the hero image.' : true
        )
    })
  ],
  preview: { select: { title: 'title', media: 'image.image' } }
});
