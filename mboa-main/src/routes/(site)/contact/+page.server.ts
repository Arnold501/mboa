import { sanityFetch } from '@sanity/sveltekit';
import { contactPageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { partnersQuery } from '$lib/sanity/queries';

// siteSettings (contact info, inquiry types) is already inherited from the
// (site)/+layout.server.ts — this load only adds the page-specific hero.
export const load: PageServerLoad = async (event) => {
  const res = await sanityFetch(event, { query: contactPageQuery, params: {} });
  let partnersRes = await sanityFetch(event, { query: partnersQuery, params: {} })
  
  return { 
    page: res.data ?? {}, 
    partners: partnersRes.data ?? []
  };
};
