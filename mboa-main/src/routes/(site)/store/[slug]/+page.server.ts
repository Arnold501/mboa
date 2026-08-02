import { sanityFetch } from '@sanity/sveltekit';
import { productBySlugQuery } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const res = await sanityFetch(event, { query: productBySlugQuery, params: { slug: event.params.slug } });
  if (!res.data) throw error(404, 'Product not found');
  return { product: res.data };
};
