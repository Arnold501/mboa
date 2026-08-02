import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

export default defineType({
  name: 'athlete',
  title: 'Athlete',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'stats', title: 'Stats & Record' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', group: 'profile', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: { source: 'name' },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'nickname', title: 'Nickname', type: 'string', group: 'profile' }),
    defineField({
      name: 'category',
      title: 'Sport Category',
      type: 'reference',
      to: [{ type: 'sportCategory' }],
      group: 'profile',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'division',
      title: 'Division / Role',
      type: 'string',
      group: 'profile',
      description: 'e.g. "Welterweight" or "Head Coach – MMA & S&C"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      group: 'profile',
      description: 'Shown on athlete cards and as the intro on the profile page.',
      validation: (Rule) => Rule.required().max(300)
    }),
    defineField({
      name: 'bioLong',
      title: 'Full Biography',
      type: 'blockContent',
      group: 'profile',
      description: 'Full story on the athlete profile page — supports the same rich formatting as Newsroom articles (images, stat highlights, callouts, etc).'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'profile',
      description: 'Shown as pills on the profile hero, e.g. "MMA", "Welterweight", "Rising Star".'
    }),

    defineField({ name: 'record', title: 'Record (e.g. 12-2-0)', type: 'string', group: 'stats' }),
    defineField({ name: 'height', title: 'Height', type: 'string', group: 'stats' }),
    defineField({ name: 'weight', title: 'Weight', type: 'string', group: 'stats' }),
    defineField({ name: 'age', title: 'Age', type: 'number', group: 'stats' }),
    defineField({
      name: 'fightHistory',
      title: 'Fight History',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'fight',
          fields: [
            { name: 'opponent', title: 'Opponent', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'result',
              title: 'Result',
              type: 'string',
              options: { list: ['W', 'L', 'D'], layout: 'radio' },
              validation: (Rule: any) => Rule.required()
            },
            { name: 'method', title: 'Method', type: 'string', description: 'e.g. TKO, Submission, Decision' },
            { name: 'round', title: 'Round', type: 'number' },
            { name: 'date', title: 'Date', type: 'date' },
            { name: 'event', title: 'Event', type: 'string' }
          ],
          preview: {
            select: { opponent: 'opponent', result: 'result', event: 'event' },
            prepare: ({ opponent, result, event }: any) => ({
              title: `${result ?? '?'} vs. ${opponent ?? 'Unknown'}`,
              subtitle: event
            })
          }
        }
      ]
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'stats'
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage & top of roster',
      type: 'boolean',
      initialValue: false,
      group: 'stats'
    }),

    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'imageBlock',
      group: 'media',
      description: 'Used on athlete cards and the roster grid.',
      validation: (Rule) =>
        Rule.required().custom((val: any) => {
          if (!val?.image?.asset) return 'A profile image is required.';
          if (!val?.alt) return 'Add alt text for the profile image.';
          return true;
        })
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Cover Image',
      type: 'imageBlock',
      group: 'media',
      description: 'Optional — used as the large banner on the athlete profile page. Falls back to the Profile Image if left blank.'
    }),
    defineField({
      name: 'cutoutImage',
      title: 'Cutout Image (PNG, transparent background)',
      type: 'image',
      group: 'media',
      description: 'Optional — a transparent-background PNG render of the athlete, displayed large in the profile hero for a dramatic, stands-out effect. Falls back to the Profile Image (styled with a frame) if left blank.'
    }),
    defineField({
      name: 'highlightVideo',
      title: 'Fight Highlight Video',
      type: 'videoEmbed',
      group: 'media',
      description: 'Optional — shown in a "Fight Highlights" section on both the Athletes listing page and this athlete\'s profile.'
    }),
    defineField({
      name: 'highlightCaption',
      title: 'Highlight Caption',
      type: 'string',
      group: 'media',
      description: 'e.g. "TKO Finish vs. Marcus Silva — MBOA FC 12"'
    }),

    defineField({ name: 'seo', title: 'SEO & Social Sharing', type: 'seo', group: 'seo' })
  ],
  orderings: [{ title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'division', media: 'image.image' }
  }
});
