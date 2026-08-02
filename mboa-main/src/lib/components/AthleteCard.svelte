<script lang="ts">
  import { urlFor } from '$lib/sanity/image';

  let { athlete } = $props();
  let imgUrl = $derived(athlete.image?.image
    ? urlFor(athlete.image.image)?.width(600).height(800).fit('crop').url()
    : null);

</script>

<a href="/athletes/{athlete.slug.current}" class="athlete-card card-dark block group relative overflow-hidden">
  <!-- Image -->
  <div class="aspect-3/4 overflow-hidden relative">
    {#if imgUrl}
      <img
        src={imgUrl}
        alt={athlete.image?.alt ?? athlete.name}
        class="athlete-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        loading="lazy"
      />
    {/if}
    <!-- Overlay -->
    <div class="athlete-overlay img-overlay absolute inset-0"></div>
    <!-- Category tag -->
    {#if athlete.category}
      <div class="absolute top-4 left-4">
        <span class="tag text-[10px]">{athlete.category.title}</span>
      </div>
    {/if}
    <!-- Record badge (top right) -->
    {#if athlete.record}
      <div class="absolute top-4 right-4 bg-black/80 border border-gold/30 px-3 py-1">
        <span class="font-bebas text-(--gold) text-sm tracking-wide">{athlete.record}</span>
      </div>
    {/if}
  </div>

  <!-- Info -->
  <div class="p-5">
    <p class="font-poppins text-xs text-(--gold)/70 tracking-widest uppercase mb-1">{athlete.division}</p>
    <h3 class="font-bebas text-2xl text-white leading-none mb-1 group-hover:text-(--gold) transition-colors duration-200">
      {athlete.name}
    </h3>
    {#if athlete.nickname}
      <p class="font-poppins text-xs text-white/40 italic mb-3">"{athlete.nickname}"</p>
    {/if}
    <p class="font-poppins text-xs text-white/50 leading-relaxed line-clamp-2 mb-4">
      {athlete.bio.substring(0, 90)}...
    </p>

    <div class="flex items-center justify-between">
      <span class="font-poppins text-xs text-(--gold) font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
        View Profile
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="transition-transform group-hover:translate-x-1">
          <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </span>
      <span class="font-poppins text-xs text-white/30">{athlete.nationality}</span>
    </div>
  </div>
</a>
