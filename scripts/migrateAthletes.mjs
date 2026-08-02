/**
 * One-off migration: pushes the 6 athletes currently hardcoded in
 * src/lib/data/mock.ts into Sanity, as real `sportCategory` + `athlete`
 * documents (including uploading their Unsplash images as real Sanity
 * assets, so they're hotspot/crop-aware like every other image on site).
 *
 * Usage:
 *   1. Create a token at sanity.io/manage → API → Tokens with the
 *      "Editor" role (write access) — NOT the Viewer token from .env.
 *   2. SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_WRITE_TOKEN=xxx \
 *        node scripts/migrateAthletes.mjs
 *
 * Idempotent: uses deterministic document IDs, so re-running it updates
 * the same documents instead of duplicating them.
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

// Copied directly from the current src/lib/data/mock.ts — edit this list,
// or point it at your own JSON export, if your content has since diverged.
const athletes = [
  {
    slug: 'jean-pierre-habimana', name: 'Jean-Pierre Habimana', nickname: 'The Panther',
    category: 'MMA', record: '12-2-0', division: 'Welterweight', height: "5'11\"", weight: '170 lbs',
    age: 26, nationality: 'Rwanda',
    bio: "Jean-Pierre Habimana is MBOA Sports' flagship MMA prospect. Born in Kigali, he began training at age 14 and quickly distinguished himself through his explosive striking and elite ground game.",
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop&crop=face',
    tags: ['MMA', 'Welterweight', 'Rising Star'],
    fight_history: [
      { opponent: 'Marcus Silva', result: 'W', method: 'TKO', round: 2, date: '2024-03-01', event: 'MBOA FC 12' },
      { opponent: 'Thierry Dubois', result: 'W', method: 'Submission', round: 3, date: '2023-11-01', event: 'MBOA FC 10' },
      { opponent: 'Kevin Adeyemi', result: 'L', method: 'Decision', round: 5, date: '2023-07-01', event: 'MBOA FC 8' },
      { opponent: 'Rashid Nuru', result: 'W', method: 'KO', round: 1, date: '2023-04-01', event: 'MBOA FC 7' }
    ],
    achievements: ['2023 National MMA Champion', '2022 Pan-African Golden Gloves', 'MBOA Fighter of the Year 2023'],
    featured: true
  },
  {
    slug: 'amara-diallo', name: 'Amara Diallo', nickname: 'The Storm',
    category: 'Kickboxing', record: '18-3-1', division: 'Lightweight', height: "5'9\"", weight: '135 lbs',
    age: 24, nationality: 'Senegal',
    bio: 'Amara Diallo is a dynamic kickboxer with lightning-fast combinations and ring IQ beyond his years. Currently ranked #4 in Africa.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=800&fit=crop&crop=face',
    tags: ['Kickboxing', 'Lightweight', 'Ranked #4 Africa'],
    fight_history: [
      { opponent: 'Emmanuel Osei', result: 'W', method: 'Decision', round: 5, date: '2024-02-01', event: 'MBOA KB 6' },
      { opponent: 'Tariq Hassan', result: 'W', method: 'KO', round: 3, date: '2023-10-01', event: 'MBOA KB 5' },
      { opponent: 'Luke Foreman', result: 'L', method: 'Decision', round: 5, date: '2023-06-01', event: 'Euro Series 4' }
    ],
    achievements: ['4x Senegalese National Champion', 'ISKA Africa Title 2023', 'MBOA Athlete of the Quarter Q1 2024'],
    featured: true
  },
  {
    slug: 'celestine-uwimana', name: 'Celestine Uwimana', nickname: 'The Lioness',
    category: 'MMA', record: '7-0-0', division: 'Strawweight', height: "5'5\"", weight: '115 lbs',
    age: 22, nationality: 'Rwanda',
    bio: "Undefeated and relentless, Celestine is MBOA's most exciting women's prospect. Her aggressive pressure-fighting style and iron chin have made her a fan favorite.",
    image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=600&h=800&fit=crop&crop=face',
    tags: ['MMA', 'Women', 'Undefeated'],
    fight_history: [
      { opponent: 'Fatima Al-Rashid', result: 'W', method: 'TKO', round: 1, date: '2024-01-01', event: 'MBOA FC 11' },
      { opponent: 'Precious Ndlovu', result: 'W', method: 'Submission', round: 2, date: '2023-09-01', event: 'MBOA FC 9' }
    ],
    achievements: ['Undefeated Record (7-0)', 'East African MMA Championship 2023', 'MBOA Prospect of the Year 2023'],
    featured: true
  },
  {
    slug: 'ibrahim-musa', name: 'Ibrahim Musa', nickname: 'Iron Fist',
    category: 'Kickboxing', record: '24-5-0', division: 'Middleweight', height: "6'1\"", weight: '185 lbs',
    age: 29, nationality: 'Nigeria',
    bio: 'Ibrahim Musa brings power and technical mastery to the middleweight division. A seasoned veteran, he mentors MBOA\'s younger fighters.',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=800&fit=crop&crop=face',
    tags: ['Kickboxing', 'Middleweight', 'Veteran'],
    fight_history: [],
    achievements: ['Nigerian National Champion 2020-2023', 'Pan-African Kickboxing Title 2022', 'WBC Africa Title Holder'],
    featured: false
  },
  {
    slug: 'coach-samuel-nkosi', name: 'Samuel Nkosi', nickname: null,
    category: 'Coach', record: null, division: 'Head Coach – MMA & S&C', height: "6'0\"", weight: null,
    age: 42, nationality: 'South Africa',
    bio: "Coach Samuel Nkosi is one of Africa's most decorated martial arts coaches, with over 20 years of experience producing champions.",
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop&crop=face',
    tags: ['Coach', 'MMA', 'Strength & Conditioning'],
    fight_history: [],
    achievements: ['20+ Years Coaching Experience', '3 National Title Coaches Award', 'IMMAF Certified Level 3'],
    featured: false
  },
  {
    slug: 'felix-nzeyimana', name: 'Felix Nzeyimana', nickname: 'The Ghost',
    category: 'Rising Prospects', record: '3-0-0', division: 'Featherweight', height: "5'8\"", weight: '145 lbs',
    age: 19, nationality: 'Rwanda',
    bio: 'At just 19 years old, Felix is already turning heads with his elusive movement and devastating counter-striking.',
    image: 'https://images.unsplash.com/photo-1547941126-3d5322b218b0?w=600&h=800&fit=crop&crop=face',
    tags: ['Rising Prospects', 'Featherweight', 'Age 19'],
    fight_history: [],
    achievements: ['2024 MBOA Development Camp Champion', 'Youth National MMA Runner-Up 2023'],
    featured: false
  }
];

const categoryOrder = ['MMA', 'Kickboxing', 'Rising Prospects', 'Coach'];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function uploadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = slugify(url.split('?')[0].split('/').pop() || 'image') + '.jpg';
  return client.assets.upload('image', buffer, { filename });
}

async function run() {
  console.log('→ Creating sport categories...');
  const categoryIds = {};
  for (const [i, title] of categoryOrder.entries()) {
    const id = `sportCategory-${slugify(title)}`;
    await client.createOrReplace({
      _id: id,
      _type: 'sportCategory',
      title,
      slug: { current: slugify(title) },
      order: i
    });
    categoryIds[title] = id;
    console.log(`  ✓ ${title}`);
  }

  console.log('→ Migrating athletes (this uploads images, may take a minute)...');
  for (const a of athletes) {
    const asset = await uploadImage(a.image);
    const doc = {
      _id: `athlete-${a.slug}`,
      _type: 'athlete',
      name: a.name,
      slug: { current: a.slug },
      nickname: a.nickname ?? undefined,
      category: { _type: 'reference', _ref: categoryIds[a.category] },
      division: a.division,
      nationality: a.nationality,
      bio: a.bio,
      tags: a.tags ?? [],
      record: a.record ?? undefined,
      height: a.height ?? undefined,
      weight: a.weight ?? undefined,
      age: a.age ?? undefined,
      fightHistory: (a.fight_history ?? []).map((f) => ({
        _type: 'fight',
        _key: slugify(`${f.opponent}-${f.date}`),
        opponent: f.opponent,
        result: f.result,
        method: f.method,
        round: f.round,
        date: f.date,
        event: f.event
      })),
      achievements: a.achievements ?? [],
      featured: !!a.featured,
      image: {
        _type: 'imageBlock',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: a.name
      }
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${a.name}`);
  }

  console.log('\nDone. Open /studio to review, then feature/reorder as needed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
