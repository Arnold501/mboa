<script lang="ts">
  import { reveal } from '$lib/utils/animations';
  import MediaCard from '$lib/components/MediaCard.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import PhotoLightbox from '$lib/components/PhotoLightbox.svelte';
  import { urlFor } from '$lib/sanity/image';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  let activeCategory = $state('All');
  let featured = $derived(data.items.find((m: { featured: any; }) => m.featured) ?? data.items[0]);
  let lightboxItem = $state<any>(null);
  let featuredPhotoIndex = $state(0);

  let filtered = $derived(
    activeCategory === 'All' ? data.items : data.items.filter((m: { category: { title: string; }; }) => m.category?.title === activeCategory)
  );

  const featuredPoster = $derived(
    featured?.thumbnail?.image ? urlFor(featured.thumbnail.image)?.width(1200).url() : null
  );
  const featuredIsPhoto = $derived(featured?.mediaType === 'photo');
  const featuredPhotos = $derived(
    (featured?.photos ?? [])
      .map((p: any) => ({ url: p.image ? urlFor(p.image)?.width(1400).url() : null, alt: p.alt ?? featured.title }))
      .filter((p: any) => p.url)
  );

  const hero = $derived(data.page?.hero);
  const heroImgUrl = $derived(
    hero?.image?.image
      ? urlFor(hero.image.image)?.width(1600).height(700).fit('crop').url()
      : 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&h=700&fit=crop'
  );

  /** Videos become the featured player; photo galleries open the lightbox
   *  directly — a photo set doesn't have a meaningful "featured slot"
   *  the way a video does, so keep it a one-step interaction. */
  function handleSelect(item: any) {
    if (item.mediaType === 'photo') {
      lightboxItem = item;
    } else {
      featured = item;
      featuredPhotoIndex = 0;
    }
  }
</script>

<svelte:head>
  <title>{hero?.title || 'Media'} — MBOA Sports</title>
  <meta name="description" content={hero?.subtitle || 'Watch MBOA Sports fight highlights, training camp footage, documentaries, and behind-the-scenes content.'} />
</svelte:head>

<PageHero
  title={hero?.title || 'Media'}
  subtitle={hero?.subtitle || 'Fight highlights, training footage, photo galleries, and more.'}
  eyebrow={hero?.eyebrow || 'MBOA Sports Studios'}
  image={heroImgUrl}
/>

