import { env } from '$env/dynamic/private';
import { client } from '$lib/sanity';

let { SANITY_VIEWER_TOKEN } = env;

/**
 * Server-only client authenticated with a Viewer token.
 * Used to fetch draft content when Preview Mode / the Presentation tool is active.
 * NEVER import this from a file that ships to the browser.
 */
export const serverClient = client.withConfig({
  token: SANITY_VIEWER_TOKEN,
  useCdn: false
});
