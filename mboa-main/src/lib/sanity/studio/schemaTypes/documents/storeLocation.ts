import { defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons/Pin';

export default defineType({
  name: 'storeLocation',
  title: 'Store Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'Store Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'city', title: 'City / Region', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Full number with country code — digits, spaces, or "+" are all fine (e.g. "+250 700 000 000"). Used to build a wa.me deep link. Leave blank to hide the WhatsApp option for this store.'
    }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'hours', title: 'Opening Hours', type: 'array', of: [{ type: 'string' }], description: 'One line per array item.' }),
    defineField({ name: 'mapUrl', title: 'Google Maps Link', type: 'url' }),
    defineField({ name: 'image', title: 'Store Photo (optional)', type: 'image', options: { hotspot: true } })
  ],
  preview: { select: { title: 'name', subtitle: 'city', media: 'image' } }
});