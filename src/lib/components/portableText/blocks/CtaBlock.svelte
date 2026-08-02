<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
</script>

<div class="my-10 p-8 bg-(--dark-gray) border border-light-gray/30 text-center">
  <h3 class="font-bebas text-2xl md:text-3xl text-white mb-2">{value.heading}</h3>
  {#if value.text}
    <p class="font-poppins text-sm text-white/50 mb-6 max-w-lg mx-auto">{value.text}</p>
  {/if}
  <a href={value.buttonUrl} class={value.style === 'outline' ? 'btn-outline inline-flex' : 'btn-primary inline-flex'}>
    {value.buttonLabel}
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </a>
</div>
