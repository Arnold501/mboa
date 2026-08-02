import { sanityFetch } from '@sanity/sveltekit';
import { athletesQuery, sportCategoriesQuery, athletesPageQuery, athletesWithHighlightsQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [athletesRes, categoriesRes, pageRes, highlightsRes] = await Promise.all([
    sanityFetch(event, { query: athletesQuery, params: {} }),
    sanityFetch(event, { query: sportCategoriesQuery, params: {} }),
    sanityFetch(event, { query: athletesPageQuery, params: {} }),
    sanityFetch(event, { query: athletesWithHighlightsQuery, params: {} })
  ]);

  return {
    athletes: athletesRes.data ?? [],
    categories: categoriesRes.data ?? [],
    page: pageRes.data ?? {},
    highlights: highlightsRes.data ?? []
  };
};
