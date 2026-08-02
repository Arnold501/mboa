import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { client } from '$lib/sanity';

const builder = createImageUrlBuilder(client);

/** Build a Sanity CDN image URL (crop/hotspot aware) from an image field value. */
export function urlFor(source: Image | null | undefined) {
  if (!source) return null;
  return builder.image(source);
}
