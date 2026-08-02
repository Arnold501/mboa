import { sanityFetch } from '@sanity/sveltekit';
import { authorBySlugQuery, postsByAuthorQuery } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [authorRes, postsRes] = await Promise.all([
    sanityFetch(event, { query: authorBySlugQuery, params: { slug: event.params.slug } }),
    sanityFetch(event, { query: postsByAuthorQuery, params: { slug: event.params.slug } })
  ]);
  if (!authorRes.data) throw error(404, 'Author not found');
  return { author: authorRes.data, posts: postsRes.data };
};
