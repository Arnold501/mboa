<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    portableText: MarkComponentProps;
    children: Snippet;
  }
  let { portableText, children }: Props = $props();
  let { value } = $derived(portableText);
</script>

<a
  href={value?.href}
  target={value?.newTab ? '_blank' : undefined}
  rel={value?.newTab ? 'noreferrer' : undefined}
  class="text-(--gold) underline underline-offset-2 hover:text-(--gold-light) transition-colors"
>
  {@render children()}
</a>
