<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    portableText: BlockComponentProps;
    children: Snippet;
  }
  let { portableText, children }: Props = $props();
  let { value } = $derived(portableText);
  let style = $derived(value.style);
</script>

{#if style === 'h2'}
  <h2 class="font-bebas text-3xl md:text-4xl text-white mt-12 mb-4 leading-tight">
    {@render children()}
  </h2>
{:else if style === 'h3'}
  <h3 class="font-bebas text-2xl md:text-3xl text-white mt-10 mb-3 leading-tight">
    {@render children()}
  </h3>
{:else}
  <h4 class="font-montserrat font-bold text-lg text-(--gold) mt-8 mb-2 uppercase tracking-wide">
    {@render children()}
  </h4>
{/if}
