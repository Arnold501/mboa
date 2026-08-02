<script lang="ts">
	import '../layout.css';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PreviewBanner from '$lib/components/PreviewBanner.svelte';
	import { onMount } from 'svelte';
	import { initCursor } from '$lib/utils/animations';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	const siteSettings = $derived(data.siteSettings ?? {});

	 onMount(() => {
    const cleanup = initCursor();
    return cleanup;
  });
</script>

<PreviewBanner />
<Nav settings={siteSettings} />
<main>
  {@render children()}
</main>
<Footer settings={siteSettings} />
