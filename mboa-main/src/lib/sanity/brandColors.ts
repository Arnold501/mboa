/**
 * Single source of truth for the on-brand color palette editors are allowed
 * to use anywhere content can be colorized (inline highlighted text,
 * callouts, stat highlights, category accents, dividers).
 *
 * Deliberately restricted to MBOA's existing design tokens (see layout.css)
 * so editors can express emphasis without ever producing an off-brand page.
 * Imported both by the Studio schema (objects/brandColor.ts) and by the
 * Svelte rendering components — keeping Studio and frontend perfectly in sync.
 */
export const BRAND_COLORS = [
  { title: 'Gold', value: 'gold', hex: '#C8A96A' },
  { title: 'Gold Light', value: 'goldLight', hex: '#D4BC89' },
  { title: 'Gold Dark', value: 'goldDark', hex: '#A88A4A' },
  { title: 'White', value: 'white', hex: '#FFFFFF' },
  { title: 'Muted Gray', value: 'muted', hex: '#8A8A8A' }
] as const;

export type BrandColorValue = (typeof BRAND_COLORS)[number]['value'];

export function getBrandColorHex(value: string | undefined | null): string {
  return BRAND_COLORS.find((c) => c.value === value)?.hex ?? '#C8A96A';
}
