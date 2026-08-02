import { sanityFetch } from '@sanity/sveltekit';
import { upcomingEventsQuery, pastEventsQuery, eventsPageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [upcomingRes, pastRes, pageRes] = await Promise.all([
    sanityFetch(event, { query: upcomingEventsQuery, params: {} }),
    sanityFetch(event, { query: pastEventsQuery, params: {} }),
    sanityFetch(event, { query: eventsPageQuery, params: {} })
  ]);
  return { upcoming: upcomingRes.data ?? [], past: pastRes.data ?? [], page: pageRes.data ?? {} };
};
