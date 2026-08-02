import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons/Play';

export default defineType({
  name: 'mediaPage',
  title: 'Media Page',
  type: 'document',
  icon: PlayIcon,
  fields: [defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' })],
  preview: { prepare: () => ({ title: 'Media Page' }) }
});
