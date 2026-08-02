<script lang="ts">
  import { urlFor } from '$lib/sanity/image';

  let { item, onClose }: { item: any; onClose: () => void } = $props();

  let index = $state(0);

  const photos = $derived(
    (item.photos ?? [])
      .map((p: any) => ({
        url: p.image ? urlFor(p.image)?.width(1600).url() : null,
        alt: p.alt ?? item.title,
        caption: p.caption
      }))
      .filter((p: any) => p.url)
  );

  function next() {
    index = (index + 1) % photos.length;
  }
  function prev() {
    index = (index - 1 + photos.length) % photos.length;
  }
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 z-200 bg-black/95 backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" aria-label="{item.title} photo gallery">
  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-5 shrink-0">
    <div class="min-w-0">
      <h3 class="font-bebas text-xl text-white leading-none truncate">{item.title}</h3>
      {#if photos.length > 1}
        <p class="font-poppins text-xs text-white/40 mt-1">{index + 1} / {photos.length}</p>
      {/if}
    </div>
    <button
      onclick={onClose}
      aria-label="Close gallery"
      class="w-10 h-10 shrink-0 border border-white/20 flex items-center justify-center text-white/60 hover:text-(--gold) hover:border-gold transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>

  <!-- Main image — clicking the empty space here (backdrop) closes the
       lightbox; -->
  <div
    class="flex-1 flex items-center justify-center px-4 sm:px-16 min-h-0 relative cursor-pointer"
    onclick={onClose}
    role="presentation"
  >
    {#if photos.length > 1}
      <button
        onclick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous photo"
        class="absolute left-2 sm:left-6 w-11 h-11 border border-white/20 flex items-center justify-center text-white/60 hover:text-(--gold) hover:border-gold transition-colors shrink-0 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    {/if}

    {#if photos[index]}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <img
        src={photos[index].url}
        alt={photos[index].alt}
        class="max-h-full max-w-full object-contain cursor-default"
        onclick={(e) => e.stopPropagation()}
      />
    {/if}

    {#if photos.length > 1}
      <button
        onclick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next photo"
        class="absolute right-2 sm:right-6 w-11 h-11 border border-white/20 flex items-center justify-center text-white/60 hover:text-(--gold) hover:border-gold transition-colors shrink-0 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    {/if}
  </div>

  <!-- Caption + thumbnail strip -->
  <div class="shrink-0 px-6 py-5">
    {#if photos[index]?.caption}
      <p class="font-poppins text-sm text-white/50 text-center mb-4">{photos[index].caption}</p>
    {/if}
    {#if photos.length > 1}
      <div class="flex items-center justify-center gap-2 overflow-x-auto">
        {#each photos as photo, i}
          <button
            class="w-14 h-14 shrink-0 overflow-hidden border transition-colors"
            style:border-color={index === i ? '#C8A96A' : 'rgba(255,255,255,0.15)'}
            onclick={() => (index = i)}
          >
            <img src={photo.url} alt={photo.alt} class="w-full h-full object-cover" />
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
