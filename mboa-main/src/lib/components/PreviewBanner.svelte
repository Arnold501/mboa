<script lang="ts">
  import { getIsPreviewing } from '@sanity/sveltekit';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  const isPreviewing = getIsPreviewing();
</script>

{#if isPreviewing}
  <div
    class="fixed top-0 inset-x-0 z-100 bg-(--gold) text-black font-poppins text-xs font-semibold
           tracking-wide uppercase py-2 px-4 flex items-center justify-center gap-4"
  >
    <span>Draft Preview Mode — you're viewing unpublished content</span>
    <a
      href={resolve('/preview/disable', { redirect: page.url.pathname })}
      class="underline underline-offset-2"
    >
      Exit preview
    </a>
  </div>
{/if}
