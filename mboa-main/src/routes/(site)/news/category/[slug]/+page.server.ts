import { sanityFetch } from '@sanity/sveltekit';
import { postsQuery, postsCountQuery, categoriesQuery, newsroomPageQuery } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 9;

export const load: PageServerLoad = async (event) => {
  const category = event.params.slug;
  const page = Math.max(1, Number(event.url.searchParams.get('p')) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const [postsRes, countRes, categoriesRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: postsQuery, params: { start, end, category } }),
    sanityFetch(event, { query: postsCountQuery, params: { category } }),
    sanityFetch(event, { query: categoriesQuery, params: {} }),
    sanityFetch(event, { query: newsroomPageQuery, params: {} })
  ]);

  const activeCategoryMeta = categoriesRes.data?.find((c: any) => c.slug === category);
  if (!activeCategoryMeta) throw error(404, 'Category not found');

  return {
    posts: postsRes.data,
    totalPages: Math.max(1, Math.ceil((countRes.data ?? 0) / PAGE_SIZE)),
    categories: categoriesRes.data,
    activeCategory: category,
    activeCategoryMeta,
    currentPage: page,
    page: pageRes.data ?? {}
  };
};
