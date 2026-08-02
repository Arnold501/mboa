import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'availability', title: 'Store Availability' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', group: 'details', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'details', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'productCategory' }], group: 'details' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'details', validation: (Rule) => Rule.required() }),
    defineField({ name: 'price', title: 'Price', type: 'number', group: 'details', validation: (Rule) => Rule.required().positive() }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', group: 'details', initialValue: 'RWF', options: { list: ['RWF', 'USD'] } }),
    defineField({
      name: 'sizes', title: 'Available Sizes', type: 'array', group: 'details',
      of: [{ type: 'string' }], options: { layout: 'tags' },
      description: 'e.g. S, M, L, XL — display only, informational for customers.'
    }),
    defineField({
      name: 'images', title: 'Product Images', type: 'array', group: 'details',
      of: [{ type: 'imageBlock' }],
      validation: (Rule) => Rule.required().min(1)
    }),

    defineField({
      name: 'availability',
      title: 'Available At',
      type: 'array',
      group: 'availability',
      description: 'Choose which store locations carry this product, and whether it\'s currently in stock at each. Only "In Stock" locations are shown to customers — sold-out ones are automatically hidden, not just flagged.',
      of: [
        {
          type: 'object',
          name: 'storeAvailability',
          fields: [
            { name: 'store', title: 'Store', type: 'reference', to: [{ type: 'storeLocation' }], validation: (Rule: any) => Rule.required() },
            {
              name: 'status', title: 'Status', type: 'string',
              options: { list: [{ title: 'In Stock', value: 'inStock' }, { title: 'Sold Out', value: 'soldOut' }], layout: 'radio' },
              initialValue: 'inStock', validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: { store: 'store.name', status: 'status' },
            prepare: ({ store, status }: any) => ({ title: store, subtitle: status === 'inStock' ? 'In Stock' : 'Sold Out' })
          }
        }
      ]
    }),

    defineField({ name: 'seo', title: 'SEO & Social Sharing', type: 'seo', group: 'seo' })
  ],
  preview: {
    select: { title: 'name', media: 'images.0.image', price: 'price', currency: 'currency' },
    prepare: ({ title, media, price, currency }: any) => ({ title, media, subtitle: price ? `${price} ${currency ?? ''}` : undefined })
  }
});
