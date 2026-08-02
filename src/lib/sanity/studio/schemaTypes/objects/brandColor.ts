import { defineType } from 'sanity';
import { BRAND_COLORS } from '$lib/sanity/brandColors';

/**
 * Restricted color picker — editors can only choose from MBOA's actual
 * design tokens (see layout.css), so "color change to match the website"
 * is enforced by the schema itself rather than left to chance.
 */
export default defineType({
  name: 'brandColor',
  title: 'Brand Color',
  type: 'string',
  options: {
    list: BRAND_COLORS.map(({ title, value }) => ({ title, value })),
    layout: 'radio'
  },
  initialValue: 'gold'
});
