<script lang="ts">
  import { urlFor } from '$lib/sanity/image';
  import { formatDate, formatViews } from '$lib/sanity/utils';

  let { item, onSelect }: { item: any; onSelect?: (item: any) => void } = $props();

  const thumbUrl = $derived(item.thumbnail?.image
    ? urlFor(item.thumbnail.image)?.width(800).height(450).fit('crop').url()
    : null);
  const isPhoto = $derived(item.mediaType === 'photo');
</script>

{#snippet cardContent()}
  <div class="relative aspect-video overflow-hidden">
    {#if thumbUrl}
      <img
        src={thumbUrl}
        alt={item.thumbnail?.alt ?? item.title}
        class="media-img w-full h-full object-cover"
        loading="lazy"
      />
    {/if}
    <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

    {#if isPhoto}
      <!-- Photo gallery indicator -->
      <div class="play-btn absolute inset-0 flex items-center justify-center">
        <div class="w-14 h-14 rounded-full bg-(--gold) flex items-center justify-center shadow-2xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-black">
            <rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="5.5" y="7" width="12" height="10" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
      </div>
      {#if item.photos?.length}
        <div class="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 20 20" fill="none" class="text-white">
            <rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="font-poppins text-[11px] text-white">{item.photos.length}</span>
        </div>
      {/if}
    {:else}
      <!-- Video play button -->
      <div class="play-btn absolute inset-0 flex items-center justify-center">
        <div class="w-14 h-14 rounded-full bg-(--gold) flex items-center justify-center shadow-2xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="text-black ml-1">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
      {#if item.duration}
        <div class="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5">
          <span class="font-poppins text-[11px] text-white">{item.duration}</span>
        </div>
      {/if}
    {/if}

    {#if item.category}
      <div class="absolute top-3 left-3">
        <span class="tag text-[10px]">{item.category.title}</span>
      </div>
    {/if}
  </div>

  <div class="p-4">
    <h4 class="font-montserrat font-semibold text-sm text-white leading-snug mb-2 group-hover:text-(--gold) transition-colors duration-200 line-clamp-2">
      {item.title}
    </h4>
    <div class="flex items-center justify-between">
      <span class="font-poppins text-xs text-white/40">{formatDate(item.publishedAt, { month: 'short', year: 'numeric' })}</span>
      {#if !isPhoto}
        <span class="font-poppins text-xs text-white/40">{formatViews(item.views)} views</span>
      {/if}
    </div>
  </div>
{/snippet}

{#if onSelect}
  <button type="button" onclick={() => onSelect(item)} class="media-card group block card-dark overflow-hidden text-left w-full">
    {@render cardContent()}
  </button>
{:else}
  <a href="/media" class="media-card group block card-dark overflow-hidden">
    {@render cardContent()}
  </a>
{/if}
