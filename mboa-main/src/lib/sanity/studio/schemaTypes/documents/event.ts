import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'card', title: 'Fight Card' },
    { name: 'results', title: 'Results & Media' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'details', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'details' }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'details',
      options: { source: 'title' }, validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'date', title: 'Date & Time', type: 'datetime', group: 'details',
      description: 'The event automatically shows as "Upcoming" or "Past" based on this — no separate status field to remember.',
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'venue', title: 'Venue', type: 'string', group: 'details', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'details', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'details' }),
    defineField({
      name: 'poster', title: 'Poster (portrait)', type: 'imageBlock', group: 'details',
      validation: (Rule) =>
        Rule.required().custom((val: any) =>
          !val?.image?.asset ? 'A poster image is required.' : !val?.alt ? 'Add alt text for the poster.' : true
        )
    }),
    defineField({ name: 'heroImage', title: 'Hero Image (landscape, optional)', type: 'imageBlock', group: 'details' }),
    defineField({ name: 'ticketUrl', title: 'Ticket URL', type: 'url', group: 'details' }),
    defineField({ name: 'featured', title: 'Feature on homepage', type: 'boolean', initialValue: false, group: 'details' }),

    defineField({
      name: 'fightCard', title: 'Fight Card', type: 'array', group: 'card',
      of: [
        {
          type: 'object',
          name: 'bout',
          fields: [
            { name: 'fighter1', title: 'Fighter 1', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'fighter2', title: 'Fighter 2', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'title', title: 'Bout Title', type: 'string', description: 'e.g. "MBOA Welterweight Title"' },
            {
              name: 'type', title: 'Card Position', type: 'string',
              options: { list: ['Main Event', 'Co-Main', 'Featured', 'Prelim'] }
            },
            { name: 'result', title: 'Result (fill in after the event)', type: 'string' }
          ],
          preview: {
            select: { f1: 'fighter1', f2: 'fighter2', type: 'type' },
            prepare: ({ f1, f2, type }: any) => ({ title: `${f1} vs. ${f2}`, subtitle: type })
          }
        }
      ]
    }),

    defineField({
      name: 'results', title: 'Results Summary', type: 'text', rows: 3, group: 'results',
      description: 'Filled in once the event has happened.'
    }),
    defineField({ name: 'highlights', title: 'Highlights Video', type: 'videoEmbed', group: 'results' }),

    defineField({ name: 'seo', title: 'SEO & Social Sharing', type: 'seo', group: 'seo' })
  ],
  orderings: [{ title: 'Date, soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'venue', media: 'poster.image', date: 'date' },
    prepare({ title, subtitle, media, date }) {
      const upcoming = date && new Date(date) > new Date();
      return { title, media, subtitle: [subtitle, upcoming ? 'Upcoming' : 'Past'].filter(Boolean).join(' · ') };
    }
  }
});
