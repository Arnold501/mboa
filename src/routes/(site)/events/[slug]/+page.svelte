<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import { urlFor } from '$lib/sanity/image';
  import { formatDate } from '$lib/sanity/utils';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  const event = $derived(data.event);

  const heroUrl = $derived(
    (event.heroImage?.image ?? event.poster?.image)
      ? urlFor(event.heroImage?.image ?? event.poster?.image)?.width(1600).height(900).fit('crop').url()
      : null
  );
  const posterUrl = $derived(event.poster?.image ? urlFor(event.poster.image)?.width(600).height(900).fit('crop').url() : null);
</script>

<svelte:head>
  <title>{event.title} — MBOA Sports</title>
  <meta name="description" content="{event.title}: {event.subtitle}. {event.venue}, {event.location}. {formatDate(event.date)}." />
</svelte:head>

<!-- ── Hero ── -->
<section class="relative min-h-[75vh] flex items-end overflow-hidden">
  <div class="absolute inset-0">
    {#if heroUrl}<img src={heroUrl} alt={event.title} class="w-full h-full object-cover" />{/if}
    <div class="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
    <div class="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full">
    <a href="/events" class="inline-flex items-center gap-2 font-poppins text-xs text-white/40 hover:text-gold transition-colors mb-8 tracking-wider uppercase">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      All Events
    </a>

    <div class="mb-4">
      {#if event.isUpcoming}
        <span class="inline-flex items-center gap-2 bg-gold text-black font-poppins text-xs font-bold tracking-widest uppercase px-4 py-2">
          <span class="w-2 h-2 rounded-full bg-black animate-pulse"></span>
          Upcoming Event
        </span>
      {:else}
        <span class="inline-flex items-center gap-2 bg-dark-gray border border-white/20 text-white/60 font-poppins text-xs tracking-widest uppercase px-4 py-2">
          Past Event
        </span>
      {/if}
    </div>

    <h1 class="font-bebas text-6xl md:text-9xl leading-none text-white">{event.title}</h1>
    {#if event.subtitle}<p class="font-poppins text-xl text-gold mt-2 mb-4">{event.subtitle}</p>{/if}

    <div class="flex flex-wrap gap-6 mt-4">
      <div class="flex items-center gap-2">
        <span class="text-gold text-sm">📅</span>
        <span class="font-poppins text-sm text-white/70">{formatDate(event.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {formatDate(event.date, { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gold text-sm">📍</span>
        <span class="font-poppins text-sm text-white/70">{event.venue}, {event.location}</span>
      </div>
    </div>
  </div>
</section>

<!-- ── Detail layout ── -->
<section class="py-20 md:py-28">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-3 gap-16">

      <!-- Fight card col -->
      <div class="lg:col-span-2">
        {#if event.fightCard?.length}
          <div use:reveal>
            <span class="section-eyebrow">The Card</span>
            <h2 class="section-title-sm mb-8">Fight Card</h2>
          </div>

          <div class="space-y-4">
            {#each event.fightCard as bout, i}
              <div class="relative border border-light-gray/30 hover:border-gold/30 transition-all duration-300 p-5 group overflow-hidden" use:reveal={{ delay: i * 80 }}>
                <div class="flex items-center justify-between mb-4">
                  {#if bout.type}<span class="tag text-[10px]">{bout.type}</span>{/if}
                  {#if bout.result}<span class="font-poppins text-xs text-gold font-semibold">{bout.result}</span>{/if}
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex-1 text-right">
                    <p class="font-bebas text-2xl md:text-3xl text-white leading-none">{bout.fighter1}</p>
                  </div>
                  <div class="flex flex-col items-center shrink-0">
                    <span class="font-bebas text-gold text-xl">VS</span>
                    <div class="w-10 h-px bg-gold/30 mt-1"></div>
                  </div>
                  <div class="flex-1">
                    <p class="font-bebas text-2xl md:text-3xl text-white leading-none">{bout.fighter2}</p>
                  </div>
                </div>
                {#if bout.title}<p class="font-poppins text-xs text-white/40 text-center mt-3 tracking-wide uppercase">{bout.title}</p>{/if}
                <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            {/each}
          </div>
        {/if}

        {#if event.results}
          <div class="mt-12" use:reveal>
            <span class="section-eyebrow">Results</span>
            <div class="p-8 bg-gold/5 border border-gold/20">
              <p class="font-poppins text-white/70 leading-relaxed">{event.results}</p>
            </div>
          </div>
        {/if}

        {#if event.highlights?.source}
          <div class="mt-12" use:reveal={{ delay: 100 }}>
            <span class="section-eyebrow">Video</span>
            <h3 class="section-title-sm mb-5">Event Highlights</h3>
            <VideoPlayer value={event.highlights} posterUrl={posterUrl} />
          </div>
        {/if}
      </div>

      <!-- Sidebar -->
      <div class="space-y-8" use:reveal={{ delay: 200 }}>
        {#if posterUrl}
          <div><img src={posterUrl} alt="{event.title} Poster" class="w-full" /></div>
        {/if}

        <div class="p-6 bg-dark-gray border border-light-gray/30">
          <h4 class="font-bebas text-xl text-white mb-5 tracking-wide">Event Details</h4>
          <div class="space-y-4">
            {#each [
              { icon: '📅', label: 'Date', value: formatDate(event.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
              { icon: '⏰', label: 'Time', value: formatDate(event.date, { hour: 'numeric', minute: '2-digit' }) },
              { icon: '🏟️', label: 'Venue', value: event.venue },
              { icon: '📍', label: 'Location', value: event.location },
            ] as row}
              <div class="flex gap-3 border-b border-light-gray/20 pb-3 last:border-0">
                <span class="text-sm mt-0.5">{row.icon}</span>
                <div>
                  <p class="font-poppins text-[10px] text-white/30 uppercase tracking-widest">{row.label}</p>
                  <p class="font-poppins text-sm text-white/80">{row.value}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        {#if event.isUpcoming && event.ticketUrl}
          <a href={event.ticketUrl} class="btn-primary w-full justify-center">
            Get Tickets
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>
        {/if}

        {#if event.description}
          <p class="font-poppins text-xs text-white/30 leading-relaxed">{event.description}</p>
        {/if}
      </div>
    </div>
  </div>
</section>
