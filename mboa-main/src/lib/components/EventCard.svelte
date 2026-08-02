<script lang="ts">
  import { goto } from '$app/navigation';
  import { urlFor } from '$lib/sanity/image';
  import { formatDate } from '$lib/sanity/utils';

  let { event, variant = 'default' } = $props<{ event: any; variant: 'default' | 'featured' }>();

  const posterUrl = $derived(
    event.poster?.image
      ? urlFor(event.poster.image)?.width(600).height(900).fit('crop').url()
      : event.heroImage?.image
        ? urlFor(event.heroImage.image)?.width(800).height(450).fit('crop').url()
        : null
  );
</script>

<a href="/events/{event.slug}" class="group block relative overflow-hidden card-dark">
  <!-- Poster image -->
  <div class="relative overflow-hidden" class:aspect-video={!event.poster} style:aspect-ratio={event.poster ? '2/3' : '16/9'}>
    {#if posterUrl}
      <img
        src={posterUrl}
        alt={event.poster?.alt ?? event.title}
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    {/if}
    <div class="img-overlay absolute inset-0"></div>

    <!-- Status badge -->
    <div class="absolute top-4 right-4">
      {#if event.isUpcoming}
        <span class="inline-flex items-center gap-1.5 bg-(--gold) text-black font-poppins text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
          Upcoming
        </span>
      {:else}
        <span class="inline-flex items-center gap-1.5 bg-(--dark-gray) border border-white/20 text-white/60 font-poppins text-[10px] tracking-widest uppercase px-3 py-1.5">
          Past Event
        </span>
      {/if}
    </div>

    <!-- Title overlay on image -->
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <p class="font-poppins text-xs text-(--gold) tracking-widest uppercase mb-1">{formatDate(event.date)}</p>
      <h3 class="font-bebas text-3xl text-white leading-none">{event.title}</h3>
      {#if event.subtitle}<p class="font-poppins text-sm text-white/60 mt-1">{event.subtitle}</p>{/if}
    </div>
  </div>

  <!-- Details -->
  <div class="p-5 border-t border-light-gray/30">
    <div class="flex items-center gap-3 mb-3">
      <span class="text-(--gold) text-sm">📍</span>
      <div>
        <p class="font-poppins text-xs text-white/70">{event.venue}</p>
        <p class="font-poppins text-[11px] text-white/40">{event.location}</p>
      </div>
    </div>

    {#if event.isUpcoming}
      <div class="flex items-center gap-3">
        <button
          title="Details"
          class="btn-primary text-xs py-3 px-5 flex-1 justify-center"
          onclick={() => goto(`/events/${event.slug}`)}
        >
          View Details
        </button>
        {#if event.ticketUrl}
          <button class="btn-outline text-xs py-3 px-5" onclick={() => goto(event.ticketUrl)}>
            Tickets
          </button>
        {/if}
      </div>
    {:else}
      <button onclick={() => goto(`/events/${event.slug}`)} class="btn-ghost text-xs">
        View Highlights
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>
    {/if}
  </div>
</a>
