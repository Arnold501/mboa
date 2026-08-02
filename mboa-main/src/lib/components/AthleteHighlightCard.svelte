<script lang="ts">
  import { urlFor } from '$lib/sanity/image';

  let { athlete }: { athlete: any } = $props();
  const imgUrl = $derived(athlete.image?.image
    ? urlFor(athlete.image.image)?.width(500).height(650).fit('crop').url()
    : null);
</script>

<a href="/athletes/{athlete.slug}#highlights" class="group relative block overflow-hidden aspect-3/4 shrink-0 w-56 sm:w-64">
  {#if imgUrl}
    <img
      src={imgUrl}
      alt={athlete.image?.alt ?? athlete.name}
      class="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      loading="lazy"
    />
  {/if}
  <div class="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>

  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-16 h-16 rounded-full bg-(--gold) flex items-center justify-center shadow-2xl opacity-90 group-hover:scale-110 transition-transform duration-300">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" class="text-black ml-1">
        <path d="M6.6 3.2L18 11 6.6 18.8V3.2z"/>
      </svg>
    </div>
  </div>

  <div class="absolute top-4 left-4">
    <span class="tag text-[10px]">Highlights</span>
  </div>

  <div class="absolute bottom-0 left-0 right-0 p-4">
    <h4 class="font-bebas text-xl text-white leading-none mb-1">{athlete.name}</h4>
    {#if athlete.highlightCaption}
      <p class="font-poppins text-[11px] text-white/50 line-clamp-1">{athlete.highlightCaption}</p>
    {/if}
  </div>
</a>