{#if featured}
<!-- ── Featured (video or photo) ── -->
<section class="py-16 md:py-20 bg-dark-gray">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="mb-10" use:reveal>
      <span class="section-eyebrow">Featured</span>
      <h2 class="section-title-sm">{featuredIsPhoto ? 'Latest Gallery' : 'Latest Highlight'}</h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main slot: video player OR photo display, same visual footprint -->
      <div class="lg:col-span-2" use:reveal>
        {#if featuredIsPhoto && featuredPhotos.length}
          <button
            class="relative aspect-video w-full block overflow-hidden group cursor-pointer"
            onclick={() => (lightboxItem = featured)}
          >
            <img src={featuredPhotos[featuredPhotoIndex]?.url} alt={featuredPhotos[featuredPhotoIndex]?.alt} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            {#if featuredPhotos.length > 1}
              <div class="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" class="text-white"><rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>
                <span class="font-poppins text-xs text-white">{featuredPhotos.length} photos</span>
              </div>
            {/if}
          </button>
          {#if featuredPhotos.length > 1}
            <div class="flex gap-2 mt-3 overflow-x-auto">
              {#each featuredPhotos as photo, i}
                <button
                  class="w-16 h-16 shrink-0 overflow-hidden border transition-colors"
                  style:border-color={featuredPhotoIndex === i ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
                  onclick={() => (featuredPhotoIndex = i)}
                >
                  <img src={photo.url} alt={photo.alt} class="w-full h-full object-cover" />
                </button>
              {/each}
            </div>
          {/if}
        {:else}
          <VideoPlayer value={featured.video} caption={featured.title} posterUrl={featuredPoster} />
        {/if}
        <div class="mt-4">
          <h3 class="font-montserrat font-bold text-xl text-white mb-2">{featured.title}</h3>
          {#if featured.description}<p class="font-poppins text-sm text-white/50">{featured.description}</p>{/if}
        </div>
      </div>

      <!-- Sidebar playlist -->
      <div use:reveal={{ delay: 150 }}>
        <h4 class="font-poppins text-xs text-white/30 tracking-widest uppercase mb-4">Up Next</h4>
        <div class="space-y-3">
          {#each data.items.filter((m: { slug: any; }) => m.slug !== featured.slug).slice(0, 5) as item}
            <button
              class="w-full flex gap-3 items-start group hover:bg-light-gray/30 p-2 transition-colors -mx-2"
              onclick={() => handleSelect(item)}
            >
              <div class="relative shrink-0 w-28 aspect-video overflow-hidden">
                {#if item.thumbnail?.image}
                  <img
                    src={urlFor(item.thumbnail.image)?.width(300).height(170).fit('crop').url()}
                    alt={item.thumbnail?.alt ?? item.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                {/if}
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    {#if item.mediaType === 'photo'}
                      <svg width="9" height="9" viewBox="0 0 20 20" fill="none" class="text-black"><rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" stroke-width="2"/></svg>
                    {:else}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" class="text-black ml-0.5"><path d="M2 1.5L8 5 2 8.5V1.5z" /></svg>
                    {/if}
                  </div>
                </div>
              </div>
              <div class="flex-1 min-w-0 text-left">
                <p class="font-poppins text-xs text-white/80 group-hover:text-white leading-snug line-clamp-2 transition-colors">{item.title}</p>
                {#if item.mediaType === 'photo'}
                  <p class="font-poppins text-[11px] text-white/30 mt-1">{item.photos?.length ?? 0} photos</p>
                {:else if item.duration}
                  <p class="font-poppins text-[11px] text-white/30 mt-1">{item.duration}</p>
                {/if}
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- ── Filters ── -->
<div class="bg-off-black bg-dark-gray border-y border-light-gray/30 sticky top-20 z-30 py-5">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="flex items-center gap-3 overflow-x-auto pb-1">
      <span class="font-poppins text-xs text-white/30 tracking-widest uppercase shrink-0 mr-2">Filter:</span>
      <button
        class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
        style:background={activeCategory === 'All' ? '#C8A96A' : 'transparent'}
        style:color={activeCategory === 'All' ? '#000' : 'rgba(255,255,255,0.5)'}
        style:border-color={activeCategory === 'All' ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
        onclick={() => (activeCategory = 'All')}
      >All</button>
      {#each data.categories as cat}
        <button
          class="shrink-0 px-5 py-2 font-poppins text-xs tracking-widest uppercase transition-all duration-200 border"
          style:background={activeCategory === cat.title ? '#C8A96A' : 'transparent'}
          style:color={activeCategory === cat.title ? '#000' : 'rgba(255,255,255,0.5)'}
          style:border-color={activeCategory === cat.title ? '#C8A96A' : 'rgba(255,255,255,0.1)'}
          onclick={() => (activeCategory = cat.title)}
        >{cat.title}</button>
      {/each}
    </div>
  </div>
</div>

<!-- ── Grid — videos and photo galleries side by side, same card treatment ── -->
<section class="py-20 md:py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filtered as item, i (item._id)}
        <div use:reveal={{ delay: (i % 3) * 80 }}>
          <MediaCard {item} onSelect={handleSelect} />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── Subscribe CTA ── -->
<section class="py-20 bg-dark-gray border-t border-light-gray/30 text-center" use:reveal>
  <div class="max-w-7xl mx-auto px-6">
    <span class="section-eyebrow">Never Miss a Fight</span>
    <h2 class="section-title-sm mb-4">Subscribe to<br/><span class="text-gold-gradient">MBOA Sports TV</span></h2>
    <p class="font-poppins text-sm text-white/50 mb-8 max-w-md mx-auto">
      Get exclusive access to fight highlights, behind-the-scenes footage, and live event streams.
    </p>
    <a href="https://youtube.com" target="_blank" rel="noreferrer" class="btn-primary inline-flex mx-auto">
      Subscribe on YouTube
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </a>
  </div>
</section>

{#if lightboxItem}
  <PhotoLightbox item={lightboxItem} onClose={() => (lightboxItem = null)} />
{/if}
