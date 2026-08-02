/**
 * One-off migration: pushes Events, Media, Partners, Sponsorship Tiers, and
 * Programs from the original mock.ts / hardcoded page content into Sanity.
 *
 * Usage (same write token as migrateAthletes.mjs):
 *   SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_WRITE_TOKEN=xxx \
 *     node scripts/migrateContent.mjs
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

async function uploadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = slugify(url.split('?')[0].split('/').pop() || 'image') + '.jpg';
  return client.assets.upload('image', buffer, { filename });
}

/* ─────────────────────────────  DATA  ──────────────────────────── */

const events = [
  {
    slug: 'mboa-fc-14', title: 'MBOA FC 14', subtitle: 'Night of Champions',
    date: '2024-09-28T19:00:00Z', venue: 'Kigali Arena', location: 'Kigali, Rwanda',
    poster: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=900&fit=crop',
    description: "MBOA FC 14 brings together the continent's elite fighters for a night of world-class combat sports. Featuring 10 bouts across MMA and kickboxing, with two African title bouts headlining the card.",
    featured: true,
    fightCard: [
      { fighter1: 'Jean-Pierre Habimana', fighter2: 'Kwame Asante', title: 'MBOA African Welterweight Title', type: 'Main Event' },
      { fighter1: 'Amara Diallo', fighter2: 'Emeka Johnson', title: 'Lightweight Kickboxing', type: 'Co-Main' },
      { fighter1: 'Celestine Uwimana', fighter2: 'Grace Mutombo', title: 'Strawweight MMA', type: 'Featured' },
      { fighter1: 'Felix Nzeyimana', fighter2: 'Darius Mensah', title: 'Featherweight MMA', type: 'Prelim' }
    ]
  },
  {
    slug: 'mboa-kb-championship-2024', title: 'MBOA Kickboxing Championship 2024', subtitle: 'East Africa vs West Africa',
    date: '2024-11-16T18:30:00Z', venue: 'Landmark Centre', location: 'Lagos, Nigeria',
    poster: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&h=900&fit=crop',
    description: 'A landmark cross-regional event showcasing the best kickboxing talent from across the African continent. 8 bouts, 4 title fights.',
    featured: true,
    fightCard: [
      { fighter1: 'Ibrahim Musa', fighter2: 'Chisom Okafor', title: 'Middleweight Kickboxing Title', type: 'Main Event' },
      { fighter1: 'Amara Diallo', fighter2: 'Al-Hassan Traore', title: 'Lightweight Kickboxing', type: 'Co-Main' }
    ]
  },
  {
    slug: 'mboa-fc-13', title: 'MBOA FC 13', subtitle: 'African Supremacy',
    date: '2024-05-11T19:00:00Z', venue: 'Kigali Arena', location: 'Kigali, Rwanda',
    poster: 'https://images.unsplash.com/photo-1547658718-1cdaa0852790?w=600&h=900&fit=crop',
    description: 'MBOA FC 13 delivered electrifying action across an 8-bout card. Jean-Pierre Habimana defended his regional title in a thrilling main event.',
    featured: false,
    fightCard: [
      { fighter1: 'Jean-Pierre Habimana', fighter2: 'Marcus Silva', title: 'MBOA Welterweight Title Defense', type: 'Main Event', result: 'Habimana W (TKO R2)' },
      { fighter1: 'Celestine Uwimana', fighter2: 'Fatima Al-Rashid', title: "Women's Strawweight", type: 'Co-Main', result: 'Uwimana W (TKO R1)' }
    ],
    results: 'Dominant performance across the card. 6 finishes in 8 bouts.',
    highlights: { source: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  },
  {
    slug: 'mboa-fc-12', title: 'MBOA FC 12', subtitle: 'Road to Glory',
    date: '2024-02-17T19:00:00Z', venue: 'Rubavu Sports Complex', location: 'Rubavu, Rwanda',
    poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=900&fit=crop',
    description: 'A regional qualifier event featuring top prospects from East and Central Africa.',
    featured: false,
    fightCard: [],
    results: '7 MBOA athletes competed, 6 victories.',
    highlights: { source: 'youtube', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  }
];

const mediaCategories = ['Fight Highlights', 'Training Camps', 'Documentaries', 'Behind the Scenes'];

const mediaItems = [
  {
    slug: 'habimana-title-defense-highlights', title: 'Habimana Title Defense Highlights | MBOA FC 13',
    category: 'Fight Highlights', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '4:32', views: 12400, date: '2024-05-15',
    description: "Full highlight reel from Jean-Pierre Habimana's dominant TKO title defense at MBOA FC 13.", featured: true
  },
  {
    slug: 'training-camp-fc14', title: 'Road to MBOA FC 14 | Training Camp',
    category: 'Training Camps', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '8:15', views: 7800, date: '2024-08-20',
    description: "Exclusive access to the MBOA performance center as our athletes prepare for the biggest card of the year.", featured: true
  },
  {
    slug: 'mboa-documentary-africa-to-world', title: 'Africa to the World | MBOA Documentary',
    category: 'Documentaries', thumbnail: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&h=700&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '24:00', views: 31200, date: '2024-06-01',
    description: 'A feature-length documentary following MBOA athletes from humble beginnings in Rwanda to competing on the world stage.', featured: false
  },
  {
    slug: 'uwimana-behind-the-scenes', title: 'A Day in the Life | Celestine Uwimana',
    category: 'Behind the Scenes', thumbnail: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=800&h=450&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:44', views: 9100, date: '2024-07-12',
    description: 'Follow "The Lioness" through a full training day at the MBOA Sports facility.', featured: false
  },
  {
    slug: 'mboa-fc-13-full-card', title: 'Full Card Highlights | MBOA FC 13',
    category: 'Fight Highlights', thumbnail: 'https://images.unsplash.com/photo-1547658718-1cdaa0852790?w=800&h=450&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '18:30', views: 22600, date: '2024-05-18',
    description: 'Every significant moment from the MBOA FC 13 full fight card.', featured: false
  },
  {
    slug: 'diallo-kb-masterclass', title: 'Amara Diallo Kickboxing Masterclass',
    category: 'Training Camps', thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=450&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '6:22', views: 5300, date: '2024-09-01',
    description: "Coach-approved breakdown of Amara Diallo's signature combination attacks.", featured: false
  }
];

const partners = [
  { name: 'Rwanda Sports Council', tier: 'Title Partner', description: "Rwanda's national governing body for sports, providing institutional support and national event co-hosting." },
  { name: 'AfricanFight.tv', tier: 'Media Partner', description: "Africa's premier combat sports streaming platform, broadcasting all MBOA events to 40+ countries." },
  { name: 'Peak Performance Nutrition', tier: 'Official Sponsor', description: 'Official nutrition and supplementation partner providing athlete-grade fuel to all MBOA competitors.' },
  { name: 'East Africa Elite Gear', tier: 'Official Sponsor', description: 'Exclusive kit and equipment supplier for MBOA training programs and competitive events.' },
  { name: 'Kigali Arena', tier: 'Venue Partner', description: "Rwanda's largest indoor arena, home to MBOA's flagship events and training facility." },
  { name: 'ProMed Sports Health', tier: 'Medical Partner', description: 'Providing comprehensive sports medicine, physio, and injury prevention services to all MBOA athletes.' }
];

const programs = [
  { title: 'Elite Athlete Development', icon: '🏆', description: 'Full-time professional development program for elite fighters with proven records and championship potential.', features: ['Daily Training 2× Per Day', 'Personal Performance Coach', 'Nutrition & Recovery Protocol', 'Fight Matchmaking Support', 'Media & Personal Branding', 'Travel & Competition Logistics'], image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', cta: 'Apply Now' },
  { title: 'Private Coaching', icon: '🎯', description: "One-on-one technical coaching sessions with MBOA's certified coaches for accelerated skill development.", features: ['1-on-1 Coaching Sessions', 'Technical Video Analysis', 'Custom Training Plans', 'Flexible Scheduling', 'Beginner to Elite Levels', 'Goal-Oriented Curriculum'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop', cta: 'Book a Session' },
  { title: 'Gym Partnership Program', icon: '🤝', description: "Partner your gym with MBOA's network and get access to elite coaching, resources, and competitive pipelines.", features: ['Affiliate Coaching Clinics', 'Standardized Curriculum', 'Athlete Referral Pipeline', 'Co-branded Promotions', 'Access to MBOA Events', 'Quarterly Coach Development'], image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=600&fit=crop', cta: 'Partner With Us' },
  { title: 'Coaching Education', icon: '📚', description: 'IMMAF-aligned coaching certification programs to elevate coaching standards across African combat sports.', features: ['3 Certification Levels', 'IMMAF-Aligned Curriculum', 'Practical & Theory Modules', 'Recognized Certification', 'Online & In-Person Options', 'Continuing Education Points'], image: 'https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=800&h=600&fit=crop', cta: 'Enroll Now' },
  { title: 'International Training Camps', icon: '✈️', description: 'Intensive training camps in partnership with world-class facilities in Europe, UAE, and Asia.', features: ['Annual International Camps', 'World-Class Facilities', 'Cross-Cultural Training', 'Professional Sparring Partners', 'Cultural Exchange Program', 'Sponsorship Available'], image: 'https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=800&h=600&fit=crop', cta: 'Learn More' }
];

/* ──────────────────────────────  RUN  ─────────────────────────────── */

async function run() {
  console.log('→ Media categories...');
  const mediaCategoryIds = {};
  for (const [i, title] of mediaCategories.entries()) {
    const id = `mediaCategory-${slugify(title)}`;
    await client.createOrReplace({ _id: id, _type: 'mediaCategory', title, slug: { current: slugify(title) }, order: i });
    mediaCategoryIds[title] = id;
  }

  console.log('→ Events (uploading posters)...');
  for (const e of events) {
    const asset = await uploadImage(e.poster);
    await client.createOrReplace({
      _id: `event-${e.slug}`,
      _type: 'event',
      title: e.title,
      subtitle: e.subtitle,
      slug: { current: e.slug },
      date: e.date,
      venue: e.venue,
      location: e.location,
      description: e.description,
      featured: !!e.featured,
      results: e.results,
      highlights: e.highlights,
      poster: {
        _type: 'imageBlock',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: e.title
      },
      fightCard: (e.fightCard ?? []).map((b) => ({
        _type: 'bout',
        _key: slugify(`${b.fighter1}-${b.fighter2}`),
        ...b
      }))
    });
    console.log(`  ✓ ${e.title}`);
  }

  console.log('→ Media items (uploading thumbnails)...');
  for (const m of mediaItems) {
    const asset = await uploadImage(m.thumbnail);
    await client.createOrReplace({
      _id: `mediaItem-${m.slug}`,
      _type: 'mediaItem',
      title: m.title,
      slug: { current: m.slug },
      category: { _type: 'reference', _ref: mediaCategoryIds[m.category] },
      duration: m.duration,
      views: m.views,
      publishedAt: new Date(m.date).toISOString(),
      description: m.description,
      featured: !!m.featured,
      video: { source: 'youtube', url: m.video },
      thumbnail: {
        _type: 'imageBlock',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: m.title
      }
    });
    console.log(`  ✓ ${m.title}`);
  }

  console.log('→ Partners...');
  for (const [i, p] of partners.entries()) {
    await client.createOrReplace({ _id: `partner-${slugify(p.name)}`, _type: 'partner', order: i, ...p });
  }

  console.log('→ Programs (uploading images)...');
  for (const [i, p] of programs.entries()) {
    const asset = await uploadImage(p.image);
    await client.createOrReplace({
      _id: `program-${slugify(p.title)}`,
      _type: 'program',
      order: i,
      title: p.title,
      icon: p.icon,
      description: p.description,
      features: p.features,
      cta: p.cta,
      ctaUrl: '/contact',
      image: {
        _type: 'imageBlock',
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        alt: p.title
      }
    });
    console.log(`  ✓ ${p.title}`);
  }

  console.log('\nDone. Open /studio to review each section.');
  console.log('Note: homePage, aboutPage, partnersPage, programsPage, and siteSettings');
  console.log('singletons still need their copy filled in manually in Studio — see');
  console.log('CHANGELOG-FULL-SITE.md for the full field list.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});