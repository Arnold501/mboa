<script lang="ts">
  import icon from '$lib/assets/icon.png'
  import { LiveLoader, PreviewMode, VisualEditing } from '@sanity/sveltekit';
  import { client } from '$lib/sanity';
  import type { LayoutProps } from './$types';

  const { children, data }: LayoutProps = $props();
  const { browserToken, previewEnabled, previewPerspective } = $derived(data);
</script>

<svelte:head>
  <link rel="shortcut icon" href={icon} type="image/x-icon">
</svelte:head>

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
    <LiveLoader {client} {previewEnabled} {previewPerspective} {browserToken}>
      {@render children()}
    </LiveLoader>
  </VisualEditing>
</PreviewMode>
