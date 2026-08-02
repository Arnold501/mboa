import { sanityFetch } from '@sanity/sveltekit';
import { partnersQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

// The About page's copy remains static by design (see
// studio/schemaTypes/documents/aboutPage.ts). The Partners section is the
// one dynamic piece here — it reuses the exact same `partner` documents
// that power the Home page marquee, just rendered as a grid.
export const load: PageServerLoad = async (event) => {
  const res = await sanityFetch(event, { query: partnersQuery, params: {} });
  return { partners: res.data ?? [] };
};