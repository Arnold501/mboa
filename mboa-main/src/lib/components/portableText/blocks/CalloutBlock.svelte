<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import { PortableText } from '@portabletext/svelte';
  import { getBrandColorHex } from '$lib/sanity/brandColors';

  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
  let accent = $derived(getBrandColorHex(value.accentColor));

  const icons: Record<string, string> = { info: 'ℹ', tip: '✦', warning: '⚠', quote: '"' };
</script>

<div class="my-8 p-6 border-l-2" style:border-color={accent} style:background="{accent}0d">
  <div class="flex items-start gap-3">
    <span class="text-lg leading-none mt-0.5" style:color={accent}>{icons[value.style] ?? '✦'}</span>
    <div class="flex-1 min-w-0">
      {#if value.title}
        <p class="font-bebas text-xl text-white mb-2 tracking-wide">{value.title}</p>
      {/if}
      {#if value.text}
        <div class="font-poppins text-sm text-white/70 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0">
          <PortableText value={value.text} />
        </div>
      {/if}
    </div>
  </div>
</div>
