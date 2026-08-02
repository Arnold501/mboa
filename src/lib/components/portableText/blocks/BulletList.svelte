<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<ul class="space-y-2 mb-6 pl-1">{@render children()}</ul>
