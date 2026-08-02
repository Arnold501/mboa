import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';

export default defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  icon: CalendarIcon,
  fields: [defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' })],
  preview: { prepare: () => ({ title: 'Events Page' }) }
});
