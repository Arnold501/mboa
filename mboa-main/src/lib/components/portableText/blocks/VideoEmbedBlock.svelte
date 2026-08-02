<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';

  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
</script>

<div class="my-10">
  <VideoPlayer {value} />
</div>
