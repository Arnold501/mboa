<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import { getBrandColorHex } from '$lib/sanity/brandColors';
  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
  let accent = $derived(getBrandColorHex(value.color));
</script>

<div class="my-10 py-8 text-center border-y border-light-gray/30">
  <p class="font-bebas text-6xl md:text-7xl leading-none" style:color={accent}>{value.value}</p>
  <p class="font-poppins text-xs tracking-widest text-white/50 uppercase mt-2">{value.label}</p>
</div>
