<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import AthleteCard from '$lib/components/AthleteCard.svelte';
  import AthleteHighlightCard from '$lib/components/AthleteHighlightCard.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  // Same instant, client-side filtering UX as before — just backed by
  // Sanity data instead of the static mock array.
  let activeCategory = $state('All');
  let filtered = $derived(
    activeCategory === 'All'
      ? data.athletes
      : data.athletes.filter((a: { category: { slug: string; }; }) => a.category?.slug === activeCategory)
  );

  const hero = $derived(data.page?.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=1400&h=700&fit=crop'
  );
</script>

<svelte:head>
  <title>{hero?.title || 'Athletes'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Meet the MBOA Sports roster — elite MMA fighters, kickboxers, rising prospects, and world-class coaches.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Athletes'}
  subtitle={hero?.subtitle || 'The elite fighters, rising prospects, and world-class coaches of MBOA Sports.'}
  eyebrow={hero?.eyebrow || 'Our Roster'}
  image={heroImgUrl}
/>

<!-- ── Fight Highlights strip ── -->
{#if data.highlights?.length}
  <section class="py-16 bg-(--dark-gray) border-b border-light-gray/30 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 mb-8" use:reveal>
      <span class="section-eyebrow">Fight Highlights</span>
      <h2 class="section-title-sm">Watch Them In Action</h2>
    </div>
    <div class="flex gap-5 overflow-x-auto px-6 lg:px-10 pb-2 scrollbar-hide">
      {#each data.highlights as athlete, i (athlete.slug)}
        <div use:reveal={{ delay: i * 80 }}>
          <AthleteHighlightCard {athlete} />
        </div>
      {/each}
    </div>
  </section>
{/if}

<!-- ── Filters ── -->
<section class="py-10 bg-dark-gray border-b border-light-gray/30 sticky top-20 z-30">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
      <span class="font-poppins text-xs text-white/30 tracking-widest uppercase shrink-0 mr-2">Filter:</span>
      <button
        class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
        class:bg-gold={activeCategory === 'All'}
        class:text-black={activeCategory === 'All'}
        class:border-gold={activeCategory === 'All'}
        class:font-bold={activeCategory === 'All'}
        class:border-light-gray-30={activeCategory !== 'All'}
        class:text-white-50={activeCategory !== 'All'}
        onclick={() => (activeCategory = 'All')}
      >
        All
        <span class="ml-1.5 text-[10px] opacity-60">({data.athletes.length})</span>
      </button>
      {#each data.categories as cat}
        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          class:bg-gold={activeCategory === cat.slug}
          class:text-black={activeCategory === cat.slug}
          class:border-gold={activeCategory === cat.slug}
          class:font-bold={activeCategory === cat.slug}
          class:border-light-gray-30={activeCategory !== cat.slug}
          class:text-white-50={activeCategory !== cat.slug}
          onclick={() => (activeCategory = cat.slug)}
        >
          {cat.title}
          <span class="ml-1.5 text-[10px] opacity-60">({cat.athleteCount})</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- ── Grid ── -->
<section class="py-20 md:py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    {#if filtered.length === 0}
      <div class="text-center py-20">
        <p class="font-bebas text-4xl text-white/20">No athletes found</p>
      </div>
    {:else}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filtered as athlete, i (athlete.slug)}
          <div use:reveal={{ delay: (i % 4) * 80 }}>
            <AthleteCard {athlete} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- ── Recruitment CTA ── -->
<section class="py-20 bg-dark-gray border-t border-light-gray/30 text-center">
  <div class="max-w-xl mx-auto px-6" use:reveal>
    <span class="section-eyebrow">Join the Roster</span>
    <h2 class="section-title-sm mb-5">Think You Have<br/><span class="text-gold-gradient">What It Takes?</span></h2>
    <p class="font-poppins text-sm text-white/50 mb-8">
      We're always scouting for exceptional talent. If you're a dedicated fighter with championship aspirations, we want to hear from you.
    </p>
    <a href="/contact" class="btn-primary mx-auto inline-flex">
      Submit Your Profile
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </a>
  </div>
</section>
