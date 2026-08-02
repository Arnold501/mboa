<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import { urlFor } from '$lib/sanity/image';
  import PortableTextRenderer from '$lib/components/portableText/PortableTextRenderer.svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const athlete = $derived(data.athlete);

  const heroSource = $derived(athlete.heroImage?.image ?? athlete.image?.image);
  const heroAlt = $derived(athlete.heroImage?.alt ?? athlete.image?.alt ?? athlete.name);
  const heroUrl = $derived(heroSource ? urlFor(heroSource)?.width(1600).height(900).fit('crop').url() : null);
  const profileUrl = $derived(athlete.image?.image ? urlFor(athlete.image.image)?.width(700).height(900).fit('crop').url() : null);

  // Cutout render (transparent PNG), shown large in the hero. This is
  // additive only — when no cutoutImage is uploaded, the hero renders
  // exactly as it did before this feature existed (no fallback image,
  // no frame, nothing extra).
  const cutoutUrl = $derived(athlete.cutoutImage?.asset ? urlFor(athlete.cutoutImage)?.width(900).url() : null);
</script>

<svelte:head>
  <title>{athlete.name} — MBOA Sports Athlete</title>
  <meta name="description" content="{athlete.seo?.metaDescription || `${athlete.name}, ${athlete.division} fighter. Record: ${athlete.record || 'N/A'}. ${athlete.bio.substring(0, 120)}`}" />
</svelte:head>

