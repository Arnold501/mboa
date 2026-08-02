<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<blockquote class="border-l-2 border-(--gold) pl-6 my-8 py-1">
  <p class="font-bebas text-2xl md:text-3xl text-white leading-snug">
    {@render children()}
  </p>
</blockquote>
