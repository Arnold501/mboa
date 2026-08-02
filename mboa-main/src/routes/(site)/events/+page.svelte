<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import EventCard from '$lib/components/EventCard.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  const hero = $derived(data.page?.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1400).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1400&h=700&fit=crop'
  );
</script>

<svelte:head>
  <title>{hero?.title || 'Events'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Upcoming MBOA Sports events, fight cards, ticket information, and past event results and highlights.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Events'}
  subtitle={hero?.subtitle || 'World-class combat sports events built on the African continent.'}
  eyebrow={hero?.eyebrow || 'The Calendar'}
  image={heroImgUrl}
/>

<!-- ── Upcoming ── -->
<section class="py-24 md:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="mb-14" use:reveal>
      <span class="section-eyebrow">On the Horizon</span>
      <h2 class="section-title">Upcoming Events</h2>
    </div>

    {#if data.upcoming?.length > 0}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.upcoming as event, i}
          <div use:reveal={{ delay: i * 120 }}>
            <EventCard {event} variant="default" />
          </div>
        {/each}
      </div>
    {:else}
      <div class="py-20 text-center border border-light-gray/20">
        <p class="font-bebas text-3xl text-white/20">No upcoming events scheduled</p>
        <p class="font-poppins text-sm text-white/30 mt-2">Check back soon for announcements</p>
      </div>
    {/if}
  </div>
</section>

<div class="divider-gold max-w-7xl mx-auto px-6 lg:px-10"></div>

<!-- ── Past events ── -->
<section class="pb-24 md:pb-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="mb-14" use:reveal>
      <span class="section-eyebrow">Event Archive</span>
      <h2 class="section-title">Past Events</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each data.past as event, i}
        <div use:reveal={{ delay: i * 100 }}>
          <EventCard {event} variant="default" />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Promo Banner ── -->
<section class="relative overflow-hidden py-28 bg-dark-gray">
  <div class="absolute inset-0 opacity-5"
    style:background="repeating-linear-gradient(-45deg, #C8A96A 0px, #C8A96A 1px, transparent 1px, transparent 50px)">
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-10 text-center" use:reveal>
    <span class="section-eyebrow">Host an Event</span>
    <h2 class="section-title mb-5">Bring MBOA Sports to<br/><span class="text-gold-gradient">Your City</span></h2>
    <p class="font-poppins text-white/50 text-sm max-w-lg mx-auto mb-8">
      Interested in hosting an MBOA Sports event in your venue or city? We partner with venues across Africa and internationally.
    </p>
    <a href="/contact" class="btn-primary inline-flex mx-auto">
      Get in Touch
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </a>
  </div>
</section>
