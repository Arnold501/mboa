import { sanityFetch } from '@sanity/sveltekit';
import {
  homePageQuery,
  featuredPostsQuery,
  featuredAthletesQuery,
  upcomingEventsPreviewQuery,
  mediaPreviewQuery,
  partnersQuery
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const [homeRes, latestRes, athletesRes, eventsRes, mediaRes, partnersRes] = await Promise.all([
    sanityFetch(event, { query: homePageQuery, params: {} }),
    sanityFetch(event, { query: featuredPostsQuery, params: {} }),
    sanityFetch(event, { query: featuredAthletesQuery, params: {} }),
    sanityFetch(event, { query: upcomingEventsPreviewQuery, params: {} }),
    sanityFetch(event, { query: mediaPreviewQuery, params: {} }),
    sanityFetch(event, { query: partnersQuery, params: {} })
  ]);

  return {
    home: homeRes.data ?? {},
    latestNews: latestRes.data ?? [],
    featuredAthletes: athletesRes.data ?? [],
    upcomingEvents: eventsRes.data ?? [],
    featuredMedia: mediaRes.data ?? [],
    partners: partnersRes.data ?? []
  };
};