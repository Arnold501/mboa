<script lang="ts">
  import { onMount } from 'svelte';
  import { reveal, countUp } from '$lib/utils/animations';
  import AthleteCard from '$lib/components/AthleteCard.svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import MediaCard from '$lib/components/MediaCard.svelte';
  import ArticleCard from '$lib/components/newsroom/ArticleCard.svelte';
  import PartnerLogoTile from '$lib/components/PartnerLogoTile.svelte';
  import NewsletterSignup from '$lib/components/newsroom/NewsletterSignup.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const home = $derived(data.home ?? {});
  const partners = $derived(data.partners ?? []);

  let heroLoaded = $state(false);
  let scrollY = $state(0);

  onMount(() => {
    setTimeout(() => (heroLoaded = true), 100);
    const handleScroll = () => (scrollY = window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const heroBgUrl = $derived(
    home.heroBackgroundImage?.image
      ? urlFor(home.heroBackgroundImage.image)?.width(1600).height(1000).fit('crop').url()
      : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=1000&fit=crop&auto=format'
  );
  const aboutImgUrl = $derived(
    home.aboutImage?.image
      ? urlFor(home.aboutImage.image)?.width(1600).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&h=700&fit=crop'
  );
  const ctaBgUrl = $derived(
    home.ctaBackgroundImage?.image
      ? urlFor(home.ctaBackgroundImage.image)?.width(1600).height(600).fit('crop').url()
      : 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1600&h=600&fit=crop'
  );

  const MARQUEE_TARGET_LAP_TILES = 14;
  const MARQUEE_SECONDS_PER_TILE = 2.2;
  const MARQUEE_MIN_DURATION = 18;

  const marqueeRepeat = $derived(
    partners.length > 0 ? Math.max(1, Math.ceil(MARQUEE_TARGET_LAP_TILES / partners.length)) : 1
  );
  const marqueeLap = $derived(Array.from({ length: marqueeRepeat }).flatMap(() => partners));
  const marqueeItems = $derived([...marqueeLap, ...marqueeLap]);
  const marqueeDuration = $derived(
    Math.max(MARQUEE_MIN_DURATION, marqueeLap.length * MARQUEE_SECONDS_PER_TILE)
  );
</script>

<svelte:head>
  <title>MBOA Sports — Building Champions. Empowering Talents</title>
  <meta name="description" content="High-Performance Multi-Sport Organization. Discovering raw talent, developing elite athletes, and producing world champions from Africa to the world." />
</svelte:head>

<!-- ══════════════════ HERO SECTION ══════════════════ -->
<section class="relative min-h-screen flex items-center overflow-hidden hero-clip">
  <div class="absolute inset-0" style:transform="translateY({scrollY * 0.3}px)" style:will-change="transform">
    <img
      src={heroBgUrl}
      alt="MBOA Sports Hero"
      class="w-full h-full object-cover scale-110"
      style:filter="contrast(1.1) brightness(0.75)"
    />
  </div>

  <!-- Symmetric vignette  -->
  <div
    class="absolute inset-0"
    style:background="radial-gradient(ellipse 70% 62% at 50% 46%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.12) 100%)"
  ></div>
  <div class="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10"></div>

  <!-- Mirrored edge framing (was left-only before) -->
  <div class="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-transparent via-gold/60 to-transparent opacity-60"></div>
  <div class="absolute right-0 top-0 w-1 h-full bg-linear-to-b from-transparent via-gold/60 to-transparent opacity-60"></div>
  <div class="absolute left-10 lg:left-24 top-0 w-px h-full bg-linear-to-b from-gold/20 via-transparent to-transparent opacity-40 hidden lg:block"></div>
  <div class="absolute right-10 lg:right-24 top-0 w-px h-full bg-linear-to-b from-gold/20 via-transparent to-transparent opacity-40 hidden lg:block"></div>

  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
    <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
      <div
        class="flex items-center justify-center gap-4 mb-8 transition-all duration-1000"
        style:opacity={heroLoaded ? '1' : '0'}
        style:transform={heroLoaded ? 'translateY(0)' : 'translateY(20px)'}
      >
        <div class="w-8 h-px bg-(--gold)"></div>
        <span class="section-eyebrow mb-0">{home.heroEyebrow || 'High-Performance Multi-Sport Organization'}</span>
        <div class="w-8 h-px bg-(--gold)"></div>
      </div>

      <div
        class="overflow-hidden"
        style:transition="opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s"
        style:opacity={heroLoaded ? '1' : '0'}
        style:transform={heroLoaded ? 'translateY(0)' : 'translateY(60px)'}
      >
      
        <h1
          class="font-bebas leading-none text-white mb-4 flex flex-wrap items-baseline justify-center gap-x-5"
          style="text-shadow: 0 4px 28px rgba(0,0,0,0.55);"
        >
          <span class="text-[clamp(2rem,8vw,7.5rem)] tracking-wide">{home.heroHeadlineLine1 || 'MBOA'}</span>
          <span class="shimmer-text text-[clamp(2rem,8vw,7.5rem)] tracking-wide">{home.heroHeadlineLine2 || 'SPORTS'}</span>
        </h1>
      </div>

      <p
        class="font-poppins text-base md:text-lg text-white/65 leading-relaxed max-w-xl mx-auto mb-10"
        style="text-shadow: 0 2px 16px rgba(0,0,0,0.5);"
        style:transition="opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s"
        style:opacity={heroLoaded ? '1' : '0'}
        style:transform={heroLoaded ? 'translateY(0)' : 'translateY(30px)'}
      >
        {home.heroTagline || 'Discovering raw talent. Developing elite athletes. Producing world champions.'}
      </p>

      <div
        class="flex flex-wrap gap-4 justify-center"
        style:transition="opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s"
        style:opacity={heroLoaded ? '1' : '0'}
        style:transform={heroLoaded ? 'translateY(0)' : 'translateY(30px)'}
      >
        <a href={home.heroPrimaryCtaUrl || '/programs-hidden'} class="btn-primary">
          {home.heroPrimaryCtaLabel || 'Explore Programs'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
        <a href={home.heroSecondaryCtaUrl || '/media'} class="btn-outline">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4.5 2.5l7 4.5-7 4.5z"/>
          </svg>
          {home.heroSecondaryCtaLabel || 'Watch Highlights'}
        </a>
      </div>
    </div>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
    <span class="font-poppins text-[10px] tracking-widest text-white/40 uppercase">Scroll</span>
    <div class="w-px h-12 bg-linear-to-b from-gold to-transparent"></div>
  </div>
</section>

<!-- ══════════════════ STATS BAR ══════════════════ -->
{#if home.stats?.length}
<section class="bg-(--dark-gray) border-y border-light-gray/30 py-10">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-light-gray/30">
      {#each home.stats as stat}
        <div class="text-center md:px-10">
          <p class="stat-value" use:countUp={stat.value}>{stat.value}</p>
          <p class="stat-label">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ ABOUT PREVIEW ══════════════════ -->
<section class="py-24 md:py-32 relative overflow-hidden">
  <div class="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
    <div class="font-bebas text-[20vw] text-(--gold) leading-none select-none">MBOA</div>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div class="relative" use:reveal={{ direction: 'left' }}>
        <img src={aboutImgUrl} alt="MBOA Athletes Training" class="w-full h-80 md:h-120 object-cover" />
        <div class="absolute -bottom-6 -right-6 bg-(--gold) p-6 w-40 text-black">
          <p class="font-bebas text-4xl leading-none">{home.aboutBadgeValue || '12+'}</p>
          <p class="font-poppins text-xs font-semibold uppercase tracking-wide mt-1">{home.aboutBadgeLabel || 'Years Building Champions'}</p>
        </div>
        <div class="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-gold opacity-60"></div>
      </div>

      <div use:reveal={{ delay: 200 }}>
        <span class="section-eyebrow">{home.aboutEyebrow || 'About MBOA Sports'}</span>
        <h2 class="section-title mb-6">
          {home.aboutHeadingLine1 || 'Building Champions'}<br/>
          <span class="text-(--gold)-gradient">{home.aboutHeadingLine2 || 'From Africa to'}</span><br/>
          {home.aboutHeadingLine3 || 'the World'}
        </h2>
        <p class="font-poppins text-white/60 leading-relaxed mb-6">{home.aboutParagraph1}</p>
        <p class="font-poppins text-white/60 leading-relaxed mb-10">{home.aboutParagraph2}</p>
        <a href="/about" class="btn-outline">
          Our Story
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SYSTEM PILLARS ══════════════════ -->
{#if home.systemPillars?.length}
<section class="py-20 bg-(--dark-gray) relative overflow-hidden">
  <div class="absolute inset-0 opacity-5">
    <div class="h-full w-full" style:background="repeating-linear-gradient(45deg, #C8A96A 0px, #C8A96A 1px, transparent 1px, transparent 60px)"></div>
  </div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10 relative">
    <div class="text-center mb-16" use:reveal>
      <span class="section-eyebrow">Our System</span>
      <h2 class="section-title">The MBOA Framework</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      {#each home.systemPillars as pillar, i}
        <div class="group p-8 border border-light-gray/30 hover:border-gold/40 transition-all duration-500 relative overflow-hidden" use:reveal={{ delay: i * 150 }}>
          <div class="absolute inset-0 bg-(--gold) opacity-0 group-hover:opacity-3 transition-opacity duration-500 blur-xl"></div>
          <div class="relative">
            <div class="flex items-start justify-between mb-6">
              <span class="font-bebas text-6xl text-(--gold)/20 leading-none">{pillar.number}</span>
              <span class="text-2xl">{pillar.icon}</span>
            </div>
            <h3 class="font-bebas text-2xl text-white mb-3 group-hover:text-(--gold) transition-colors duration-200">{pillar.title}</h3>
            <p class="font-poppins text-sm text-white/50 leading-relaxed">{pillar.desc}</p>
          </div>
          <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-(--gold) group-hover:w-full transition-all duration-500"></div>
        </div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ ATHLETES SLIDER ══════════════════ -->
{#if data.featuredAthletes?.length}
<section class="py-24 md:py-32 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
    <div class="flex items-end justify-between" use:reveal>
      <div>
        <span class="section-eyebrow">Our Fighters</span>
        <h2 class="section-title">Featured Athletes</h2>
      </div>
      <a href="/athletes" class="btn-ghost hidden sm:flex">
        All Athletes
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
    </div>
  </div>
  <div class="px-6 lg:px-10 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.featuredAthletes as athlete, i}
        <div use:reveal={{ delay: i * 100 }}><AthleteCard {athlete} /></div>
      {/each}
    </div>
  </div>
  <div class="text-center mt-10">
    <a href="/athletes" class="btn-outline sm:hidden mx-auto">All Athletes</a>
  </div>
</section>
{/if}

<!-- ══════════════════ EVENTS PREVIEW ══════════════════ -->
{#if data.upcomingEvents?.length}
<section class="py-24 bg-off-black relative overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-end justify-between mb-12" use:reveal>
      <div>
        <span class="section-eyebrow">On the Calendar</span>
        <h2 class="section-title">Upcoming Events</h2>
      </div>
      <a href="/events" class="btn-ghost hidden sm:flex">
        All Events
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.upcomingEvents as event, i}
        <div use:reveal={{ delay: i * 120 }}><EventCard {event} variant="default" /></div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ MEDIA PREVIEW ══════════════════ -->
{#if data.featuredMedia?.length}
<section class="py-24 md:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-end justify-between mb-12" use:reveal>
      <div>
        <span class="section-eyebrow">Latest Content</span>
        <h2 class="section-title">MBOA Sports Media</h2>
      </div>
      <a href="/media" class="btn-ghost hidden sm:flex">
        All Videos
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each data.featuredMedia as item, i}
        <div use:reveal={{ delay: i * 80 }}><MediaCard {item} /></div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ NEWSROOM PREVIEW ══════════════════ -->
{#if data.latestNews?.length}
<section class="py-24 md:py-32 bg-(--dark-gray)">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-end justify-between mb-12" use:reveal>
      <div>
        <span class="section-eyebrow">From the Newsroom</span>
        <h2 class="section-title">Latest Headlines</h2>
      </div>
      <a href="/newsroom" class="btn-ghost hidden sm:flex">All Articles</a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.latestNews as post, i (post._id)}
        <div use:reveal={{ delay: i * 100 }}><ArticleCard {post} /></div>
      {/each}
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ WELLNESS SECTION ══════════════════ -->
{#if home.wellnessPillars?.length}
<section class="py-24 bg-(--dark-gray) relative overflow-hidden">
  <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-(--gold)/5 blur-3xl"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div use:reveal>
        <span class="section-eyebrow">{home.wellnessEyebrow || 'Athlete Wellbeing'}</span>
        <h2 class="section-title mb-6">{home.wellnessHeading}</h2>
        <p class="font-poppins text-white/55 leading-relaxed">{home.wellnessParagraph}</p>
      </div>
      <div class="grid grid-cols-2 gap-5">
        {#each home.wellnessPillars as pillar, i}
          <div class="p-6 border border-light-gray/30 hover:border-gold/30 transition-all duration-300 group" use:reveal={{ delay: i * 100 }}>
            <span class="text-3xl mb-4 block">{pillar.icon}</span>
            <h4 class="font-bebas text-lg text-white mb-2 group-hover:text-(--gold) transition-colors">{pillar.title}</h4>
            <p class="font-poppins text-xs text-white/45 leading-relaxed">{pillar.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ PARTNERS ══════════════════ -->
{#if partners.length}
<section class="py-10 md:py-12 bg-(--dark-gray) border-y border-light-gray/30 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-col md:flex-row md:items-center gap-5 md:gap-14">
      <span class="shrink-0 font-poppins text-[11px] font-semibold tracking-widest text-white/40 uppercase">
        Trusted By Leaders Across African Sport
      </span>

      <div class="marquee-container flex-1 min-w-0">
        <div class="marquee-track" style:animation-duration="{marqueeDuration}s">
          {#each marqueeItems as partner, i (i)}
            {#if partner.website}
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                class="group shrink-0 mx-5 h-8 flex items-center"
                aria-label={partner.name}
              >
                <PartnerLogoTile {partner} />
              </a>
            {:else}
              <div class="group shrink-0 mx-5 h-8 flex items-center" aria-label={partner.name}>
                <PartnerLogoTile {partner} />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- ══════════════════ NEWSLETTER ══════════════════ -->
<NewsletterSignup
  heading={data.siteSettings?.newsletter?.heading}
  subtext={data.siteSettings?.newsletter?.subtext}
/>

<!-- ══════════════════ FINAL CTA BANNER ══════════════════ -->
<section class="relative overflow-hidden py-32">
  <div class="absolute inset-0">
    <img src={ctaBgUrl} alt="Join the Movement" class="w-full h-full object-cover" style:filter="brightness(0.25)" />
    <div class="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/50"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
    <div use:reveal>
      <span class="section-eyebrow">{home.ctaEyebrow || 'The Movement Continues'}</span>
      <h2 class="font-bebas text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
        {home.ctaHeading || 'Join the Movement'}
      </h2>
      <p class="font-poppins text-white/55 text-base md:text-lg max-w-xl mx-auto mb-10">
        {home.ctaParagraph || "Whether you're an athlete, a coach, a partner, or a fan — there's a place for you in the MBOA family."}
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/community" class="btn-primary">Explore Community</a>
        <a href="/contact" class="btn-outline">Partner With Us</a>
        <a href="/athletes" class="btn-ghost">Meet the Athletes</a>
      </div>
    </div>
  </div>
</section>