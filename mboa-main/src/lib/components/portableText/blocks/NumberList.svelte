<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<ol class="space-y-2 mb-6 pl-1 list-none">{@render children()}</ol>
