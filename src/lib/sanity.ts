import { createClient } from '@sanity/sveltekit';
import {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_API_VERSION,
  PUBLIC_SANITY_STUDIO_URL
} from '$env/static/public';

export const apiVersion = PUBLIC_SANITY_API_VERSION || '2025-10-21';

/** Public, browser-safe client. Reads published content via the fast global CDN. */
export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: true,
    studioUrl: PUBLIC_SANITY_STUDIO_URL
  }
});
