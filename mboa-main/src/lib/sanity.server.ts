import { SANITY_VIEWER_TOKEN } from '$env/static/private';
import { client } from '$lib/sanity';

/**
 * Server-only client authenticated with a Viewer token.
 * Used to fetch draft content when Preview Mode / the Presentation tool is active.
 * NEVER import this from a file that ships to the browser.
 */
export const serverClient = client.withConfig({
  token: SANITY_VIEWER_TOKEN,
  useCdn: false
});
