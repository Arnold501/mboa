import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export default defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
      // Intentionally NOT required at this level — imageBlock is reused as
      // both a required field (athlete.image) and an optional one
      // (athlete.heroImage, post.coverVideo-adjacent patterns). "Required"
      // is enforced at the PARENT field instead, where intent is actually
      // known (see athlete.ts / post.ts).
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Required whenever an image is attached — used for accessibility and image SEO.',
      validation: (Rule) =>
        Rule.custom((val, ctx: any) => {
          if (!ctx.parent?.image?.asset) return true; // no image attached yet — nothing to validate
          return val ? true : 'Add alt text for this image.';
        })
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'credit', title: 'Photo Credit', type: 'string' }),
    defineField({
      name: 'fullBleed',
      title: 'Full-width (breaks out of the text column)',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: { select: { media: 'image', title: 'caption', subtitle: 'alt' } }
});
