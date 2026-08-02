import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons/Play';

export default defineType({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Uploaded File', value: 'file' }
        ],
        layout: 'radio'
      },
      description: 'Choose a source only if you want to attach a video. Leave blank to omit video entirely.'
      // No initialValue and no Rule.required() here on purpose: this type
      // is reused as an OPTIONAL field (post.coverVideo). Giving `source`
      // a default value used to cause Sanity to silently populate it on
      // every new document, which then made `url` below "required" even
      // though the editor never touched the video section at all.
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.source === 'file',
      validation: (Rule) =>
        Rule.custom((val, ctx: any) => {
          const source = ctx.parent?.source;
          if (!source || source === 'file') return true; // untouched, or file-based — no URL needed
          return val ? true : 'Add a video URL, or clear the Source field to leave this video block empty.';
        })
    }),
    defineField({
      name: 'file',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.source !== 'file'
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay (muted, no sound — uploaded files only)',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.source !== 'file'
    })
  ],
  preview: { select: { title: 'caption', subtitle: 'url' } }
});
