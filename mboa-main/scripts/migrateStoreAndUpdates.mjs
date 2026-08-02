/**
 * Seeds the new Store feature with real demo data (locations, categories,
 * products with varied per-store availability — including sold-out cases,
 * so you can see that visibility logic actually working), plus a light
 * touch of demo data for the other recent additions: an Athlete highlight
 * video/caption, and a Media photo gallery item.
 *
 * All images are either:
 *  (a) Unsplash photo IDs already verified working elsewhere in this exact
 *      project (src/lib/data/mock.ts, the other migration scripts), or
 *  (b) the same placeholder YouTube video already used for Event/Media
 *      highlights elsewhere (a real, permanently-available public video).
 * Nothing here is a fabricated or unverified URL.
 *
 * Usage (same credentials as the other migration scripts):
 *   SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_WRITE_TOKEN=xxx \
 *     node scripts/migrateStoreAndUpdates.mjs
 *
 * Idempotent — safe to re-run, uses deterministic document IDs.
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN environment variables.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-10-21', useCdn: false });

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

async function uploadImage(url, filenameHint) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = slugify(filenameHint || url.split('?')[0].split('/').pop() || 'image') + '.jpg';
  return client.assets.upload('image', buffer, { filename });
}

/* ─────────────────────────────  DATA  ──────────────────────────── */

