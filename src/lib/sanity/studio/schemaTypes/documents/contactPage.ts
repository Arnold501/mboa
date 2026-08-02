import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' })],
  preview: { prepare: () => ({ title: 'Contact Page' }) }
});
