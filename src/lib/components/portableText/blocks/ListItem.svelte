<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<li class="flex items-start gap-3 font-poppins text-white/70 leading-relaxed">
  <span class="text-(--gold) mt-1.5 shrink-0 text-[8px]">✦</span>
  <span>{@render children()}</span>
</li>
