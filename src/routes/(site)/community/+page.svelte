<script lang="ts">
  import { goto } from '$app/navigation';
  import { reveal } from '$lib/utils/animations';
  import PageHero from '$lib/components/PageHero.svelte';
  import PortableTextRenderer from '$lib/components/portableText/PortableTextRenderer.svelte';
  import { urlFor } from '$lib/sanity/image';
  // import type { PageProps } from './$types';

  const { data }: any = $props();
  const page = $derived(data.page ?? {});

  const hero = $derived(page.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=700&fit=crop'
  );

  type ProgramFilter = 'all' | 'latest' | 'past';
  let activeFilter = $derived<ProgramFilter>(data.pastCurrentPage > 1 ? 'past' : 'all');

  const totalProgramCount = $derived(data.latestPrograms.length + data.pastTotalCount);

  const formatUrl = (url: any) => {
    if (!url) return '/';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  /* ── Search / Month / Sort — server-side, combined with the toggle above ── */

  const SORT_OPTIONS: { value: string; label: string }[] = [
    { value: 'manual', label: 'Featured Order' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A – Z' },
    { value: 'za', label: 'Z – A' }
  ];

  const monthOptions = $derived(
    (data.availableMonths as string[]).map((m) => {
      const [y, mo] = m.split('-').map(Number);
      return {
        value: m,
        label: new Date(y, mo - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
    })
  );

  let searchInput = $derived(data.filters.q as string);
  let selectedMonth = $derived(data.filters.month as string);
  let selectedSort = $derived(data.filters.sort as string);

  // Keep the controls in sync if `data` changes from outside our own goto
  // calls below (e.g. browser Back/Forward). Harmless no-op the rest of the time.
  $effect(() => {
    searchInput = data.filters.q;
    selectedMonth = data.filters.month;
    selectedSort = data.filters.sort;
  });

  let searchDebounceTimer: ReturnType<typeof setTimeout>;

  function applyFilters(next: Partial<{ q: string; month: string; sort: string }>) {
    const merged = { q: searchInput, month: selectedMonth, sort: selectedSort, ...next };
    const url = new URL(window.location.href);

    if (merged.q) url.searchParams.set('q', merged.q);
    else url.searchParams.delete('q');

    if (merged.month) url.searchParams.set('month', merged.month);
    else url.searchParams.delete('month');

    if (merged.sort && merged.sort !== 'manual') url.searchParams.set('sort', merged.sort);
    else url.searchParams.delete('sort');

    url.searchParams.delete('p'); // filters changed → the archived page range is no longer valid

    goto(`${url.pathname}${url.search}`, { replaceState: true, keepFocus: true, noScroll: true });
  }

  function onSearchInput(value: string) {
    searchInput = value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => applyFilters({ q: value }), 400);
  }

  function onMonthChange(value: string) {
    selectedMonth = value;
    applyFilters({ month: value });
  }

  function onSortChange(value: string) {
    selectedSort = value;
    applyFilters({ sort: value });
  }

  function pastPageHref(targetPage: number) {
    const qs = new URLSearchParams();
    if (data.filters.q) qs.set('q', data.filters.q);
    if (data.filters.month) qs.set('month', data.filters.month);
    if (data.filters.sort && data.filters.sort !== 'manual') qs.set('sort', data.filters.sort);
    qs.set('p', String(targetPage));
    return `/community?${qs.toString()}`;
  }
</script>

<svelte:head>
  <title>{hero?.title || 'Programs'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Elite athlete development, private coaching, gym partnerships, and coaching education programs at MBOA Sports.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Programs'}
  subtitle={hero?.subtitle || 'Elite training systems designed to take athletes from raw potential to world championship level.'}
  eyebrow={hero?.eyebrow || 'Training & Development'}
  image={heroImgUrl}
/>

<!-- Shared per-program card — identical rendering for both Latest and Past
     so "the design and way of listing stays the same," just split across
     two sections instead of one long list. -->
{#snippet programBlock(program: any, i: number)}
  {@const imgUrl = program.image?.image ? urlFor(program.image.image)?.width(800).height(600).fit('crop').url() : null}
  <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" class:lg:flex-row-reverse={i % 2 !== 0}>
    <div class="relative" class:lg:order-2={i % 2 !== 0} use:reveal={{ direction: i % 2 === 0 ? 'left' : 'right' }}>
      {#if imgUrl}
        <img src={imgUrl} alt={program.image?.alt ?? program.title} class="w-full h-72 md:h-105 object-cover" />
      {/if}
      <div class="absolute -top-4 -right-4 w-16 h-16 bg-gold flex items-center justify-center">
        <span class="font-bebas text-black text-3xl leading-none">0{i + 1}</span>
      </div>
      <div class="absolute -bottom-4 -left-4 w-20 h-20 border-l-2 border-b-2 border-gold/50"></div>
      {#if program.status === 'archived'}
        <div class="absolute top-4 left-4 bg-black/80 border border-white/20 px-3 py-1.5">
          <span class="font-poppins text-[10px] font-semibold tracking-widest text-white/60 uppercase">Past Program</span>
        </div>
      {/if}
    </div>

    <div class:lg:order-1={i % 2 !== 0} use:reveal={{ delay: 150 }}>
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">{program.icon}</span>
        <span class="section-eyebrow mb-0">Program {String(i + 1).padStart(2, '0')}</span>
      </div>
      <h2 class="section-title-sm mb-5">{program.title}</h2>
      <p class="font-poppins text-white/60 leading-relaxed mb-6">{program.description}</p>

      {#if program.details}
        <div class="mb-6"><PortableTextRenderer value={program.details} /></div>
      {/if}

      {#if program.features?.length}
        <div class="grid grid-cols-2 gap-2 mb-8">
          {#each program.features as feature}
            <div class="flex items-start gap-2">
              <span class="text-gold mt-0.5 shrink-0 text-xs">✦</span>
              <span class="font-poppins text-xs text-white/60">{feature}</span>
            </div>
          {/each}
        </div>
      {/if}

      <a href={formatUrl(program.ctaUrl) || '/contact'} class="btn-primary">
        {program.cta || 'Apply Now'}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>
    </div>
  </div>
{/snippet}

<!-- ── Programs overview intro ── -->
<section class="pt-24 md:pt-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="text-center mb-4" use:reveal>
      <span class="section-eyebrow">What We Offer</span>
      <h2 class="section-title">Our Programs</h2>
    </div>
  </div>
</section>

<!-- ── Filter ── -->
<section class="py-8 bg-dark-gray border-y border-light-gray/30 sticky top-20 z-30 mt-12">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Existing All / Latest / Past toggle — unchanged, same place -->
      <div class="flex items-center gap-3 overflow-x-auto pb-1">
        <span class="font-poppins text-xs text-white/30 tracking-widest uppercase shrink-0 mr-2">Filter:</span>

        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          style:background={activeFilter === 'all' ? '#C8A96A' : 'transparent'}
          style:color={activeFilter === 'all' ? '#000' : 'rgba(255,255,255,0.5)'}
          style:border-color={activeFilter === 'all' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
          onclick={() => (activeFilter = 'all')}
        >
          All Programs
          <span class="ml-1.5 text-[10px] opacity-60">({totalProgramCount})</span>
        </button>

        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          style:background={activeFilter === 'latest' ? '#C8A96A' : 'transparent'}
          style:color={activeFilter === 'latest' ? '#000' : 'rgba(255,255,255,0.5)'}
          style:border-color={activeFilter === 'latest' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
          onclick={() => (activeFilter = 'latest')}
        >
          Latest
          <span class="ml-1.5 text-[10px] opacity-60">({data.latestPrograms.length})</span>
        </button>

        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          style:background={activeFilter === 'past' ? '#C8A96A' : 'transparent'}
          style:color={activeFilter === 'past' ? '#000' : 'rgba(255,255,255,0.5)'}
          style:border-color={activeFilter === 'past' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
          onclick={() => (activeFilter = 'past')}
        >
          Past
          <span class="ml-1.5 text-[10px] opacity-60">({data.pastTotalCount})</span>
        </button>
      </div>

      <!-- NEW: Search / Month / Sort — combined with the toggle above, applies to both sections -->
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative">
          <input
            type="text"
            value={searchInput}
            oninput={(e) => onSearchInput(e.currentTarget.value)}
            placeholder="Search"
            aria-label="Search programs"
            class="bg-transparent border border-light-gray/20 pl-4 pr-9 py-2 font-poppins text-xs tracking-widest uppercase text-white/70 placeholder:text-white/30 focus:outline-none focus:border-gold/60 w-full sm:w-48"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        <div class="relative">
          <select
            value={selectedMonth}
            onchange={(e) => onMonthChange(e.currentTarget.value)}
            aria-label="Filter by month"
            class="appearance-none bg-transparent border border-light-gray/20 pl-4 pr-8 py-2 font-poppins text-xs tracking-widest uppercase text-white/70 focus:outline-none focus:border-gold/60 cursor-pointer"
          >
            <option value="" class="bg-black text-white">Month</option>
            {#each monthOptions as opt (opt.value)}
              <option value={opt.value} class="bg-black text-white">{opt.label}</option>
            {/each}
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="relative">
          <select
            value={selectedSort}
            onchange={(e) => onSortChange(e.currentTarget.value)}
            aria-label="Sort programs"
            class="appearance-none bg-transparent border border-light-gray/20 pl-4 pr-8 py-2 font-poppins text-xs tracking-widest uppercase text-gold focus:outline-none focus:border-gold/60 cursor-pointer"
          >
            {#each SORT_OPTIONS as opt (opt.value)}
              <option value={opt.value} class="bg-black text-white">{opt.label}</option>
            {/each}
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60" width="10" height="10" viewBox="0 0 14 14" fill="none">
            <path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── Latest Programs ── -->
{#if activeFilter === 'all' || activeFilter === 'latest'}
  <section class="py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="mb-14" use:reveal>
        <span class="section-eyebrow">Currently Running</span>
        <h2 class="section-title-sm">Latest Programs</h2>
      </div>

      {#if data.latestPrograms.length === 0}
        <div class="py-20 text-center border border-light-gray/20">
          <p class="font-bebas text-3xl text-white/20">No active programs match your filters</p>
          <p class="font-poppins text-sm text-white/30 mt-2">Try clearing the search or month filter, or browse our past programs below</p>
        </div>
      {:else}
        <div class="space-y-24">
          {#each data.latestPrograms as program, i}
            {@render programBlock(program, i)}
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}

{#if activeFilter === 'all'}
  <div class="divider-gold max-w-7xl mx-auto px-6 lg:px-10"></div>
{/if}

<!-- ── Past Programs ── -->
{#if activeFilter === 'all' || activeFilter === 'past'}
  <section class="pb-24 md:pb-32" class:pt-16={activeFilter === 'past'} class:md:pt-20={activeFilter === 'past'}>
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="mb-14" use:reveal>
        <span class="section-eyebrow">Program Archive</span>
        <h2 class="section-title-sm">Past Programs</h2>
      </div>

      {#if data.pastPrograms.length === 0}
        <div class="py-20 text-center border border-light-gray/20">
          <p class="font-bebas text-3xl text-white/20">No past programs match your filters</p>
          <p class="font-poppins text-sm text-white/30 mt-2">Try clearing the search or month filter</p>
        </div>
      {:else}
        <div class="space-y-24">
          {#each data.pastPrograms as program, i}
            {@render programBlock(program, i)}
          {/each}
        </div>

        {#if data.pastTotalPages > 1}
          <div class="flex items-center justify-center gap-4 mt-16">
            {#if data.pastCurrentPage > 1}
              <a href={pastPageHref(data.pastCurrentPage - 1)} class="btn-outline text-xs">Previous</a>
            {/if}
            <span class="font-poppins text-xs text-white/40 tracking-widest uppercase">
              Page {data.pastCurrentPage} of {data.pastTotalPages}
            </span>
            {#if data.pastCurrentPage < data.pastTotalPages}
              <a href={pastPageHref(data.pastCurrentPage + 1)} class="btn-outline text-xs">Next</a>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
  </section>
{/if}

<!-- ── Stats bar ── -->
{#if page.statsBar?.length}
<section class="py-16 bg-gold text-black" use:reveal>
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {#each page.statsBar as stat}
        <div>
          <p class="font-bebas text-5xl md:text-6xl text-black leading-none">{stat.value}</p>
          <p class="font-poppins text-xs font-semibold uppercase tracking-widest text-black/60 mt-1">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
{/if}