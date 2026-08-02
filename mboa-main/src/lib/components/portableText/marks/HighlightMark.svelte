<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';
  import type { Snippet } from 'svelte';
  import { getBrandColorHex } from '$lib/sanity/brandColors';

  interface Props {
    portableText: MarkComponentProps;
    children: Snippet;
  }
  let { portableText, children }: Props = $props();
  let { value } = $derived(portableText);
  let color = $derived(getBrandColorHex(value?.color));
</script>

<span style:color style:font-weight="600">{@render children()}</span>
