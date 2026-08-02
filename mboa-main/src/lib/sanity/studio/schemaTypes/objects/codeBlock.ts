import { defineField, defineType } from 'sanity';
import { CodeIcon } from '@sanity/icons/Code';

export default defineType({
  name: 'codeBlock',
  title: 'Code Snippet',
  type: 'object',
  icon: CodeIcon,
  fields: [
    defineField({ name: 'language', title: 'Language (label only)', type: 'string', initialValue: 'text' }),
    defineField({ name: 'filename', title: 'Filename (optional)', type: 'string' }),
    defineField({ name: 'code', title: 'Code', type: 'text', rows: 10, validation: (Rule) => Rule.required() })
  ],
  preview: {
    select: { title: 'filename', subtitle: 'language' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Code Snippet', subtitle })
  }
});