<!-- ── Hero ── -->
<section class="relative min-h-[80vh] flex items-end overflow-hidden">
  <div class="absolute inset-0">
    {#if heroUrl}
      <img src={heroUrl} alt={heroAlt} class="w-full h-full object-cover" />
    {/if}
    <div class="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
    <div class="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent"></div>
  </div>

  <!-- Cutout render — rises up from the bottom of the hero, overlapping
       above where the division/nationality line sits, for a dramatic
       stands-out effect. Sized to clear the fixed nav bar. Hidden on
       small screens to protect legibility. Purely additive: nothing
       renders here at all when no cutoutImage is uploaded. -->
  {#if cutoutUrl}
    <div class="absolute right-0 sm:right-6 lg:right-16 bottom-0 h-[72%] md:h-[82%] z-5 pointer-events-none select-none hidden sm:flex items-end">
      <img
        src={cutoutUrl}
        alt={athlete.name}
        class="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
      />
    </div>
  {/if}

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full">
    <a href="/athletes" class="inline-flex items-center gap-2 font-poppins text-xs text-white/40 hover:text-(--gold) transition-colors mb-8 tracking-wider uppercase">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      All Athletes
    </a>
    <div class="flex flex-wrap gap-2 mb-5">
      {#each athlete.tags ?? [] as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
    {#if athlete.nickname}
      <p class="font-poppins text-(--gold) italic text-sm mb-2">"{athlete.nickname}"</p>
    {/if}
    <h1 class="font-bebas text-6xl md:text-9xl leading-none text-white mb-2">{athlete.name}</h1>
    <p class="font-poppins text-white/60 text-lg">{athlete.division} · {athlete.nationality}</p>
  </div>
</section>

<!-- ── Stats Panel ── -->
<section class="bg-(--dark-gray) border-y border-light-gray/30 py-10">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-light-gray/30">
      {#each [
        { label: 'Record', value: athlete.record || 'N/A' },
        { label: 'Division', value: athlete.division.split(' ')[0] },
        { label: 'Height', value: athlete.height || 'N/A' },
        { label: 'Nationality', value: athlete.nationality },
      ] as stat}
        <div class="text-center sm:px-8">
          <p class="stat-value text-4xl md:text-5xl">{stat.value}</p>
          <p class="stat-label">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Fight Highlights ── -->
{#if athlete.highlightVideo?.source}
  <section id="highlights" class="py-20 md:py-24 scroll-mt-24">
    <div class="max-w-5xl mx-auto px-6 lg:px-10">
      <div use:reveal>
        <span class="section-eyebrow">Fight Highlights</span>
        <h2 class="section-title-sm mb-8">Watch {athlete.name.split(' ')[0]} In Action</h2>
      </div>
      <VideoPlayer value={athlete.highlightVideo} caption={athlete.highlightCaption} />
    </div>
  </section>
{/if}

<!-- ── Content ── -->
<section class="py-20 md:py-28">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-3 gap-16">

      <!-- Left: Bio -->
      <div class="lg:col-span-2 space-y-12">
        <!-- Biography -->
        <div use:reveal>
          <span class="section-eyebrow">Biography</span>
          <p class="font-poppins text-white/65 leading-relaxed text-lg mb-4">{athlete.bio}</p>
          {#if athlete.bioLong}
            <PortableTextRenderer value={athlete.bioLong} />
          {/if}
        </div>

        <!-- Fight History -->
        {#if athlete.fightHistory && athlete.fightHistory.length > 0}
          <div use:reveal={{ delay: 100 }}>
            <span class="section-eyebrow">Fight Record</span>
            <h3 class="section-title-sm mb-6">Fight History</h3>
            <div class="space-y-3">
              {#each athlete.fightHistory as fight}
                <div class="flex items-center gap-4 p-4 bg-(--dark-gray) border border-light-gray/30 hover:border-gold/20 transition-colors">
                  <div
                    class="w-8 h-8 flex items-center justify-center font-bebas text-lg font-bold shrink-0"
                    style:background={fight.result === 'W' ? '#C8A96A' : fight.result === 'L' ? '#2A2A2A' : '#1A1A1A'}
                    style:color={fight.result === 'W' ? '#000' : '#999'}
                  >
                    {fight.result}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-montserrat font-semibold text-sm text-white">vs. {fight.opponent}</p>
                    <p class="font-poppins text-xs text-white/40">{fight.event}</p>
                  </div>
                  <div class="text-right hidden sm:block">
                    <p class="font-poppins text-xs text-(--gold)">{fight.method}</p>
                    <p class="font-poppins text-xs text-white/40">
                      {fight.round ? `Round ${fight.round} · ` : ''}{fight.date ?? ''}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Right: Sidebar -->
      <div class="space-y-8" use:reveal={{ delay: 200 }}>
        <!-- Profile image -->
        <div class="relative">
          {#if profileUrl}
            <img src={profileUrl} alt={athlete.image?.alt ?? athlete.name} class="w-full aspect-3/4 object-cover" />
          {/if}
          <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black to-transparent"></div>
        </div>

        <!-- Achievements -->
        {#if athlete.achievements?.length > 0}
          <div>
            <span class="section-eyebrow">Achievements</span>
            <ul class="space-y-3">
              {#each athlete.achievements as achievement}
                <li class="flex items-start gap-3">
                  <span class="text-(--gold) mt-0.5 shrink-0">✦</span>
                  <span class="font-poppins text-sm text-white/65">{achievement}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Physical stats -->
        <div class="p-6 bg-(--dark-gray) border border-light-gray/30">
          <h4 class="font-bebas text-lg text-white mb-4 tracking-wide">Physical Profile</h4>
          <div class="space-y-3">
            {#each [
              { label: 'Height', value: athlete.height },
              { label: 'Weight', value: athlete.weight },
              { label: 'Age', value: athlete.age ? `${athlete.age} yrs` : null },
              { label: 'Nationality', value: athlete.nationality },
            ] as row}
              {#if row.value}
                <div class="flex items-center justify-between border-b border-light-gray/20 pb-2 last:border-0">
                  <span class="font-poppins text-xs text-white/40 uppercase tracking-wider">{row.label}</span>
                  <span class="font-montserrat text-sm font-semibold text-white">{row.value}</span>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── Back CTA ── -->
<section class="py-16 bg-(--dark-gray) border-t border-light-gray/30 text-center">
  <a href="/athletes" class="btn-outline mx-auto inline-flex">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    Back to All Athletes
  </a>
</section>
