import { sanityFetch } from '@sanity/sveltekit';
import { mediaItemsQuery, mediaCategoriesQuery, mediaPageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [itemsRes, categoriesRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: mediaItemsQuery, params: {} }),
    sanityFetch(event, { query: mediaCategoriesQuery, params: {} }),
    sanityFetch(event, { query: mediaPageQuery, params: {} })
  ]);
  return { items: itemsRes.data ?? [], categories: categoriesRes.data ?? [], page: pageRes.data ?? {} };
};
