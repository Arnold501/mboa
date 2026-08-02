<script lang="ts">
  import { urlFor } from '$lib/sanity/image';

  let {
    partner,
    size = 'sm',
    mono = true
  }: { partner: any; size?: 'sm' | 'md' | 'lg'; mono?: boolean } = $props();

  const logoUrl = $derived(partner.logo ? urlFor(partner.logo)?.width(500).url() : null);
  const fallbackTextClass = $derived(size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-xl');
</script>

{#if logoUrl}
  <img
    src={logoUrl}
    alt={partner.name}
    loading="lazy"
    class="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300 group-hover:scale-105 {mono
      ? 'brightness-0 invert group-hover:filter-none'
      : ''}"
  />
{:else}
  <div class="flex items-center justify-center w-full h-full px-4">
    <span
      class="font-bebas {fallbackTextClass} text-white/60 tracking-wide text-center leading-tight transition-colors duration-300 {mono
        ? 'group-hover:text-(--gold)'
        : 'group-hover:text-white'}"
    >
      {partner.name}
    </span>
  </div>
{/if}