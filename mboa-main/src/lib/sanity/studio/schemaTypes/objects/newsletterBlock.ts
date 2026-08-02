import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export default defineType({
  name: 'newsletterBlock',
  title: 'Newsletter Signup',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Never Miss a Headline' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 })
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Newsletter Signup', subtitle: 'Embedded email capture form' })
  }
});
