import { sanityFetch } from '@sanity/sveltekit';
import { siteSettingsQuery } from '$lib/sanity/queries';
import type { LayoutServerLoad } from './$types';

// Fetched once per navigation for the whole (site) group — feeds Nav,
// Footer, and the Contact page with live nav items, social links, and
// contact details instead of the static mock.ts exports.
export const load: LayoutServerLoad = async (event) => {
  const res = await sanityFetch(event, { query: siteSettingsQuery, params: {} });
  return { siteSettings: res.data ?? {} };
};
