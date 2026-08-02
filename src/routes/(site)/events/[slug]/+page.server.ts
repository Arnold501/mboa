import { sanityFetch } from '@sanity/sveltekit';
import { eventBySlugQuery } from '$lib/sanity/queries';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad, PageServerParentData, RouteParams } from './$types';

export const load: PageServerLoad = async (event: ServerLoadEvent<RouteParams, PageServerParentData, "/(site)/events/[slug]">) => {
  const res = await sanityFetch(event, { query: eventBySlugQuery, params: { slug: event.params.slug } });
  if (!res.data) throw error(404, 'Event not found');
  return { event: res.data };
};
