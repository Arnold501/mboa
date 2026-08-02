import { sanityFetch } from '@sanity/sveltekit';
import { postBySlugQuery, relatedPostsQuery } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const postRes = await sanityFetch(event, {
    query: postBySlugQuery,
    params: { slug: event.params.slug }
  });
  const post = postRes.data;
  if (!post) throw error(404, 'Article not found');

  let related = post.relatedManual?.length ? post.relatedManual : [];
  if (!related.length && post.category?._id) {
    const relatedRes = await sanityFetch(event, {
      query: relatedPostsQuery,
      params: { categoryId: post.category._id, excludeId: post._id }
    });
    related = relatedRes.data ?? [];
  }

  return { post, related };
};
