<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
</script>

{#if value.style === 'ornament'}
  <div class="my-10 flex items-center justify-center gap-3 text-(--gold)">
    <span class="w-12 h-px bg-(--gold)/40"></span>
    <span>✦</span>
    <span class="w-12 h-px bg-(--gold)/40"></span>
  </div>
{:else}
  <hr class="my-10 border-t border-light-gray/30" />
{/if}
