import { sanityFetch } from '@sanity/sveltekit';
import { productsQuery, productCategoriesQuery, storePageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [productsRes, categoriesRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: productsQuery, params: {} }),
    sanityFetch(event, { query: productCategoriesQuery, params: {} }),
    sanityFetch(event, { query: storePageQuery, params: {} })
  ]);
  return {
    products: productsRes.data ?? [],
    categories: categoriesRes.data ?? [],
    page: pageRes.data ?? {}
  };
};
