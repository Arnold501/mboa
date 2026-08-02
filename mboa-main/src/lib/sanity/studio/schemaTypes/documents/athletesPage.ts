import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

export default defineType({
  name: 'athletesPage',
  title: 'Athletes Page',
  type: 'document',
  icon: UserIcon,
  fields: [defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' })],
  preview: { prepare: () => ({ title: 'Athletes Page' }) }
});
