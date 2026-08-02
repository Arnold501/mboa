<script lang="ts">
  import type { CustomBlockComponentProps } from '@portabletext/svelte';
  import NewsletterSignup from '$lib/components/newsroom/NewsletterSignup.svelte';
  let { portableText }: { portableText: CustomBlockComponentProps<any> } = $props();
  let { value } = $derived(portableText);
</script>

<div class="my-10">
  <NewsletterSignup compact heading={value.heading} subtext={value.subtext} />
</div>
