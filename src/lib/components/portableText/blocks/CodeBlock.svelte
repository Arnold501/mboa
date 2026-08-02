<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
</script>

<div class="my-8 bg-black border border-light-gray/30 overflow-hidden">
  {#if value.filename}
    <div class="px-4 py-2 border-b border-light-gray/30 font-poppins text-[11px] text-white/40">
      {value.filename}
    </div>
  {/if}
  <pre class="p-4 overflow-x-auto font-mono text-sm text-(--gold-light)"><code>{value.code}</code></pre>
</div>
