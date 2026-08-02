import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';

export default defineType({
  name: 'newsroomPage',
  title: 'Newsroom Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' }),
    defineField({ name: 'intro', title: 'Intro Text (optional)', type: 'text', rows: 3 })
  ],
  preview: { prepare: () => ({ title: 'Newsroom Page' }) }
});
