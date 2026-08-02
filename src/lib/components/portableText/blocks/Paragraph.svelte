<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    portableText: BlockComponentProps;
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<p class="font-poppins text-white/70 leading-relaxed text-base md:text-lg mb-6">
  {@render children()}
</p>
