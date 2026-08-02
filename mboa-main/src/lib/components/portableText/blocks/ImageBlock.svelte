<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import { urlFor } from '$lib/sanity/image';

  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
  let url = $derived(value.image ? urlFor(value.image)?.width(1400).url() : null);
</script>

<figure class="my-10 {value.fullBleed ? '-mx-6 md:-mx-16 lg:-mx-24' : ''}">
  {#if url}
    <img src={url} alt={value.alt} class="w-full h-auto" loading="lazy" />
  {/if}
  {#if value.caption || value.credit}
    <figcaption class="font-poppins text-xs text-white/40 mt-3 flex items-center justify-between gap-4">
      <span>{value.caption ?? ''}</span>
      {#if value.credit}<span class="text-white/25 shrink-0">{value.credit}</span>{/if}
    </figcaption>
  {/if}
</figure>
