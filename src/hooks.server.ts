import { handlePreviewMode, handleLiveLoader } from '@sanity/sveltekit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { serverClient } from '$lib/sanity.server';
import { env } from '$env/dynamic/private';

let { SANITY_VIEWER_TOKEN } = env;

/**
 * handlePreviewMode  — powers /preview/enable + /preview/disable, used by the
 *                       Presentation tool to toggle draft-viewing for an editor.
 * handleLiveLoader   — wires up `sanityFetch` (used in every +page.server.ts)
 *                       to Sanity's Live Content API, so content updates
 *                       propagate to the site automatically — no rebuild,
 *                       no webhook, no manual cache invalidation.
 */
export const handle = sequence(
  handlePreviewMode({
    client: serverClient,
    preview: { redirect }
  }),
  handleLiveLoader({
    client: serverClient,
    browserToken: SANITY_VIEWER_TOKEN,
    serverToken: SANITY_VIEWER_TOKEN
  })
);
