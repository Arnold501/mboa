<script lang="ts">
  import config from '$lib/sanity/studio/sanity.config';
  import { SanityStudio } from '@sanity/sveltekit';
</script>

<svelte:head>
  <title>MBOA Sports — Studio</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<SanityStudio {config} />
