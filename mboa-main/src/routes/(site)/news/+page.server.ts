import { sanityFetch } from '@sanity/sveltekit';
import { postsQuery, postsCountQuery, categoriesQuery, featuredPostsQuery, newsroomPageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 9;

export const load: PageServerLoad = async (event) => {
  const category = event.url.searchParams.get('category') || null;
  const page = Math.max(1, Number(event.url.searchParams.get('p')) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const [postsRes, countRes, categoriesRes, featuredRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: postsQuery, params: { start, end, category } }),
    sanityFetch(event, { query: postsCountQuery, params: { category } }),
    sanityFetch(event, { query: categoriesQuery, params: {} }),
    sanityFetch(event, { query: featuredPostsQuery, params: {} }),
    sanityFetch(event, { query: newsroomPageQuery, params: {} })
  ]);

  return {
    posts: postsRes.data,
    totalPages: Math.max(1, Math.ceil((countRes.data ?? 0) / PAGE_SIZE)),
    categories: categoriesRes.data,
    featured: featuredRes.data,
    activeCategory: category ?? 'All',
    currentPage: page,
    page: pageRes.data ?? {}
  };
};
