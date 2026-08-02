import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';

export default defineType({
  name: 'storePage',
  title: 'Store Page',
  type: 'document',
  icon: PackageIcon,
  fields: [defineField({ name: 'hero', title: 'Page Hero', type: 'pageHero' })],
  preview: { prepare: () => ({ title: 'Store Page' }) }
});
