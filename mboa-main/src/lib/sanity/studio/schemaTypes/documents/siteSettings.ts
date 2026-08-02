import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'brand', title: 'Logo & Nav' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'newsletter', title: 'Newsletter' }
  ],
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string', group: 'general', initialValue: 'MBOA Sports' }),
    defineField({ name: 'defaultSeo', title: 'Default SEO', type: 'seo', group: 'general' }),
    defineField({
      name: 'becomePartnerUrl',
      title: 'Become a Partner — Form URL',
      type: 'url',
      group: 'general',
      description: 'External link (e.g. a Google Form) used by every "Become a Partner" button across the site — shared by the Home page partners strip and the About page partners section.'
    }),

    // ── Logo & Nav: the ONLY parts of Nav/Footer that are editable.
    // Nav/footer link structure itself stays fixed in code so editors can
    // never accidentally break site navigation.
    defineField({ name: 'logoImage', title: 'Logo Image (optional)', type: 'image', group: 'brand', description: 'Falls back to a styled text mark using the Brand Name initial if left blank.' }),
    defineField({ name: 'brandName', title: 'Brand Name', type: 'string', group: 'brand', initialValue: 'MBOA' }),
    defineField({ name: 'brandSubtitle', title: 'Brand Subtitle', type: 'string', group: 'brand', initialValue: 'Sports', description: 'Shown next to the brand name in the nav, and appended to it in the footer.' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'brand', initialValue: 'Building Champions. Empowering Talents' }),
    defineField({ name: 'navCtaLabel', title: 'Nav CTA Button Label', type: 'string', group: 'brand', initialValue: 'Join / Partner' }),
    defineField({ name: 'navCtaUrl', title: 'Nav CTA Button Link', type: 'string', group: 'brand', initialValue: '/contact' }),
    defineField({ name: 'footerDescription', title: 'Footer Description', type: 'text', rows: 3, group: 'brand' }),
    defineField({ name: 'socialLinks', title: 'Social Links (Footer)', type: 'array', of: [{ type: 'socialLink' }], group: 'brand' }),

    // ── Contact Info: powers the Contact page only (Footer's contact
    // block is intentionally static — see note above).
    defineField({ name: 'address', title: 'Address', type: 'array', of: [{ type: 'string' }], group: 'contact', description: 'One line per array item.' }),
    defineField({ name: 'emails', title: 'Emails', type: 'array', of: [{ type: 'string' }], group: 'contact' }),
    defineField({ name: 'phones', title: 'Phone Numbers', type: 'array', of: [{ type: 'string' }], group: 'contact' }),
    defineField({ name: 'officeHours', title: 'Office Hours', type: 'array', of: [{ type: 'string' }], group: 'contact' }),
    defineField({
      name: 'inquiryTypes', title: 'Contact Form — Inquiry Types', type: 'array', of: [{ type: 'string' }], group: 'contact',
      description: 'Options shown as selectable chips on the Contact page form.'
    }),

    defineField({
      name: 'newsletter', title: 'Newsletter Settings', type: 'object', group: 'newsletter',
      fields: [
        { name: 'heading', type: 'string', initialValue: 'Never Miss a Headline' },
        { name: 'subtext', type: 'text', rows: 2 },
        { name: 'provider', type: 'string', description: 'Internal note: which ESP /api/newsletter forwards to.' }
      ]
    })
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) }
});