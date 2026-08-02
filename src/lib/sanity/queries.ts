import { defineQuery } from '@sanity/sveltekit';

/** Shared projection for anywhere a post is shown as a card/teaser. */
const postCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  featured,
  "category": category->{title, "slug": slug.current, accentColor},
  "author": author->{name, "slug": slug.current, avatar}
}`;

/** Paginated, optionally category-filtered list of published articles. */
export const postsQuery = defineQuery(`
  *[_type == "post" && publishedAt <= now() && (!defined($category) || category->slug.current == $category)]
    | order(publishedAt desc) [$start...$end] ${postCardProjection}
`);

export const postsCountQuery = defineQuery(`
  count(*[_type == "post" && publishedAt <= now() && (!defined($category) || category->slug.current == $category)])
`);

/** Pinned/featured stories for the Newsroom hero and homepage "Latest News" section. */
export const featuredPostsQuery = defineQuery(`
  *[_type == "post" && publishedAt <= now() && featured == true]
    | order(pinnedOrder asc, publishedAt desc) [0...4] ${postCardProjection}
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    description,
    accentColor,
    "postCount": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
  }
`);

/** Full article by slug. `body[]` resolves file assets on video blocks so the
 *  player can read a direct URL without a second round-trip. */
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    publishedAt,
    tags,
    seo,
    coverImage,
    coverVideo,
    body[]{
      ...,
      _type == "videoEmbed" => { "file": file.asset->{url} }
    },
    "category": category->{_id, title, "slug": slug.current, accentColor},
    "author": author->{name, "slug": slug.current, avatar, role, bio, socialLinks},
    "relatedManual": relatedPosts[]-> ${postCardProjection}
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && publishedAt <= now() && category._ref == $categoryId && _id != $excludeId]
    | order(publishedAt desc) [0...3] ${postCardProjection}
`);

export const authorBySlugQuery = defineQuery(`
  *[_type == "author" && slug.current == $slug][0]{
    name, role, bio, avatar, socialLinks, "slug": slug.current
  }
`);

export const postsByAuthorQuery = defineQuery(`
  *[_type == "post" && publishedAt <= now() && author->slug.current == $slug]
    | order(publishedAt desc) ${postCardProjection}
`);

/* ────────────────────────────  ATHLETES  ──────────────────────────── */

/** Shared projection for athlete cards (roster grid, homepage, related). */
const athleteCardProjection = `{
  _id,
  name,
  slug,
  nickname,
  record,
  division,
  nationality,
  bio,
  featured,
  image,
  "category": category->{title, "slug": slug.current},
  "hasHighlight": defined(highlightVideo.source)
}`;

/** Full roster — small enough to fetch in one call; filtering happens
 *  client-side (identical UX to the original static-data implementation). */
export const athletesQuery = defineQuery(`
  *[_type == "athlete"] | order(featured desc, name asc) ${athleteCardProjection}
`);

export const sportCategoriesQuery = defineQuery(`
  *[_type == "sportCategory"] | order(order asc, title asc) {
    title,
    "slug": slug.current,
    description,
    "athleteCount": count(*[_type == "athlete" && references(^._id)])
  }
`);

export const featuredAthletesQuery = defineQuery(`
  *[_type == "athlete" && featured == true] | order(name asc) [0...3] ${athleteCardProjection}
`);

/** Athletes with a highlight video set — powers the "Fight Highlights"
 *  strip on the Athletes listing page. */
export const athletesWithHighlightsQuery = defineQuery(`
  *[_type == "athlete" && defined(highlightVideo.source)] | order(name asc) [0...8] {
    name, "slug": slug.current, image, highlightCaption,
    "category": category->{title}
  }
`);

export const athleteBySlugQuery = defineQuery(`
  *[_type == "athlete" && slug.current == $slug][0]{
    _id,
    name,
    nickname,
    division,
    nationality,
    height,
    weight,
    age,
    record,
    bio,
    bioLong,
    tags,
    fightHistory,
    achievements,
    image,
    heroImage,
    cutoutImage,
    highlightCaption,
    seo,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    highlightVideo{
      ...,
      "file": file.asset->{url}
    }
  }
`);


/* ────────────────────────────  EVENTS  ──────────────────────────── */

const eventCardProjection = `{
  _id, title, subtitle, "slug": slug.current, date, venue, location, poster, heroImage, ticketUrl, featured,
  "isUpcoming": dateTime(date) >= dateTime(now())
}`;

export const upcomingEventsQuery = defineQuery(`
  *[_type == "event" && dateTime(date) >= dateTime(now())] | order(date asc) ${eventCardProjection}
`);

export const upcomingEventsPreviewQuery = defineQuery(`
  *[_type == "event" && dateTime(date) >= dateTime(now())] | order(date asc) [0...3] ${eventCardProjection}
`);

export const pastEventsQuery = defineQuery(`
  *[_type == "event" && dateTime(date) < dateTime(now())] | order(date desc) ${eventCardProjection}
`);

export const featuredEventsQuery = defineQuery(`
  *[_type == "event" && featured == true] | order(date asc) [0...3] ${eventCardProjection}
`);

export const eventBySlugQuery = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, subtitle, "slug": slug.current, date, venue, location, description,
    poster, heroImage, ticketUrl, fightCard, results, seo,
    "isUpcoming": dateTime(date) >= dateTime(now()),
    highlights{
      ...,
      "file": file.asset->{url}
    }
  }
