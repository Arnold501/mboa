import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons/Play';

export default defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title' }, validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category', title: 'Category', type: 'reference',
      to: [{ type: 'mediaCategory' }], validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Photo Gallery', value: 'photo' }
        ],
        layout: 'radio'
      },
      initialValue: 'video',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'thumbnail', title: 'Thumbnail (card cover image)', type: 'imageBlock',
      description: 'Shown on the Media grid card and, for videos, as the click-to-play facade.',
      validation: (Rule) =>
        Rule.required().custom((val: any) =>
          !val?.image?.asset ? 'A thumbnail is required.' : !val?.alt ? 'Add alt text.' : true
        )
    }),
    defineField({
      name: 'video', title: 'Video', type: 'videoEmbed',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((val: any, ctx: any) => {
          if (ctx.parent?.mediaType !== 'video') return true;
          if (!val?.source) return 'Choose a video source (YouTube, Vimeo, or upload).';
          if (val.source !== 'file' && !val.url) return 'Add a video URL.';
          if (val.source === 'file' && !val.file?.asset) return 'Upload a video file.';
          return true;
        })
    }),
    defineField({
      name: 'photos', title: 'Photo Gallery', type: 'array',
      of: [{ type: 'imageBlock' }],
      hidden: ({ parent }) => parent?.mediaType !== 'photo',
      validation: (Rule) =>
        Rule.custom((val: any, ctx: any) => {
          if (ctx.parent?.mediaType !== 'photo') return true;
          return val?.length ? true : 'Add at least one photo to the gallery.';
        })
    }),
    defineField({
      name: 'duration', title: 'Duration (e.g. 4:32)', type: 'string',
      hidden: ({ parent }) => parent?.mediaType !== 'video'
    }),
    defineField({ name: 'views', title: 'View Count', type: 'number', initialValue: 0 }),
    defineField({
      name: 'publishedAt', title: 'Publish Date', type: 'datetime',
      initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Feature at top of Media page', type: 'boolean', initialValue: false })
  ],
  orderings: [{ title: 'Publish date, new to old', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', media: 'thumbnail.image', category: 'category.title', mediaType: 'mediaType' },
    prepare: ({ title, media, category, mediaType }: any) => ({
      title,
      media,
      subtitle: [category, mediaType === 'photo' ? '📷 Photo Gallery' : '🎬 Video'].filter(Boolean).join(' · ')
    })
  }
});