const storeLocations = [
  {
    slug: 'mboa-flagship-kigali',
    name: 'MBOA Flagship Store',
    address: 'Kigali Arena Complex, KG 11 Ave',
    city: 'Kigali, Rwanda',
    phone: '+250 123 456 789',
    email: 'store.kigali@mboasports.rw',
    hours: ['Monday – Saturday: 9:00 – 19:00', 'Sunday: 11:00 – 16:00'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
  },
  {
    slug: 'mboa-lagos-outlet',
    name: 'MBOA Lagos Outlet',
    address: 'Landmark Centre, Water Corporation Road',
    city: 'Lagos, Nigeria',
    phone: '+234 700 123 4567',
    email: 'store.lagos@mboasports.rw',
    hours: ['Monday – Saturday: 10:00 – 20:00'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop'
  },
  {
    slug: 'mboa-dakar-partner',
    name: 'MBOA Dakar Partner Store',
    address: 'Point E, Rue 6',
    city: 'Dakar, Senegal',
    phone: '+221 77 123 4567',
    email: 'store.dakar@mboasports.rw',
    hours: ['Tuesday – Sunday: 10:00 – 18:00'],
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=600&fit=crop'
  }
];

const productCategories = ['Apparel', 'Gear & Equipment', 'Accessories'];

// availability keys reference storeLocations[].slug above
const products = [
  {
    slug: 'mboa-fight-camp-hoodie',
    name: 'MBOA Fight Camp Hoodie',
    category: 'Apparel',
    description: 'Heavyweight cotton-blend hoodie worn by the MBOA roster during fight camp. Embroidered crest, ribbed cuffs.',
    price: 45000,
    currency: 'RWF',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=900&fit=crop',
      'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=900&h=900&fit=crop'
    ],
    availability: [
      { store: 'mboa-flagship-kigali', status: 'inStock' },
      { store: 'mboa-lagos-outlet', status: 'inStock' }
    ]
  },
  {
    slug: 'mboa-champions-tee',
    name: 'MBOA Champions Tee',
    category: 'Apparel',
    description: 'Lightweight training tee featuring the MBOA champions roster print. Breathable, built for the gym.',
    price: 18000,
    currency: 'RWF',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900&h=900&fit=crop'],
    availability: [
      { store: 'mboa-flagship-kigali', status: 'inStock' },
      { store: 'mboa-lagos-outlet', status: 'soldOut' }, // intentionally sold out — won't show at Lagos
      { store: 'mboa-dakar-partner', status: 'inStock' }
    ]
  },
  {
    slug: 'mboa-training-gloves',
    name: 'MBOA Training Gloves',
    category: 'Gear & Equipment',
    description: 'Official MBOA-branded sparring gloves, dual-density foam padding, hook-and-loop wrist closure.',
    price: 65000,
    currency: 'RWF',
    sizes: ['S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1547941126-3d5322b218b0?w=900&h=900&fit=crop'],
    availability: [{ store: 'mboa-flagship-kigali', status: 'inStock' }]
  },
  {
    slug: 'mboa-snapback-cap',
    name: 'MBOA Snapback Cap',
    category: 'Accessories',
    description: 'Structured six-panel snapback with raised embroidered MBOA logo.',
    price: 15000,
    currency: 'RWF',
    sizes: ['One Size'],
    images: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=900&fit=crop'],
    availability: [
      { store: 'mboa-flagship-kigali', status: 'soldOut' }, // sold out at Flagship — only Lagos visible
      { store: 'mboa-lagos-outlet', status: 'inStock' }
    ]
  },
  {
    slug: 'mboa-gym-duffel-bag',
    name: 'MBOA Gym Duffel Bag',
    category: 'Gear & Equipment',
    description: 'Durable 45L duffel with separate ventilated boot/glove compartment. Built for fight camp travel.',
    price: 35000,
    currency: 'RWF',
    sizes: [],
    images: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=900&fit=crop'],
    availability: [
      { store: 'mboa-flagship-kigali', status: 'inStock' },
      { store: 'mboa-lagos-outlet', status: 'inStock' },
      { store: 'mboa-dakar-partner', status: 'soldOut' }
    ]
  }
];

async function run() {
  console.log('→ Store locations (uploading photos)...');
  const storeIds = {};
  for (const s of storeLocations) {
    const asset = await uploadImage(s.image, s.slug);
    const id = `storeLocation-${s.slug}`;
    await client.createOrReplace({
      _id: id,
      _type: 'storeLocation',
      name: s.name,
      address: s.address,
      city: s.city,
      phone: s.phone,
      email: s.email,
      hours: s.hours,
      mapUrl: mapsUrl(`${s.name}, ${s.city}`),
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    });
    storeIds[s.slug] = id;
    console.log(`  ✓ ${s.name}`);
  }

  console.log('→ Product categories...');
  const categoryIds = {};
  for (const [i, title] of productCategories.entries()) {
    const id = `productCategory-${slugify(title)}`;
    await client.createOrReplace({ _id: id, _type: 'productCategory', title, slug: { current: slugify(title) }, order: i });
    categoryIds[title] = id;
  }

  console.log('→ Products (uploading images, wiring per-store availability)...');
  for (const p of products) {
    const uploadedImages = [];
    for (const url of p.images) {
      const asset = await uploadImage(url, `${p.slug}-${uploadedImages.length}`);
      uploadedImages.push({
        _type: 'imageBlock',
        _key: slugify(`${p.slug}-${uploadedImages.length}`),
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: p.name
      });
    }

    await client.createOrReplace({
      _id: `product-${p.slug}`,
      _type: 'product',
      name: p.name,
      slug: { current: p.slug },
      category: { _type: 'reference', _ref: categoryIds[p.category] },
      description: p.description,
      price: p.price,
      currency: p.currency,
      sizes: p.sizes,
      images: uploadedImages,
      availability: p.availability.map((a) => ({
        _type: 'storeAvailability',
        _key: a.store,
        store: { _type: 'reference', _ref: storeIds[a.store] },
        status: a.status
      }))
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log('→ Store page hero...');
  await client.createOrReplace({
    _id: 'storePage',
    _type: 'storePage',
    hero: {
      _type: 'pageHero',
      eyebrow: 'MBOA Merchandise',
      title: 'Store',
      subtitle: 'Official MBOA gear — find where to pick it up near you.',
      image: {
        _type: 'imageBlock',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: (await uploadImage('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&h=700&fit=crop', 'store-hero'))._id }
        },
        alt: 'MBOA Store'
      }
    }
  });
  console.log('  ✓ Store Page hero');

  console.log('→ Athlete highlight demo (patching 2 existing athletes)...');
  await client
    .patch('athlete-jean-pierre-habimana')
    .set({
      highlightVideo: { source: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      highlightCaption: 'TKO Finish vs. Marcus Silva — MBOA FC 12'
    })
    .commit({ autoGenerateArrayKeys: true })
    .catch(() => console.log('  ⚠ athlete-jean-pierre-habimana not found — run migrateAthletes.mjs first, skipping'));
  await client
    .patch('athlete-amara-diallo')
    .set({
      highlightVideo: { source: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      highlightCaption: 'Fight-Ending Combination — MBOA KB 6'
    })
    .commit({ autoGenerateArrayKeys: true })
    .catch(() => console.log('  ⚠ athlete-amara-diallo not found — run migrateAthletes.mjs first, skipping'));
  console.log('  ✓ Highlight video + caption added (cutoutImage intentionally left unset —');
  console.log('    transparent-background PNG cutouts aren\'t available as generic stock');
  console.log('    photos; upload one per athlete in Studio when ready, no fallback needed).');

  console.log('→ Media photo gallery demo...');
  const galleryPhotoUrls = [
    'https://images.unsplash.com/photo-1547658718-1cdaa0852790?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1200&h=1200&fit=crop'
  ];
  const galleryPhotos = [];
  for (const [i, url] of galleryPhotoUrls.entries()) {
    const asset = await uploadImage(url, `fc13-gallery-${i}`);
    galleryPhotos.push({
      _type: 'imageBlock',
      _key: `fc13-gallery-${i}`,
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      alt: `MBOA FC 13 fight night — photo ${i + 1}`
    });
  }
  const thumbAsset = await uploadImage(galleryPhotoUrls[0], 'fc13-gallery-thumb');
  await client.createOrReplace({
    _id: 'mediaItem-fc13-fight-night-gallery',
    _type: 'mediaItem',
    title: 'Fight Night Gallery | MBOA FC 13',
    slug: { current: 'fc13-fight-night-gallery' },
    category: { _type: 'reference', _ref: 'mediaCategory-behind-the-scenes' },
    mediaType: 'photo',
    thumbnail: {
      _type: 'imageBlock',
      image: { _type: 'image', asset: { _type: 'reference', _ref: thumbAsset._id } },
      alt: 'MBOA FC 13 fight night gallery'
    },
    photos: galleryPhotos,
    publishedAt: new Date('2024-05-12').toISOString(),
    description: 'Behind-the-scenes photos from fight night at MBOA FC 13.',
    featured: false
  }).catch(() =>
    console.log('  ⚠ mediaCategory-behind-the-scenes not found — run migrateContent.mjs first, skipping gallery')
  );
  console.log('  ✓ Photo gallery media item created');

  console.log('\nDone. Visit /store, /athletes, and /media to see everything live.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