`);

/* ─────────────────────────────  MEDIA  ──────────────────────────── */

const mediaCardProjection = `{
  _id, title, "slug": slug.current, mediaType, duration, views, publishedAt, description, featured, thumbnail, photos,
  "category": category->{title, "slug": slug.current},
  video{ ..., "file": file.asset->{url} }
}`;

export const mediaItemsQuery = defineQuery(`
  *[_type == "mediaItem"] | order(publishedAt desc) ${mediaCardProjection}
`);

export const mediaCategoriesQuery = defineQuery(`
  *[_type == "mediaCategory"] | order(order asc, title asc) {
    title,
    "slug": slug.current,
    "itemCount": count(*[_type == "mediaItem" && references(^._id)])
  }
`);

export const mediaPreviewQuery = defineQuery(`
  *[_type == "mediaItem"] | order(publishedAt desc) [0...6] ${mediaCardProjection}
`);

/* ───────────────────────────  PARTNERS  ─────────────────────────── */

export const partnersQuery = defineQuery(`
  *[_type == "partner"] | order(order asc, name asc) { name, tier, logo, description, website }
`);

/* ───────────────────────────  PROGRAMS (Community page)  ────────── */
const programCardProjection = `{
  title, status, icon, description, details, features, image, cta, ctaUrl, date
}`;

const PROGRAM_FILTERS = `
  (!defined($search) || [title, description] match $search)
  && (!defined($monthStart) || (date >= $monthStart && date <= $monthEnd))
`;

export const latestProgramsQuery = defineQuery(`
  *[_type == "program" && status != "archived" && ${PROGRAM_FILTERS}] | order(order asc) ${programCardProjection}
`);
export const latestProgramsQueryNewest = defineQuery(`
  *[_type == "program" && status != "archived" && ${PROGRAM_FILTERS}] | order(date desc) ${programCardProjection}
`);
export const latestProgramsQueryOldest = defineQuery(`
  *[_type == "program" && status != "archived" && ${PROGRAM_FILTERS}] | order(date asc) ${programCardProjection}
`);
export const latestProgramsQueryAZ = defineQuery(`
  *[_type == "program" && status != "archived" && ${PROGRAM_FILTERS}] | order(lower(title) asc) ${programCardProjection}
`);
export const latestProgramsQueryZA = defineQuery(`
  *[_type == "program" && status != "archived" && ${PROGRAM_FILTERS}] | order(lower(title) desc) ${programCardProjection}
`);

export const pastProgramsQuery = defineQuery(`
  *[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}] | order(order asc) [$start...$end] ${programCardProjection}
`);
export const pastProgramsQueryNewest = defineQuery(`
  *[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}] | order(date desc) [$start...$end] ${programCardProjection}
`);
export const pastProgramsQueryOldest = defineQuery(`
  *[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}] | order(date asc) [$start...$end] ${programCardProjection}
`);
export const pastProgramsQueryAZ = defineQuery(`
  *[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}] | order(lower(title) asc) [$start...$end] ${programCardProjection}
`);
export const pastProgramsQueryZA = defineQuery(`
  *[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}] | order(lower(title) desc) [$start...$end] ${programCardProjection}
`);

export const pastProgramsCountQuery = defineQuery(`
  count(*[_type == "program" && status == "archived" && ${PROGRAM_FILTERS}])
`);

export const programMonthsQuery = defineQuery(`
  array::unique(*[_type == "program" && defined(date)].date[0..6])
`);

export const programsPageQuery = defineQuery(`
  *[_type == "programsPage"][0]{
    hero, statsBar, applyCtaHeadingLine1, applyCtaHeadingLine2, applyCtaParagraph
  }
`);


/* ─────────────────────  SIMPLE PAGE-HERO SINGLETONS  ─────────────── */

export const newsroomPageQuery = defineQuery(`*[_type == "newsroomPage"][0]`);
export const athletesPageQuery = defineQuery(`*[_type == "athletesPage"][0]`);
export const eventsPageQuery = defineQuery(`*[_type == "eventsPage"][0]`);
export const mediaPageQuery = defineQuery(`*[_type == "mediaPage"][0]`);
export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]`);

/* ─────────────────────────  HOME / ABOUT PAGES  ─────────────────── */

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]
`);

/* ───────────────────────────  SITE SETTINGS  ────────────────────── */

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]
`);

/* ─────────────────────────────  STORE  ──────────────────────────── */

const productCardProjection = `{
  _id, name, "slug": slug.current, price, currency, sizes,
  "coverImage": images[0],
  "category": category->{title, "slug": slug.current},
  "inStockSomewhere": count(availability[status == "inStock"]) > 0
}`;

export const productsQuery = defineQuery(`
  *[_type == "product"] | order(name asc) ${productCardProjection}
`);

export const productCategoriesQuery = defineQuery(`
  *[_type == "productCategory"] | order(order asc, title asc) {
    title,
    "slug": slug.current,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`);

export const storePageQuery = defineQuery(`*[_type == "storePage"][0]`);


export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    _id, name, description, price, currency, sizes, images, seo,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    "availableAt": availability[status == "inStock"].store->{
      _id, name, address, city, phone, whatsapp, email, hours, mapUrl, image
    }
  }
`);