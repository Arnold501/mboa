import { sanityFetch } from '@sanity/sveltekit';
import { athleteBySlugQuery } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const res = await sanityFetch(event, { query: athleteBySlugQuery, params: { slug: event.params.slug } });
  if (!res.data) throw error(404, 'Athlete not found');
  return { athlete: res.data };
};