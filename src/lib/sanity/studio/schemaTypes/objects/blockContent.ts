import { defineArrayMember, defineType } from 'sanity';

/**
 * The main rich-text field used by `post.body`.
 *
 * Standard formatting (headings, bold/italic/underline, bullet & numbered
 * lists, quotes, links) plus a curated set of embeddable blocks: images,
 * video (YouTube/Vimeo/uploaded), callouts, stat highlights, CTAs,
 * newsletter signup, code snippets, and dividers. Also adds a "Colored Text"
 * annotation restricted to the brand palette.
 */
export default defineType({
  name: 'blockContent',
  title: 'Body Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bulleted', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Code', value: 'code' }
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            icon: () => '🔗',
            fields: [
              { name: 'href', title: 'URL', type: 'url', validation: (Rule: any) => Rule.required() },
              { name: 'newTab', title: 'Open in new tab', type: 'boolean', initialValue: true }
            ]
          },
          {
            name: 'highlight',
            title: 'Colored Text',
            type: 'object',
            icon: () => '🎨',
            fields: [{ name: 'color', title: 'Color', type: 'brandColor' }]
          }
        ]
      }
    }),
    defineArrayMember({ type: 'imageBlock' }),
    defineArrayMember({ type: 'videoEmbed' }),
    defineArrayMember({ type: 'calloutBlock' }),
    defineArrayMember({ type: 'statHighlight' }),
    defineArrayMember({ type: 'ctaBlock' }),
    defineArrayMember({ type: 'newsletterBlock' }),
    defineArrayMember({ type: 'codeBlock' }),
    defineArrayMember({ type: 'dividerBlock' })
  ]
});
